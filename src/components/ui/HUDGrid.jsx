import { LiveWatch } from './LiveWatch';

export function HUDGrid() {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Perimeter Bounding Box */}
      <div className="absolute inset-[4%] border border-white/10 mix-blend-difference"></div>
      
      {/* Grid lines (vertical and horizontal center) */}
      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/5 -translate-x-1/2"></div>
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/5 -translate-y-1/2"></div>
      
      {/* Corner crosshairs defined by small lines */}
      <div className="absolute top-[4%] left-[4%] w-8 h-[1px] bg-white/30 -translate-x-1/2"></div>
      <div className="absolute top-[4%] left-[4%] w-[1px] h-8 bg-white/30 -translate-y-1/2"></div>
      
      <div className="absolute top-[4%] right-[4%] w-8 h-[1px] bg-white/30 translate-x-1/2"></div>
      <div className="absolute top-[4%] right-[4%] w-[1px] h-8 bg-white/30 -translate-y-1/2"></div>
      
      <div className="absolute bottom-[4%] left-[4%] w-8 h-[1px] bg-white/30 -translate-x-1/2"></div>
      <div className="absolute bottom-[4%] left-[4%] w-[1px] h-8 bg-white/30 translate-y-1/2"></div>
      
      <div className="absolute bottom-[4%] right-[4%] w-8 h-[1px] bg-white/30 translate-x-1/2"></div>
      <div className="absolute bottom-[4%] right-[4%] w-[1px] h-8 bg-white/30 translate-y-1/2"></div>

      {/* Technical Text */}
      <div className="absolute top-[5%] left-[6%] font-mono text-[10px] text-white/40 tracking-widest uppercase">
        [SYS.ON] X: 049 Y: 821
      </div>
      <div className="absolute bottom-[5%] right-[6%]">
        <LiveWatch />
      </div>
    </div>
  );
}
