import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import abdallahImg from '../../assets/abdallah.jpg';
import georgeImg from '../../assets/george.jpg';
import hassanImg from '../../assets/hassan.jpg';
import jadImg from '../../assets/jad.jpg';

const teamMembers = [
  { id: '001', name: 'ABDALLAH EL-SAYED AHMAD', role: 'CO-FOUNDER', image: abdallahImg },
  { id: '002', name: 'GEORGE TERS', role: 'CO-FOUNDER', image: georgeImg },
  { id: '003', name: 'HASSAN ASSAAD', role: 'PARTNER', image: hassanImg },
  { id: '004', name: 'JAD KADDOUR', role: 'PARTNER', image: jadImg },
];

export function Team() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: viewportRef });

  const handleMouseEnter = contextSafe(() => {
    gsap.to('.viewport-border', { borderColor: 'var(--color-primary)', duration: 0.4, overwrite: 'auto' });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to('.viewport-border', { borderColor: 'var(--color-hud)', duration: 0.6, overwrite: 'auto' });
  });

  useGSAP(() => {
    gsap.to(trackRef.current, { 
      yPercent: -100 * activeIndex, 
      duration: 0.6, 
      ease: 'power4.out',
      overwrite: 'auto'
    });
  }, { dependencies: [activeIndex] });

  return (
    <section className="h-auto lg:h-screen lg:overflow-hidden border-t border-hud grid grid-cols-1 lg:grid-cols-2 relative">
      
      <div className="relative flex items-center justify-center p-8 lg:p-16 h-auto lg:h-full z-10">
        
        <div 
          ref={viewportRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-sm lg:max-w-md aspect-3/4 pointer-events-auto"
        >
          
          <div className="tl-bracket absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -translate-x-px -translate-y-px z-30 pointer-events-none" />
          <div className="tr-bracket absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary translate-x-px -translate-y-px z-30 pointer-events-none" />
          <div className="bl-bracket absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -translate-x-px translate-y-px z-30 pointer-events-none" />
          <div className="br-bracket absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary translate-x-px translate-y-px z-30 pointer-events-none" />

          <div className="viewport-border relative w-full h-full overflow-hidden border border-hud bg-background/50 z-20">
          
          <div className="absolute top-4 left-4 font-mono text-[10px] bg-primary text-background px-1.5 py-0.5 tracking-widest z-20">
            [VISUAL_FEED_ACTIVE]
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] bg-primary text-background px-1.5 py-0.5 tracking-widest z-20">
            [{String(activeIndex + 1).padStart(3, '0')}/{String(teamMembers.length).padStart(3, '0')}]
          </div>

          <div ref={trackRef} className="absolute top-0 left-0 w-full h-full flex flex-col will-change-transform z-10">
            {teamMembers.map((member) => (
              <div key={member.id} className="w-full h-full shrink-0 bg-background relative group">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity contrast-125 hover:grayscale-0 hover:mix-blend-normal hover:opacity-100 transition-all duration-700" 
                />
              </div>
            ))}
          </div>

          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-hud px-8 lg:px-16 py-12 lg:py-0 h-auto lg:h-full">
        {teamMembers.map((member, idx) => {
          const isActive = activeIndex === idx;
          
          return (
            <div 
              key={member.id}
              onMouseEnter={() => setActiveIndex(idx)}
              className="group cursor-pointer py-6 xl:py-8 border-b border-hud last:border-b-0"
            >
              <div className={`transition-all duration-500 ease-in-out ${isActive ? 'opacity-100 md:translate-x-4' : 'opacity-30'}`}>
                
                <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-2 xl:mb-3">
                  <span className="font-mono text-[10px] xl:text-xs text-primary bg-primary/10 px-2 py-1 uppercase tracking-widest">
                    [{member.id}]
                  </span>
                  <span className="font-mono text-[11px] xl:text-sm tracking-widest text-muted uppercase">
                    {member.role}
                  </span>
                </div>

                <h3 className="text-lg sm:text-4xl lg:text-4xl xl:text-5xl uppercase font-black font-sans tracking-tight leading-[0.9] wrap-break-word text-primary">
                  {member.name}
                </h3>
                
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
