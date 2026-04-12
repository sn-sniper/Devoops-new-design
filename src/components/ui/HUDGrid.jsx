import { LiveWatch } from './LiveWatch';
import { useState, useEffect } from 'react';

export function HUDGrid() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div id="hud-grid" className="fixed inset-0 z-40 pointer-events-none">
      <div className="absolute inset-[4%] border border-hud mix-blend-difference"></div>
      
      <div className="absolute inset-y-0 left-1/2 w-px bg-hud -translate-x-1/2"></div>
      <div className="absolute inset-x-0 top-1/2 h-px bg-hud -translate-y-1/2"></div>
      
      <div className="absolute top-[4%] left-[4%] w-8 h-px bg-primary/30 -translate-x-1/2"></div>
      <div className="absolute top-[4%] left-[4%] w-px h-8 bg-primary/30 -translate-y-1/2"></div>
      
      <div className="absolute top-[4%] right-[4%] w-8 h-px bg-primary/30 translate-x-1/2"></div>
      <div className="absolute top-[4%] right-[4%] w-px h-8 bg-primary/30 -translate-y-1/2"></div>
      
      <div className="absolute bottom-[4%] left-[4%] w-8 h-px bg-primary/30 -translate-x-1/2"></div>
      <div className="absolute bottom-[4%] left-[4%] w-px h-8 bg-primary/30 translate-y-1/2"></div>
      
      <div className="absolute bottom-[4%] right-[4%] w-8 h-px bg-primary/30 translate-x-1/2"></div>
      <div className="absolute bottom-[4%] right-[4%] w-px h-8 bg-primary/30 translate-y-1/2"></div>

      <div className="absolute bottom-[5%] left-[5%] font-mono text-[10px] text-muted tracking-widest uppercase">
        [SYS.ON] X: {String(mousePos.x).padStart(3, '0')} Y: {String(mousePos.y).padStart(3, '0')}
      </div>
      <div className="absolute bottom-[5%] right-[5%]">
        <LiveWatch />
      </div>
    </div>
  );
}
