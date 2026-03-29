import React, { useEffect, useRef } from 'react';

export function DigitalRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?~DEVOOPS010101';
    const charArray = chars.split('');
    const fontSize = 16;
    let columns = Math.ceil(width / fontSize);
    let drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; 
    }

    let animationFrameId;
    let lastTime = 0;
    const fps = 30; // Control falling speed
    const interval = 1000 / fps;

    const draw = (time) => {
      animationFrameId = requestAnimationFrame(draw);

      const deltaTime = time - lastTime;
      if (deltaTime > interval) {
        lastTime = time - (deltaTime % interval);

        ctx.fillStyle = 'rgba(10, 10, 10, 0.2)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${fontSize}px "Space Mono", monospace`;
        ctx.textAlign = 'center';

        for (let i = 0; i < drops.length; i++) {
          const text = charArray[Math.floor(Math.random() * charArray.length)];
          const x = i * fontSize + (fontSize / 2);
          const y = drops[i] * fontSize;

          const trailText = charArray[Math.floor(Math.random() * charArray.length)];
          ctx.fillStyle = 'rgba(255, 255, 255, 1)'; 
          ctx.fillText(trailText, x, y - fontSize);

          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.fillText(text, x, y);

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          drops[i]++;
        }
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        columns = Math.ceil(width / fontSize);
        
        const newDrops = [];
        for (let i = 0; i < columns; i++) {
          newDrops[i] = i < drops.length ? drops[i] : Math.random() * -100;
        }
        drops = newDrops;
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 w-full h-full block pointer-events-none" 
      style={{ backgroundColor: '#0a0a0a' }}
    />
  );
}
