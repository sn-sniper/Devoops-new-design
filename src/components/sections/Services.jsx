import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const services = [
  { id: '01', title: 'Web Development', tools: 'React, Vue, Angular, Node.js, Python, PHP', desc: 'Secure, scalable, and high-performance web applications.' },
  { id: '02', title: 'Mobile App Development', tools: 'React Native, Flutter', desc: 'Cross-platform and native apps focused on performance and seamless functionality.' },
  { id: '03', title: 'UI/UX & Web Design', tools: 'Figma, Adobe XD', desc: 'Creative, responsive, and conversion-focused designs tailored to brand identity.' },
  { id: '04', title: 'Custom Solutions', tools: 'Software & E-commerce', desc: 'Robust technological solutions designed to transform your business.' },
];

export function Services() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      gsap.fromTo(item, 
        { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          ease: 'power3.inOut',
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="py-24 border-b border-white/10">
      <div className="flex justify-between items-end mb-16 px-4">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">Services</h2>
        <span className="font-mono text-sm text-white/50">[SYS.OPERATIONS]</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {services.map((svc, i) => (
          <div 
            key={svc.id}
            ref={el => itemsRef.current[i] = el}
            className="p-12 border border-white/10 m-[-0.5px] hover:bg-white inset-0 hover:text-black transition-colors duration-500 group flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs opacity-50 block mb-12">AGENDA // {svc.id}</span>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 group-hover:-translate-y-2 transition-transform duration-500">{svc.title}</h3>
              <p className="font-mono text-xs opacity-60 uppercase tracking-widest mb-8 text-black/80 font-bold mix-blend-difference">{svc.tools}</p>
            </div>
            <p className="font-mono text-sm opacity-80 uppercase tracking-widest leading-relaxed border-t border-current pt-8">{svc.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
