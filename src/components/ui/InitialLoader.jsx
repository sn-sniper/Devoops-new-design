import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScrambleText } from '../../hooks/useScrambleText';

export function InitialLoader({ onComplete }) {
  const [status, setStatus] = useState('initializing'); 
  const containerRef = useRef(null);
  const btnContainerRef = useRef(null);
  const bracketsRef = useRef(null);
  const sloganWrapperRef = useRef(null);

  const { displayText } = useScrambleText("WE DO NOT COMPROMISE");

  useEffect(() => {
    let timer;
    if (status === 'initializing') {
      timer = setTimeout(() => {
        setStatus('awaiting');
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [status]);

  const handleUnlock = () => {
    if (status !== 'awaiting') return;
    setStatus('animating');

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    tl.to(btnContainerRef.current, { opacity: 0, duration: 0.2, ease: 'power2.out' })

    .to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut' 
    })
    
    .fromTo('#main-content', {
      scale: 0.95,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.0,
      ease: 'power3.out'
    }, "-=0.4");
  };

  return (
    <div 
      ref={containerRef}
      id="loader-bg" 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background pointer-events-auto"
    >
      {status === 'initializing' && (
        <div className="font-mono text-sm tracking-widest text-muted animate-pulse">
          [SYSTEM INITIALIZING...]
        </div>
      )}

      {(status === 'awaiting' || status === 'animating') && (
        <div ref={btnContainerRef} className="flex flex-col items-center gap-6 z-10">
          <button 
            onClick={handleUnlock}
            className="bg-white text-black font-sans font-black uppercase text-2xl md:text-3xl tracking-widest px-12 py-4 hover:bg-gray-200 transition-colors"
            style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
          >
            ENTER
          </button>
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
            [AUDIO RECOMMENDED]
          </div>
        </div>
      )}

      <div 
        ref={bracketsRef} 
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
      >
        <div className="relative flex items-center justify-between aspect-square w-[75vmin]" style={{ fontSize: '30vmin' }}>
          <span className="font-sans font-thin text-white/20 select-none leading-none absolute left-0">[</span>
          <span className="font-sans font-thin text-white/20 select-none leading-none absolute right-0">]</span>
        </div>
      </div>
      
      <div 
        ref={sloganWrapperRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 mix-blend-difference"
      >
        <h1 className="font-sans font-black uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter text-white text-center px-4 w-full wrap-break-word leading-none">
          {displayText}
        </h1>
      </div>
      
    </div>
  );
}
