import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ServiceCard } from '../components/ui/ServiceCard';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: "Web Development",
    description: "Secure, scalable, and high-performance web applications and websites.",
    technologies: ["React", "Vue", "Node.js", "Python"]
  },
  {
    title: "Mobile App Development",
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

export default function Services() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.header-reveal', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.1
    });

    gsap.fromTo('.service-card-wrapper', 
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        clearProps: 'clipPath',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pt-24 md:pt-32 pb-24 min-h-screen z-10 relative">
      
      <div className="mb-20 md:mb-32 overflow-hidden px-4 select-none pointer-events-none">
        <h1 className="header-reveal text-6xl md:text-8xl lg:text-9xl font-black font-sans uppercase tracking-tighter leading-[0.85] text-white">
          SYSTEM
        </h1>
        <h1 className="header-reveal text-6xl md:text-8xl lg:text-9xl font-black font-sans uppercase tracking-tighter leading-[0.85] text-white/50 ml-0 md:ml-12">
          CAPABILITIES
        </h1>
      </div>

      <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-20">
        {servicesData.map((service, idx) => (
          <div key={idx} className="service-card-wrapper w-full h-full transform will-change-transform">
            <ServiceCard 
              title={service.title}
              description={service.description}
              technologies={service.technologies}
              index={idx + 1}
            />
          </div>
        ))}
      </div>

    </div>
  );
}
