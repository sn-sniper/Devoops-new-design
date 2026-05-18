import { useEffect, useRef } from 'react';
import { useAudio } from '../context/AudioContext';

export function useHoverSound(url = '/hover-sound-btn.mp3') {
  const audioRef = useRef(null);
  const currentTargetRef = useRef(null);
  const { isMuted } = useAudio();

  useEffect(() => {
    audioRef.current = new Audio(url);
    audioRef.current.preload = 'auto';

    const handleMouseOver = (e) => {
      if (isMuted) return;

      const target = e.target.closest('a, button, [role="button"], .cursor-pointer');
      
      if (target && target !== currentTargetRef.current) {
        currentTargetRef.current = target;
        
        if (audioRef.current) {
          const soundClone = audioRef.current.cloneNode();
          soundClone.volume = 0.2; 
          
          soundClone.play().catch(() => {});
        }
      } else if (!target) {
        currentTargetRef.current = null;
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [url, isMuted]);
}
