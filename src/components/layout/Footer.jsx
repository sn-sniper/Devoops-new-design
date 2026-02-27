import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function Footer() {
  const container = useRef(null);
  const filterRef = useRef(null);
  const mapRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: container });

  const handleMouseMove = contextSafe((e) => {
    if (!container.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = container.current.getBoundingClientRect();
    
    // Normalized position from center (-0.5 to 0.5)
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    // Intensity scales based on how far mouse is from the center, or just pure math.random for brutal glitch
    const intensity = Math.abs(x) + Math.abs(y);
    
    // Animate the feTurbulence base frequency
    gsap.to(filterRef.current, {
      attr: { 
        baseFrequency: `${Math.random() * 0.3 * intensity} ${Math.random() * 0.8 * intensity}` 
      },
      duration: 0.1,
      ease: 'none',
      overwrite: 'auto'
    });

    // Animate the displacement map scale
    gsap.to(mapRef.current, {
      attr: { scale: intensity * 150 },
      duration: 0.1,
      ease: 'none',
      overwrite: 'auto'
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(filterRef.current, {
      attr: { baseFrequency: '0.0 0.0' },
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto'
    });
    
    gsap.to(mapRef.current, {
      attr: { scale: 0 },
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  });

  return (
    <footer 
      ref={container} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-32 overflow-hidden border-t border-white/10 flex flex-col items-center justify-center min-h-[60vh] bg-background"
    >
      {/* SVG Definitions for the distortion filter */}
      <svg className="hidden">
        <defs>
          <filter id="glitch-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence 
              ref={filterRef}
              type="fractalNoise" 
              baseFrequency="0.0 0.0" 
              numOctaves="2" 
              result="warp" 
            />
            <feDisplacementMap 
              ref={mapRef}
              in="SourceGraphic" 
              in2="warp" 
              scale="0" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>
      
      <div 
        className="text-[14vw] leading-none font-black font-sans uppercase tracking-tighter text-white select-none pointer-events-none"
        style={{ filter: 'url(#glitch-filter)' }}
      >
        DEVOOPS
      </div>
      
      <div className="absolute bottom-8 flex justify-between items-end w-full px-12 font-mono text-xs text-white/40 uppercase tracking-widest pointer-events-none">
        <div className="space-y-1 text-[10px]">
          <div>T: +961 71 881 429</div>
          <div>T: +1 (619) 873-1807</div>
          <div>E: support@devoops.info</div>
        </div>
        <div className="space-y-1 text-[10px] text-right">
          <div>© {new Date().getFullYear()} DevOops. All systems operational.</div>
        </div>
      </div>
    </footer>
  );
}
