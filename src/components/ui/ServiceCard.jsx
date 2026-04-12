import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useScrambleText } from '../../hooks/useScrambleText';

export function ServiceCard({ title, description, technologies, index, onClick }) {
  const containerRef = useRef(null);
  const { displayText, triggerScramble } = useScrambleText(title);
  
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe(() => {
    triggerScramble();
    gsap.to('.border-target', { borderColor: 'var(--color-primary)', duration: 0.4, overwrite: 'auto' });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to('.border-target', { borderColor: 'var(--color-hud)', duration: 0.6, overwrite: 'auto' });
  });

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative w-full h-full cursor-crosshair group"
    >
      <div 
        className="border-target relative bg-background border border-hud p-8 h-full flex flex-col justify-between min-h-[320px] lg:min-h-[380px]"
      >
        <div className="tl-bracket absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -translate-x-px -translate-y-px" />
        <div className="tr-bracket absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary translate-x-px -translate-y-px" />
        <div className="bl-bracket absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -translate-x-px translate-y-px" />
        <div className="br-bracket absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary translate-x-px translate-y-px" />

        <div>
          <div className="font-mono text-xs text-muted mb-6 tracking-widest uppercase">
            [SRV_0{index}]
          </div>
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-black font-sans uppercase tracking-tighter mb-4 text-primary leading-none">
            {displayText}
          </h2>
          <p className="text-muted font-mono text-sm leading-relaxed max-w-sm">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-12 pt-6 border-t border-hud">
          {technologies.map((tech, i) => (
            <span key={i} className="font-mono text-[10px] md:text-xs text-muted uppercase border border-hud px-2 py-1 tracking-widest bg-primary/5 whitespace-nowrap">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
