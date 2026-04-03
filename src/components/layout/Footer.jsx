import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const container = useRef(null);
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    if (!container.current) return;
    const rect = container.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    mousePos.current = { x: -1000, y: -1000 };
  };

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width, height, cols, rows;
    const fontSize = 11;
    const cellWidth = 8;
    const cellHeight = 10;
    const hoverRadius = 60; // Slightly expanded to give the blur room to breathe
    
    // Technical characters array
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>/?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\\~`"\''.split('');
    let grid = [];

    const hexToRgb = (hex) => {
      // Remove '#' and handle 3-char hex if needed, but here we assume standard 6-char
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 110, g: 61, b: 253 }; 
    };

    const rootStyle = getComputedStyle(document.documentElement);
    let violetHex = rootStyle.getPropertyValue('--violet-9').trim();
    if (!violetHex) violetHex = '#6e3dfd';
    const vRgb = hexToRgb(violetHex);

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      cols = Math.floor(width / cellWidth) + 1;
      rows = Math.floor(height / cellHeight) + 1;
      
      grid = [];
      for (let i = 0; i < cols * rows; i++) {
        grid.push({
          char: chars[Math.floor(Math.random() * chars.length)]
        });
      }
    };
    
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw the character grid
      ctx.globalCompositeOperation = 'source-over';
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Reset letterSpacing for grid
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = j * cols + i;
          let cell = grid[idx];
          if (!cell) continue;

          const x = i * cellWidth + cellWidth / 2;
          const y = j * cellHeight + cellHeight / 2;
          
          const dx = x - mousePos.current.x;
          const dy = y - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < hoverRadius) {
            // Calculate a blur falloff (1 in center, 0 at edge)
            const intensity = Math.pow(1 - (dist / hoverRadius), 1);
            // Mix between white (255) and the violet RGB
            const r = Math.round(vRgb.r * intensity + 255 * (1 - intensity));
            const g = Math.round(vRgb.g * intensity + 255 * (1 - intensity));
            const b = Math.round(vRgb.b * intensity + 255 * (1 - intensity));
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          } else {
            ctx.fillStyle = '#ffffff';
          }
          
          ctx.fillText(cell.char, x, y);
        }
      }

      // Apply the text mask
      ctx.globalCompositeOperation = 'destination-in';
      const textFontSize = Math.min(window.innerWidth * 0.17, 200);
      ctx.font = `900 ${textFontSize}px "Space Grotesk", sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if ('letterSpacing' in ctx) ctx.letterSpacing = '-0.05em';
      
      ctx.fillText("DEVOOPS", width / 2, height / 2);
    };

    let isActive = false;
    const tick = () => {
      if (!isActive) return;
      draw();
      animationFrameId = requestAnimationFrame(tick);
    };

    const st = ScrollTrigger.create({
      trigger: container.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        isActive = true;
        tick();
      },
      onLeave: () => {
        isActive = false;
        cancelAnimationFrame(animationFrameId);
      },
      onEnterBack: () => {
        isActive = true;
        tick();
      },
      onLeaveBack: () => {
        isActive = false;
        cancelAnimationFrame(animationFrameId);
      }
    });

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      st.kill();
    };
  }, { scope: container });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={container} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden border-t border-white/10 pt-32 pb-16 w-[calc(100%+20vw)] -ml-[10vw] -mb-[10vw] bg-transparent"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="relative z-20 mt-auto pt-12 flex justify-between items-end w-full px-6 md:px-[10vw] font-mono text-xs text-white/40 tracking-widest pointer-events-auto">
        <div className="space-y-1 text-[10px] md:text-xs">
          <div>T: +961 71 881 429</div>
          <div>T: +1 (619) 873-1807</div>
          <div>E: support@devoops.info</div>
          <div className="pt-4 text-white/20">© {new Date().getFullYear()} DevOops. All systems operational.</div>
        </div>
        <div className="text-right flex flex-col items-end">
          <button 
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2 hover:text-white transition-colors duration-300"
          >
            <span className="text-[10px] uppercase">Scroll Top</span>
            <div className="w-px h-8 bg-white/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-white transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
