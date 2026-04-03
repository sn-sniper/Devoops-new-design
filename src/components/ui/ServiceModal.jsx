import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useScrambleText } from '../../hooks/useScrambleText';

export function ServiceModal({ service, onClose }) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  
  const { displayText, triggerScramble } = useScrambleText(service?.title || '');

  const { contextSafe } = useGSAP(() => {
    if (!service) return;

    // Initial hidden state
    gsap.set(containerRef.current, { width: 0, height: 2, overflow: 'hidden' });
    gsap.set(contentRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        triggerScramble();
      }
    });

    // Stage 1: Fast X-Axis width expansion
    tl.to(containerRef.current, {
      width: '100%',
      maxWidth: '48rem', // max-w-3xl approximately
      duration: 0.5,
      ease: 'expo.inOut'
    })
    // Stage 2: Fast Y-Axis height expansion
    .to(containerRef.current, {
      height: 'auto',
      minHeight: '60vh',
      duration: 0.5,
      ease: 'expo.inOut'
    })
    // Stage 3: Fade in content 
    .to(contentRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    });

  }, { scope: overlayRef, dependencies: [service] });

  const handleClose = () => {
    contextSafe(() => {
      const tl = gsap.timeline({
        onComplete: onClose
      });
      
      tl.to(contentRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      })
      .to(containerRef.current, {
        height: 2,
        minHeight: 0,
        duration: 0.4,
        ease: 'expo.inOut'
      })
      .to(containerRef.current, {
        width: 0,
        duration: 0.4,
        ease: 'expo.inOut'
      });
    })();
  };

  if (!service) return null;

  return createPortal(
    <div 
      ref={overlayRef}
      onClick={handleClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-mono"
    >
      <div 
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-background border border-white/30 flex flex-col w-full max-w-3xl"
      >
        {/* Brutalist Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/80 -translate-x-px -translate-y-px" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/80 translate-x-px -translate-y-px" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/80 -translate-x-px translate-y-px" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/80 translate-x-px translate-y-px" />

        <div ref={contentRef} className="flex-1 flex flex-col p-8 md:p-12 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div className="font-mono text-xs text-white/50 tracking-widest uppercase">
              [SRV_DETAILS_0{service.id || 1}]
            </div>
            <button 
              onClick={handleClose}
              className="font-mono text-xs text-white/70 hover:text-white hover:bg-white/10 px-2 py-1 transition-colors tracking-widest cursor-crosshair"
            >
              [ CLOSE_CONNECTION ]
            </button>
          </div>

          {/* Body */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-sans uppercase tracking-tighter mb-8 text-white leading-none">
              {displayText}
            </h2>
            <p className="text-white/70 font-mono text-base mb-12 leading-relaxed max-w-2xl">
              {service.description}
            </p>

            {service.benefits && service.benefits.length > 0 && (
              <div className="mb-12">
                <h3 className="font-mono text-xs text-white/50 mb-6 tracking-widest uppercase">
                  [KEY_CAPABILITIES]
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm font-mono text-white/80">
                      <span className="text-white/30 mt-0.5">{'>'}</span> {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer - Tech Stack */}
          {service.technologies && service.technologies.length > 0 && (
            <div className="pt-8 border-t border-white/10 mt-8">
              <h3 className="font-mono text-xs text-white/50 mb-6 tracking-widest uppercase">
                [TECH_STACK]
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, i) => (
                  <span key={i} className="font-mono text-xs text-white/60 uppercase border border-white/20 px-3 py-1.5 tracking-widest bg-white/5 whitespace-nowrap">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
