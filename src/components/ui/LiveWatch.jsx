import React, { useState, useEffect } from 'react';

export function LiveWatch() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="font-mono text-[10px] text-white/80 tracking-widest uppercase text-right">
      {formatTime(time)}
    </div>
  );
}
