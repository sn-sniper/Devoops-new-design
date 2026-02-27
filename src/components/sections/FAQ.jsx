import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Plus } from 'lucide-react';

const faqs = [
  { q: 'How long does a typical project take to complete?', a: 'Project timelines vary based on complexity. A simple website takes 2-3 weeks, while complex applications can take 2-6 months.' },
  { q: 'Do you offer ongoing support after project completion?', a: 'Absolutely. We provide comprehensive maintenance packages including bug fixes, security updates, and performance optimization.' },
  { q: 'How do you handle project communication?', a: 'We maintain transparent communication through weekly progress reports, dedicated Slack channels, and regular video meetings using an agile approach.' },
  { q: 'Can you work with clients remotely?', a: 'Yes, we work with clients globally. Distance is never a barrier to creating exceptional digital products.' },
];

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: 'auto', duration: 0.5, ease: 'power3.out' });
      gsap.to(contentRef.current, { opacity: 1, duration: 0.3, delay: 0.2 });
    } else {
      gsap.to(contentRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(contentRef.current, { height: 0, duration: 0.4, ease: 'power3.in', delay: 0.1 });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-8 flex justify-between items-center text-left hover:bg-white/5 transition-colors px-4 group"
      >
        <span className="font-mono text-sm text-white/50 mr-8">0{index + 1}</span>
        <span className="flex-1 text-2xl font-bold uppercase tracking-tight">{faq.q}</span>
        <Plus className={`w-6 h-6 transform transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`} />
      </button>
      <div 
        ref={contentRef} 
        className="h-0 overflow-hidden opacity-0"
      >
        <div className="px-4 pb-8 pl-[4.5rem]">
          <p className="font-mono text-sm text-white/70 uppercase tracking-widest max-w-2xl leading-relaxed">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="py-24 border-b border-white/10">
      <div className="px-4 mb-16">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">INDEXED DATA</h2>
        <span className="font-mono text-sm text-white/50">[FAQ.MODULE]</span>
      </div>
      <div>
        {faqs.map((faq, i) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
      </div>
    </section>
  );
}
