import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { GeoJsonFeature, GlobeTheme } from '../types';

interface GlobeProps {
  theme: GlobeTheme;
}

const Globe: React.FC<GlobeProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [geoData, setGeoData] = useState<GeoJsonFeature[]>([]);

  // Animation/Interaction Refs
  const rotationRef = useRef<[number, number, number]>([0, -20, 0]);
  const scaleRef = useRef<number>(180);
  const isDraggingRef = useRef<boolean>(false);
  const enableShadowRef = useRef(theme.enableShadow);

  // Color Scale for Political Map
  const colorScale = useMemo(() => d3.scaleOrdinal(d3.schemeSpectral[11]), []);

  // Load Map Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
        const world = await response.json();
        const countries = topojson.feature(world, world.objects.countries) as { features: GeoJsonFeature[] };
        setGeoData(countries.features);
      } catch (error) {
        console.error("Failed to load globe data", error);
      }
    };
    fetchData();
  }, []);

  // Update Visuals when Theme Changes
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    // Update Defs (Gradients)
    const defs = svg.select('defs');
    if (!defs.empty()) {
        const oceanGradient = defs.select('#oceanGradient');
        const oceanStops = oceanGradient.selectAll('stop').data([0, 1]);

        if (Array.isArray(theme.oceanColor)) {
            oceanStops.join(
                enter => enter.append('stop'),
                update => update,
                exit => exit.remove()
            )
            .attr('offset', (d, i) => `${i * 100}%`)
            .attr('stop-color', (d, i) => theme.oceanColor[i]);
        } else {
            oceanStops.join(
                enter => enter.append('stop'),
                update => update,
                exit => exit.remove()
            )
            .attr('offset', (d, i) => `${i * 100}%`)
            .attr('stop-color', theme.oceanColor);
        }

        const atmosGradient = defs.select('#atmosGradient');
        const atmosStops = atmosGradient.selectAll('stop').data([0, 1]);
        atmosStops.join(
            enter => enter.append('stop'),
            update => update,
            exit => exit.remove()
        )
        .attr('offset', (d, i) => `${i * 100}%`)
        .attr('stop-color', theme.atmosphereColor)
        .attr('stop-opacity', (d, i) => i === 0 ? 0 : theme.atmosphereOpacity);
    }

    // Update Paths
    const globeGroup = svg.select('.globe-group');

    // Apply shape-rendering for retro themes to get jagged pixel edges
    globeGroup.attr('shape-rendering', theme.id === 'retro' ? 'crispEdges' : 'auto');

    globeGroup.select('.ocean')
        .transition().duration(500)
        .attr('stroke', theme.strokeColor === 'none' ? 'none' : d3.color(theme.strokeColor)?.darker(0.5)?.toString() || theme.strokeColor);

    globeGroup.select('.graticule')
        .transition().duration(500)
        .attr('stroke', theme.graticuleColor);

    globeGroup.selectAll<SVGPathElement, GeoJsonFeature>('.country-path')
        .transition().duration(500)
        .attr('fill', (d, i) => {
            if (theme.colorMode === 'political') {
                return colorScale(String(d.id ?? i));
            }
            return theme.landColor;
        })
        .attr('stroke', theme.strokeColor)
        .attr('stroke-width', theme.strokeWidth || 0.5);

    // Update Shadow visibility
    globeGroup.select('.night-shadow')
        .transition().duration(500)
        .attr('opacity', theme.enableShadow ? 0.6 : 0);

    // Update Sun Highlight visibility
    globeGroup.select('.sun-highlight')
        .transition().duration(500)
        .attr('opacity', theme.enableShadow ? 0.5 : 0);

  }, [theme, geoData, colorScale]);

  // Update enableShadow ref when theme changes
  useEffect(() => {
    enableShadowRef.current = theme.enableShadow;
  }, [theme.enableShadow]);

  // Initialize Globe & Animation Loop
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const container = containerRef.current;

    let width = container?.clientWidth || 800;
    let height = container?.clientHeight || 600;

    const projection = d3.geoOrthographic()
      .translate([width / 2, height / 2])
      .clipAngle(90);

    const pathGenerator = d3.geoPath().projection(projection);

    // Setup SVG structure
    svg.selectAll('*').remove(); // Clear all
    const defs = svg.append('defs');

    // Glow Filter
    const glowFilter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%').attr('y', '-50%')
      .attr('width', '200%').attr('height', '200%');
    glowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'coloredBlur');
    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Gradients
    defs.append('radialGradient').attr('id', 'oceanGradient').attr('cx', '50%').attr('cy', '50%').attr('r', '50%');
    defs.append('radialGradient').attr('id', 'atmosGradient').attr('cx', '50%').attr('cy', '50%').attr('r', '50%');

    // Sun Highlight Gradient
    const sunGradient = defs.append('radialGradient')
        .attr('id', 'sunGradient')
        .attr('cx', '50%').attr('cy', '50%').attr('r', '50%');
    sunGradient.append('stop').attr('offset', '0%').attr('stop-color', '#ffffff').attr('stop-opacity', 0.8);
    sunGradient.append('stop').attr('offset', '100%').attr('stop-color', '#ffffff').attr('stop-opacity', 0);

    const globeGroup = svg.append('g').attr('class', 'globe-group');

    // 1. Ocean
    const ocean = globeGroup.append('path')
      .datum({ type: 'Sphere' })
      .attr('class', 'ocean')
      .attr('fill', 'url(#oceanGradient)')
      .attr('stroke-width', 1.5)
      .style('filter', 'url(#glow)');

    // 2. Graticule
    const graticuleObj = d3.geoGraticule();
    const graticule = globeGroup.append('path')
      .datum(graticuleObj())
      .attr('class', 'graticule')
      .attr('fill', 'none')
      .attr('stroke-width', 0.5)
      .attr('stroke-opacity', 0.4);

    // 3. Countries
    const countriesGroup = globeGroup.append('g').attr('class', 'countries');

    // 4. Night Shadow (Terminator)
    const shadowGroup = globeGroup.append('path')
        .attr('class', 'night-shadow')
        .attr('fill', '#000000')
        .attr('opacity', 0)
        .attr('pointer-events', 'none')
        .style('mix-blend-mode', 'multiply');

    // 5. Sun Specular Highlight
    const sunHighlight = globeGroup.append('path')
        .attr('class', 'sun-highlight')
        .attr('fill', 'url(#sunGradient)')
        .attr('opacity', 0)
        .attr('pointer-events', 'none')
        .style('mix-blend-mode', 'screen');

    // 6. Atmosphere Overlay
    const atmosphere = globeGroup.append('path')
      .datum({ type: 'Sphere' })
      .attr('class', 'atmosphere')
      .attr('fill', 'url(#atmosGradient)')
      .attr('pointer-events', 'none');

    // Resize Handler
    const updateDimensions = () => {
      if (containerRef.current) {
         width = containerRef.current.clientWidth;
         height = containerRef.current.clientHeight;
         if (scaleRef.current === 180) {
            // Adjust scale for mobile - smaller initial scale
            const isMobile = width < 768;
            scaleRef.current = isMobile
              ? Math.min(width, height) / 2.8
              : Math.min(width, height) / 3.2;
         }
         projection.translate([width / 2, height / 2]);
      }
    };
    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    // Interaction behaviors
    const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([150, 4000])
        .on('zoom', (event) => {
            scaleRef.current = event.transform.k;
        });

    const drag = d3.drag<SVGSVGElement, unknown>()
        .touchable(true) // Enable touch support
        .on('start', () => { isDraggingRef.current = true; })
        .on('drag', (event) => {
            const [r1, r2, r3] = rotationRef.current;
            const k = 75 / scaleRef.current;
            // Adjust sensitivity for touch devices
            const isTouch = event.sourceEvent?.type?.startsWith('touch');
            const sensitivity = isTouch ? 1.2 : 1;
            rotationRef.current = [r1 + event.dx * k * sensitivity, r2 - event.dy * k * sensitivity, r3];
        })
        .on('end', () => { isDraggingRef.current = false; });

    svg.call(drag);
    svg.call(zoom)
       .call(zoom.transform, d3.zoomIdentity.scale(scaleRef.current))
       .on("mousedown.zoom", null)
       .on("touchstart.zoom", null)
       .on("touchmove.zoom", null)
       .on("touchend.zoom", null);

    // Helpers for Sun/Shadow
    const circleGenerator = d3.geoCircle().radius(90);

    // Render Loop
    const timer = d3.timer(() => {
        // Auto Rotation
        if (!isDraggingRef.current) {
            const [r1, r2, r3] = rotationRef.current;
            rotationRef.current = [r1 + 0.05, r2, r3];
        }

        const [r1, r2] = rotationRef.current;
        const sunLong = -r1 + 50;
        const sunLat = -r2 + 20;

        // Projection Update
        projection.scale(scaleRef.current).rotate(rotationRef.current);

        // Draw Standard Layers
        ocean.attr('d', pathGenerator as unknown as (d: { type: string }) => string | null);
        graticule.attr('d', pathGenerator as unknown as (d: d3.GeoPermissibleObjects) => string | null);
        countriesGroup.selectAll<SVGPathElement, GeoJsonFeature>('path').attr('d', (d) => pathGenerator(d as d3.GeoPermissibleObjects) ?? null);
        atmosphere.attr('d', pathGenerator as unknown as (d: { type: string }) => string | null);

        // Draw Shadow
        if (enableShadowRef.current) {
             circleGenerator.center([sunLong + 180, -sunLat]).radius(90);
             const shadowPath = pathGenerator(circleGenerator() as d3.GeoPermissibleObjects);
             shadowGroup.attr('d', shadowPath ?? null);

             circleGenerator.center([sunLong, sunLat]).radius(25);
             const sunPath = pathGenerator(circleGenerator() as d3.GeoPermissibleObjects);
             sunHighlight.attr('d', sunPath ?? null);
        }

    });

    return () => {
        timer.stop();
        window.removeEventListener('resize', updateDimensions);
    };
  }, []); // Only run once on mount

  // Data Binding Effect
  useEffect(() => {
    if (!svgRef.current || !geoData.length) return;

    const svg = d3.select(svgRef.current);
    const countriesGroup = svg.select('g.countries');

    countriesGroup.selectAll<SVGPathElement, GeoJsonFeature>('path')
        .data(geoData)
        .join(
            enter => enter.append('path')
                .attr('class', 'country-path')
                .attr('stroke-width', theme.strokeWidth || 0.5) // Initial render
                .attr('fill', (d, i) => {
                    if (theme.colorMode === 'political') return colorScale(String(d.id ?? i));
                    return theme.landColor;
                })
                .attr('stroke', theme.strokeColor)
        );

  }, [geoData, theme, colorScale]);

  return (
    <div ref={containerRef}
         className="w-full h-full relative overflow-hidden transition-colors duration-700"
         style={{ background: theme.background }}>

        {/* Dense Starfield */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${theme.showStars ? 'opacity-100' : 'opacity-0'}`}
             style={{
               backgroundImage: `
                 radial-gradient(1px 1px at 20% 30%, white, transparent),
                 radial-gradient(1px 1px at 60% 70%, white, transparent),
                 radial-gradient(2px 2px at 50% 50%, white, transparent),
                 radial-gradient(1px 1px at 80% 10%, white, transparent),
                 radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.8), transparent),
                 radial-gradient(2px 2px at 33% 80%, white, transparent),
                 radial-gradient(1px 1px at 15% 90%, rgba(255,255,255,0.9), transparent),
                 radial-gradient(1px 1px at 75% 25%, white, transparent),
                 radial-gradient(1px 1px at 40% 15%, rgba(255,255,255,0.7), transparent),
                 radial-gradient(2px 2px at 25% 45%, white, transparent),
                 radial-gradient(1px 1px at 95% 85%, white, transparent),
                 radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.8), transparent),
                 radial-gradient(1px 1px at 70% 95%, white, transparent),
                 radial-gradient(1px 1px at 45% 35%, rgba(255,255,255,0.9), transparent),
                 radial-gradient(2px 2px at 85% 45%, white, transparent),
                 radial-gradient(1px 1px at 55% 5%, white, transparent),
                 radial-gradient(1px 1px at 5% 55%, rgba(255,255,255,0.7), transparent),
                 radial-gradient(1px 1px at 35% 65%, white, transparent)
               `,
               backgroundSize: '200px 200px, 220px 220px, 180px 180px, 240px 240px, 200px 200px, 210px 210px, 190px 190px, 230px 230px, 200px 200px, 220px 220px, 180px 180px, 210px 210px, 240px 240px, 190px 190px, 200px 200px, 230px 230px, 220px 220px, 200px 200px',
               backgroundPosition: '0 0, 50px 50px, 100px 100px, 150px 150px, 25px 75px, 75px 125px, 125px 25px, 175px 75px, 200px 200px, 250px 50px, 50px 250px, 100px 150px, 150px 100px, 175px 225px, 225px 175px, 25px 200px, 200px 25px, 75px 175px'
             }}>
        </div>

        {/* Enhanced Nebula with multiple layers */}
        <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${theme.nebula ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-purple-900/20 blur-[100px] rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-blue-800/15 blur-[80px] rounded-full" />
          <div className="absolute bottom-1/4 left-1/3 w-2/5 h-2/5 bg-indigo-900/10 blur-[120px] rounded-full" />
        </div>

        <svg
          ref={svgRef}
          className="w-full h-full relative z-10 cursor-move touch-none"
          style={{ touchAction: 'none' }}
        />

        {!geoData.length && (
           <div className={`absolute inset-0 flex items-center justify-center z-50 font-mono text-xs sm:text-sm tracking-widest animate-pulse px-4 text-center ${theme.type === 'dark' ? 'text-white' : 'text-slate-800'}`}>
             LOADING TERRA DATA...
           </div>
        )}
    </div>
  );
};

export default Globe;
