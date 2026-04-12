import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ServiceCard } from '../ui/ServiceCard';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: "Web Development",
    description: "Secure, scalable, and high-performance web applications and websites.",
    technologies: ["React", "Vue", "Node.js", "Python"]
  },
  {
    title: "Mobile   Development",
    description: "Cross-platform and native mobile app development focused on performance.",
    technologies: ["React Native", "Flutter"]
  },
  {
    title: "UI/UX & Web Design",
    description: "Creative, responsive, and conversion-focused designs tailored to brand identity.",
    technologies: ["Figma", "Adobe XD"]
  },
  {
    title: "Custom Software",
    description: "Robust technological solutions designed to transform your business infrastructure.",
    technologies: ["System Arch", "Cybersecurity"]
  }
];

export function Services() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.home-service-card-wrapper', 
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        clearProps: 'clipPath',
        scrollTrigger: {
          trigger: '.home-services-grid',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 border-b border-hud relative z-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 px-4 gap-4">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-sans uppercase tracking-tighter leading-none text-primary">
          Services
        </h2>
        <span className="font-mono text-xs md:text-sm text-muted tracking-widest uppercase md:mb-2">
          [SYS.OPERATIONS]
        </span>
      </div>

      <div className="home-services-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-20 px-4 md:px-0">
        {servicesData.map((service, idx) => (
          <div key={idx} className="home-service-card-wrapper w-full h-full transform will-change-transform">
            <ServiceCard 
              title={service.title}
              description={service.description}
              technologies={service.technologies}
              index={idx + 1}
            />
          </div>
        ))}
      </div>

    </section>
  );
}
