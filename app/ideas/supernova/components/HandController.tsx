'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { HandData } from '../types';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface HandControllerProps {
  onHandUpdate: (data: HandData) => void;
}

// Simple linear interpolation for smoothing
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

const HandController: React.FC<HandControllerProps> = ({ onHandUpdate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastVideoTimeRef = useRef(-1);
  const requestRef = useRef<number | undefined>(undefined);
  const landmarkerRef = useRef<HandLandmarker | null>(null);

  // Smoothing refs to store previous values
  const prevHandData = useRef<HandData>({ x: 0, y: 0, z: 0, pinchDistance: 1, isPresent: false });
  const [handDataState, setHandDataState] = useState<HandData>({ x: 0, y: 0, z: 0, pinchDistance: 1, isPresent: false });
  const predictWebcamRef = useRef<(() => void) | null>(null);

  const predictWebcam = React.useCallback(() => {
    if (!landmarkerRef.current || !videoRef.current) return;

    const nowInMs = performance.now();
    if (videoRef.current.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = videoRef.current.currentTime;

      const results = landmarkerRef.current.detectForVideo(videoRef.current, nowInMs);

      if (results.landmarks && results.landmarks.length > 0) {
        const landmarks = results.landmarks[0];

        // --- Feature Extraction ---

        // 1. Pinch: Thumb tip (4) to Index tip (8) distance
        const thumbTip = landmarks[4];
        const indexTip = landmarks[8];
        const rawPinch = Math.sqrt(
          Math.pow(thumbTip.x - indexTip.x, 2) +
          Math.pow(thumbTip.y - indexTip.y, 2)
        );
        // Normalize Pinch: 0.02 (closed) to 0.15 (open) -> 0 to 1
        let pinchStrength = (rawPinch - 0.03) * 8;
        pinchStrength = Math.max(0, Math.min(1, pinchStrength));

        // 2. Position (X/Y)
        // MediaPipe X is 0 (left) to 1 (right) of IMAGE.
        // User moves Right -> Camera sees Left (mirror).
        // We want User Right -> +1 X.
        // So: (0.5 - landmarks.x) * 2.
        const rawX = (0.5 - landmarks[9].x) * 2.5; // Multiplier for sensitivity
        const rawY = -(landmarks[9].y - 0.5) * 2.5;

        // 3. Depth / Zoom (Z)
        // Estimate based on hand size in frame (Wrist 0 to Middle MCP 9)
        const wrist = landmarks[0];
        const middleMcp = landmarks[9];
        const handSize = Math.sqrt(
            Math.pow(middleMcp.x - wrist.x, 2) +
            Math.pow(middleMcp.y - wrist.y, 2)
        );
        // handSize is approx 0.05 (far) to 0.3 (close)
        // We want 0 (far) to 1 (close)
        let rawZ = (handSize - 0.05) * 5;
        rawZ = Math.max(0, Math.min(1, rawZ));

        // --- Smoothing (Low Pass Filter) ---
        // Smooth factor: Lower = smoother but more lag. 0.2 is a good balance.
        const smoothFactor = 0.15;

        const smoothX = lerp(prevHandData.current.x, rawX, smoothFactor);
        const smoothY = lerp(prevHandData.current.y, rawY, smoothFactor);
        const smoothZ = lerp(prevHandData.current.z, rawZ, smoothFactor);
        const smoothPinch = lerp(prevHandData.current.pinchDistance, pinchStrength, smoothFactor);

        const newData = {
          x: smoothX,
          y: smoothY,
          z: smoothZ,
          pinchDistance: smoothPinch,
          isPresent: true
        };

        prevHandData.current = newData;
        onHandUpdate(newData);

      } else {
        // Decay to center/default if lost
        const smoothFactor = 0.1;
        const newData = {
            x: lerp(prevHandData.current.x, 0, smoothFactor),
            y: lerp(prevHandData.current.y, 0, smoothFactor),
            z: lerp(prevHandData.current.z, 0, smoothFactor),
            pinchDistance: lerp(prevHandData.current.pinchDistance, 1, smoothFactor),
            isPresent: false
        };
        prevHandData.current = newData;
        setHandDataState(newData);
        onHandUpdate(newData);
      }
    }
    requestRef.current = requestAnimationFrame(() => predictWebcamRef.current?.());
  }, [onHandUpdate]);

  React.useEffect(() => {
    predictWebcamRef.current = predictWebcam;
  });

  const startCamera = React.useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            width: 320,
            height: 240,
            frameRate: { ideal: 30 }
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener('loadeddata', () => {
            videoRef.current?.play();
            predictWebcamRef.current?.();
        });
        setPermissionGranted(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError("Camera Blocked");
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    const initMediaPipe = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );

        landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });

        setIsLoading(false);
        startCamera();
      } catch (err) {
        console.error("Failed to init MediaPipe", err);
        setError("AI Model Load Failed");
        setIsLoading(false);
      }
    };

    initMediaPipe();

    return () => {
      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [startCamera]);

  return (
    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-50">
      <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/80 w-32 h-24 sm:w-48 sm:h-36 ring-1 ring-white/10 group">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs text-blue-300 bg-slate-900/90 z-20 px-1">
            <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 animate-spin mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Initializing Vision...</span>
            <span className="sm:hidden">Loading...</span>
          </div>
        )}

        {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[10px] sm:text-xs text-red-400 p-1.5 sm:p-2 text-center bg-slate-900 z-20">
                <AlertCircle className="w-4 h-4 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 opacity-80"/>
                {error}
                <button
                    onClick={() => window.location.reload()}
                    className="mt-1.5 sm:mt-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-white/10 hover:bg-white/20 rounded-full transition border border-white/10 text-[10px] sm:text-xs"
                >
                    Retry
                </button>
            </div>
        )}

        {!permissionGranted && !isLoading && !error && (
             <div className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs text-gray-400 bg-slate-900 z-20 px-1">
                 Waiting for camera...
             </div>
        )}

        {/* Video feed mirrored to match user expectation */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transform -scale-x-100 transition-opacity duration-500 ${isLoading || error ? 'opacity-0' : 'opacity-80'}`}
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1 sm:p-2 flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-1.5">
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${handDataState.isPresent ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-[8px] sm:text-[10px] font-medium text-white/90">
                    {handDataState.isPresent ? 'Tracking' : 'No Hand'}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HandController;
