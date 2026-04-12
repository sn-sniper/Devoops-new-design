import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function About() {
  const textRef = useRef(null);

  useEffect(() => {
    const lines = textRef.current.querySelectorAll('.reveal-line');
    
    gsap.fromTo(lines, 
      { y: 50, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
      {
        y: 0,
        opacity: 1,
        clipPath: 'polygon(0 -100%, 100% -100%, 100% 200%, 0 200%)',
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section className="py-32 px-4 border-b border-hud" ref={textRef}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-sm font-mono tracking-widest text-muted mb-12">[ABOUT_DEVOOPS]</h2>
        <div className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase leading-[1.1] mb-16">
          <div className="overflow-hidden"><div className="reveal-line">SHAPING DIGITAL SINCE 2022.</div></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-sm tracking-widest text-muted uppercase leading-relaxed">
          <div>
            <div className="overflow-hidden mb-4"><div className="reveal-line text-primary">We blend deep technical knowledge with a passion for clean, user-centric design to craft powerful digital experiences.</div></div>
          </div>
          <div>
            <div className="overflow-hidden mb-4"><div className="reveal-line text-primary">Proven expertise across frontend and backend development, mobile applications, UI/UX design, and secure coding practices.</div></div>
            <div className="overflow-hidden"><div className="reveal-line text-primary">Our growing experience in cybersecurity ensures the reliability and resilience of our solutions.</div></div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 border border-hud">
          <div className="p-8 border-b md:border-b-0 md:border-r border-hud">
            <span className="block font-mono text-xs text-muted mb-4">[STAT_01]</span>
            <div className="text-4xl md:text-5xl font-black mb-2">95%</div>
            <span className="font-mono text-xs text-muted uppercase tracking-widest">Customer Satisfaction Rate</span>
          </div>
          <div className="p-8 border-b md:border-b-0 md:border-r border-hud">
            <span className="block font-mono text-xs text-muted mb-4">[STAT_02]</span>
            <div className="text-4xl md:text-5xl font-black mb-2">85%</div>
            <span className="font-mono text-xs text-muted uppercase tracking-widest">Projects Completed Within Budget</span>
          </div>
          <div className="p-8">
            <span className="block font-mono text-xs text-muted mb-4">[STAT_03]</span>
            <div className="text-4xl md:text-5xl font-black mb-2">95%</div>
            <span className="font-mono text-xs text-muted uppercase tracking-widest">Positive Feedback on Design</span>
          </div>
        </div>
      </div>
    </section>
  );
}
