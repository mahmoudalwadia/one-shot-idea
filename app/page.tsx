"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, Suspense } from "react";
import { useAnalytics } from '@/app/hooks/useAnalytics';
import { usePageTracking } from '@/app/hooks/usePageTracking';

function HomeContent() {
  const analytics = useAnalytics();

  // Add automatic page tracking
  usePageTracking();

  const ideas = [
    { slug: "masonry", title: "Glass Masonry Gallery", featured: false },
    { slug: "hand-3d", title: "The Scarred Hand", featured: false },
    { slug: "simulation", title: "Simulation Patterns", featured: false },
    { slug: "world-explorer", title: "World Explorer", featured: false },
    { slug: "japanese-web", title: "デジタル東京", featured: false },
    { slug: "supernova", title: "Supernova", featured: true },
    { slug: "retro-dashboard", title: "Retro-Futuristic Dashboard", featured: false },
    { slug: "xenon-interface", title: "Xenon Interface 9000", featured: false },
    { slug: "chameleon-chat", title: "Chameleon Chat", featured: false },
    { slug: "terra", title: "Terra", featured: true },
    { slug: "minesweeper", title: "Minesweeper", featured: false },
    { slug: "terminal-solitaire", title: "Terminal Solitaire", featured: false },
    { slug: "gambit-viz---ascii", title: "Gambit Viz", featured: true },
    { slug: "ascii-cortex", title: "ASCII Cortex", featured: false },
    { slug: "a-train-retro-sim", title: "A-Train Retro Sim", featured: false },
    { slug: "pixel-chaos-engine", title: "Pixel Chaos Engine", featured: true },
    { slug: "hero-adventure-retro", title: "Hero Adventure Retro", featured: false },
    { slug: "retro-tetris", title: "Retro Tetris", featured: true },
  ];

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const baseOpacities = useRef<number[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const aboutButtonRef = useRef<HTMLButtonElement | null>(null);
  const [buttonPosition, setButtonPosition] = useState<{ x: number; y: number } | null>(null);

  // Derive modal state from URL
  const isModalOpenFromURL = searchParams.get("about") === "true";

  // Track if modal should be visible (for closing animation)
  // Keep modal mounted if it's open OR if we're closing (to allow animation to complete)
  const shouldShowModal = isModalOpenFromURL || isClosing;

  // Update button position when modal opens from URL
  useEffect(() => {
    if (isModalOpenFromURL && !buttonPosition && aboutButtonRef.current) {
      const rect = aboutButtonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setButtonPosition({ x: centerX, y: centerY });
      setIsClosing(false);
      setIsAnimating(true);
      // Start animation after a tiny delay to ensure initial state is set
      setTimeout(() => setIsAnimating(false), 50);
    }
  }, [isModalOpenFromURL, buttonPosition]);

  useEffect(() => {
    const updateOpacity = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearTop = scrollY < 100; // Within 100px of top
      const isNearBottom = scrollY + viewportHeight >= documentHeight - 100; // Within 100px of bottom

      itemRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;

        let opacity = 1;

        if (isNearTop) {
          // When at top, top items get full opacity, others fade
          const distanceFromTop = rect.top;
          const fadeStart = viewportHeight * 0.4; // Start fading after 40% of viewport
          const fadeEnd = viewportHeight * 1.2;

          if (distanceFromTop <= fadeStart) {
            // Items in top zone have full opacity
            opacity = 1;
          } else {
            // Items below fade based on distance from top
            const fadeRange = fadeEnd - fadeStart;
            const fadeAmount = (distanceFromTop - fadeStart) / fadeRange;
            opacity = Math.max(0.2, 1 - fadeAmount);
          }
        } else if (isNearBottom) {
          // When near bottom, bottom items get full opacity, others fade
          const distanceFromBottom = viewportHeight - rect.bottom;
          const fadeStart = viewportHeight * 0.4; // Start fading after 40% from bottom
          const fadeEnd = viewportHeight * 1.2;

          if (distanceFromBottom <= fadeStart) {
            // Items in bottom zone have full opacity
            opacity = 1;
          } else {
            // Items above fade based on distance from bottom
            const fadeRange = fadeEnd - fadeStart;
            const fadeAmount = (distanceFromBottom - fadeStart) / fadeRange;
            opacity = Math.max(0.2, 1 - fadeAmount);
          }
        } else {
          // Normal scroll: focus on center of viewport
          const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
          const fadeDistance = viewportHeight * 0.6; // Fade distance from center
          opacity = Math.max(0.2, 1 - (distanceFromCenter / fadeDistance));
        }

        baseOpacities.current[index] = opacity;

        // Only apply scroll-based opacity if no item is hovered
        if (hoveredIndex === null) {
          ref.style.opacity = opacity.toString();
        }
      });
    };

    // Initialize all items at full opacity
    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.opacity = "1";
        baseOpacities.current[index] = 1;
      }
    });

    // Small delay to ensure layout is complete, then update
    setTimeout(updateOpacity, 100);
    window.addEventListener("scroll", updateOpacity, { passive: true });
    window.addEventListener("resize", updateOpacity, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateOpacity);
      window.removeEventListener("resize", updateOpacity);
    };
  }, [hoveredIndex, ideas.length]);

  // Update opacity when hover state changes
  useEffect(() => {
    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;

      if (hoveredIndex === index) {
        // Hovered item gets full opacity
        ref.style.opacity = "1";
      } else if (hoveredIndex !== null) {
        // Other items get reduced opacity when something is hovered
        ref.style.opacity = "0.3";
      } else {
        // No hover, use base opacity from scroll
        ref.style.opacity = (baseOpacities.current[index] ?? 1).toString();
      }
    });
  }, [hoveredIndex]);

  // Track project navigation
  const handleProjectClick = (slug: string, title: string) => {
    analytics.logProjectView({
      project_slug: slug,
      project_title: title,
      from_page: 'home',
    });
  };

  // Handle modal open
  const openModal = () => {
    if (aboutButtonRef.current) {
      const rect = aboutButtonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setButtonPosition({ x: centerX, y: centerY });
    }

    // Track modal open
    analytics.logModal({
      modal_name: 'about',
      action: 'open',
      trigger: 'button',
    });

    setIsClosing(false);
    setIsAnimating(true);
    router.push("?about=true", { scroll: false });
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Handle modal close
  const closeModal = useCallback(() => {
    // Track modal close
    analytics.logModal({
      modal_name: 'about',
      action: 'close',
      trigger: 'user_action',
    });

    setIsClosing(true);
    setIsAnimating(true);
    // Wait for animation to complete before changing URL
    setTimeout(() => {
      router.push("/", { scroll: false });
      // Small delay before cleaning up state to ensure smooth transition
      setTimeout(() => {
        setIsAnimating(false);
        setIsClosing(false);
        setButtonPosition(null);
      }, 50);
    }, 400);
  }, [router, analytics]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && shouldShowModal && !isClosing) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [shouldShowModal, isClosing, closeModal]);

  // Prevent body scroll when modal is open on mobile
  useEffect(() => {
    if (shouldShowModal) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [shouldShowModal]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <>
      <div className="min-h-screen flex items-start justify-start p-4 sm:p-8 md:p-16 lg:p-24">
        {/* Ideas List */}
        <nav className="flex flex-col gap-0 w-full max-w-4xl">
          {/* About Link - Top */}
          <div
            className="transition-opacity duration-500 ease-out"
            style={{ opacity: 1 }}
          >
            <button
              ref={aboutButtonRef}
              onClick={openModal}
              className="block text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight transition-opacity duration-300 py-2 hover:opacity-70 active:opacity-50 cursor-pointer touch-manipulation flash-slow"
              style={{ fontFamily: 'var(--font-vt323), monospace' }}
            >
              ?????
            </button>
          </div>

          {ideas.map((idea, index) => {
            return (
              <div
                key={idea.slug}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-index={index}
                className="transition-opacity duration-500 ease-out"
                style={{ opacity: 1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link
                  href={`/ideas/${idea.slug}`}
                  onClick={() => handleProjectClick(idea.slug, idea.title)}
                  className="flex items-center text-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight transition-opacity duration-300 py-2"
                  style={{ fontFamily: 'system-ui, -apple-system, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                >
                  <span className="inline-block w-12 md:w-16 lg:w-20 text-left">
                    {formatNumber(index)}.
                  </span>
                  <span className="ml-2">{idea.title}</span>
                  {idea.featured && (
                    <span className="ml-2">
                      <img
                        src="/pixel-star.svg"
                        alt="⭐"
                        className="w-6 h-6 lg:w-8 lg:h-8"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </span>
                  )}
          </Link>
              </div>
            );
          })}
      </nav>
    </div>

      {/* Modal */}
      {shouldShowModal && buttonPosition && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={isClosing ? undefined : closeModal}
          style={{
            pointerEvents: isClosing ? "none" : "auto",
            paddingTop: 'max(0.5rem, env(safe-area-inset-top))',
            paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
            paddingLeft: 'max(0.5rem, env(safe-area-inset-left))',
            paddingRight: 'max(0.5rem, env(safe-area-inset-right))',
          }}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-400 ${
              isAnimating && isClosing ? "opacity-0" : "opacity-100"
            }`}
            style={{
              top: 'env(safe-area-inset-top)',
              bottom: 'env(safe-area-inset-bottom)',
              left: 'env(safe-area-inset-left)',
              right: 'env(safe-area-inset-right)',
            }}
          />

          {/* Modal Content */}
          <div
            className="modal-content relative w-full max-w-2xl overflow-y-auto rounded-lg sm:rounded-xl md:rounded-2xl border border-white/20 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
              transformOrigin: `${buttonPosition.x}px ${buttonPosition.y}px`,
              transform: isAnimating && isClosing
                ? `translate(${buttonPosition.x - window.innerWidth / 2}px, ${buttonPosition.y - window.innerHeight / 2}px) scale(0)`
                : isAnimating && !isClosing
                ? `translate(${buttonPosition.x - window.innerWidth / 2}px, ${buttonPosition.y - window.innerHeight / 2}px) scale(0)`
                : `translate(0, 0) scale(1)`,
              opacity: isAnimating && isClosing ? 0 : isAnimating && !isClosing ? 0 : 1,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out",
              maxHeight: 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 1rem)',
              WebkitOverflowScrolling: 'touch',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors text-white font-bold text-xl sm:text-2xl touch-manipulation z-10"
              style={{ minWidth: '44px', minHeight: '44px' }}
              aria-label="Close"
            >
              ×
            </button>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-12 pb-6 sm:pb-8 md:pb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-white tracking-tight pr-10 sm:pr-12">
                About
              </h2>
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed space-y-3 sm:space-y-4">
                <p>
                  One Shot Idea is a small creative hobby.
                </p>
                <p>
                  I build UI ideas almost in one shot, in less than an hour, using LLMs. Some ideas are functional, some are purely visual, and some are incomplete. That is intentional.
                </p>
                <p>
                  Most of my work is in backend systems, infrastructure, and more recently hardware and AI. I never stopped building, but I drifted away from UI. This project is me spending time there again, without pressure.
                </p>
                <p>
                  The work here can be a quick clone, an interpretation of something I saw, or a completely new idea. The goal is exploration, not polish.
                </p>
                <p>
                  I cannot draw and my handwriting is bad, but I have always felt there is an artist with good taste inside me. LLMs act as a proxy for that taste, letting me turn visual intuition into something tangible through clear communication with a machine.
                </p>
              </div>
              <div className="mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 border-t border-white/20">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                  <a
                    href="https://www.mahmoudalwadia.com/"
                    onClick={() => analytics.logExternalLink({
                      link_url: 'https://www.mahmoudalwadia.com/',
                      link_text: 'finedme',
                      link_domain: 'mahmoudalwadia.com',
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg text-white/80 hover:text-white px-4 py-3 sm:px-3 sm:py-2 rounded-md border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all duration-200 active:scale-95 touch-manipulation"
                    style={{ minHeight: '44px' }}
                  >
                    <span>finedme</span>
                    <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/mahmoudalwadia/one-shot-idea"
                    onClick={() => analytics.logExternalLink({
                      link_url: 'https://github.com/mahmoudalwadia/one-shot-idea',
                      link_text: 'Source Code',
                      link_domain: 'github.com',
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg text-white/80 hover:text-white px-4 py-3 sm:px-3 sm:py-2 rounded-md border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all duration-200 active:scale-95 touch-manipulation"
                    style={{ minHeight: '44px' }}
                  >
                    <span>Source Code</span>
                    <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-start justify-start p-4 sm:p-8 md:p-16 lg:p-24">
        <nav className="flex flex-col gap-0 w-full max-w-4xl">
          <div className="transition-opacity duration-500 ease-out" style={{ opacity: 1 }}>
            <button
              className="block text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight transition-opacity duration-300 py-2 hover:opacity-70 active:opacity-50 cursor-pointer touch-manipulation flash-slow"
              style={{ fontFamily: 'var(--font-vt323), monospace' }}
            >
              ?????
            </button>
          </div>
        </nav>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
