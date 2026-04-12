import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSystemTitle } from '../hooks/useSystemTitle';
import { DigitalRain } from '../components/ui/DigitalRain';
import { ScrambleLink } from '../components/ui/ScrambleLink';

export default function NotFound() {
  useSystemTitle('[SYS.OFF] Where did you go?');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center text-center overflow-hidden bg-background">
      <DigitalRain />

      <div className="relative z-10 flex flex-col items-center p-8 bg-background">
        <div className="relative inline-block">
          <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter text-primary">404</h1>
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-primary -translate-y-1/2"></div>
        </div>
        <p className="mt-8 font-mono text-xl text-muted uppercase tracking-widest bg-background px-4 py-1">
          [SYSTEM ERROR: DIRECTORY NOT FOUND]
        </p>
        <ScrambleLink to="/" className="mt-12 px-8 py-4 font-mono text-sm tracking-widest hover:text-black transition-colors uppercase clip-btn-brutalist">
          RETURN TO ROOT
        </ScrambleLink>
      </div>
    </div>
  );
}
