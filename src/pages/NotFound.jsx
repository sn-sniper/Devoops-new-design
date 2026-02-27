import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="relative inline-block">
        <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter mix-blend-difference text-white">404</h1>
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white -translate-y-1/2 mix-blend-difference"></div>
      </div>
      <p className="mt-8 font-mono text-xl text-white/50 uppercase tracking-widest">
        [SYSTEM ERROR: SECTOR NOT FOUND]
      </p>
      <Link to="/" className="mt-12 border border-white/20 px-8 py-4 font-mono text-sm tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
        RETURN TO BASE
      </Link>
    </div>
  );
}
