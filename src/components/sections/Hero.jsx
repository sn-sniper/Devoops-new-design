import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScrambleText } from '../../hooks/useScrambleText';

export function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const { displayText, triggerScramble } = useScrambleText("DEVOOPS");

  useEffect(() => {
    gsap.to(textRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    const handleSequenceComplete = () => triggerScramble();
    window.addEventListener('sequence-complete', handleSequenceComplete);
    
    const fallbackTimer = setTimeout(() => triggerScramble(), 1500);

    return () => {
      window.removeEventListener('sequence-complete', handleSequenceComplete);
      clearTimeout(fallbackTimer);
    };
  }, [triggerScramble]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[70vh] flex flex-col justify-center items-center overflow-hidden border-b border-white/10 px-4"
    >
      <div ref={textRef} className="flex flex-col items-center max-w-4xl mx-auto w-full">
        <h1 className="text-[15vw] md:text-[12vw] leading-[0.85] font-bold text-center uppercase tracking-tighter mix-blend-difference z-10 w-full truncate relative h-[1em]">
          {displayText}
        </h1>
        
        <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8 border-t border-white/20 pt-8">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-2">
              Secure your vision with our Algorithms.
            </h2>
            <p className="font-mono tracking-widest text-sm text-white/50 uppercase">
              We don't just ship code — we craft experiences that scale.
            </p>
          </div>
          
          <div className="flex-1 md:text-right">
            <p className="font-mono tracking-widest text-xs text-white/40 uppercase leading-relaxed">
              Turning coding mistakes into brilliant digital solutions. 
              Where bugs become features and every 'oops' leads to innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
