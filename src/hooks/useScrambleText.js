import { useState, useRef, useCallback, useEffect } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\\\/[]{}—=+*^?#_@$%&~|';

export function useScrambleText(text) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  const isScrambling = useRef(false);

  const triggerScramble = useCallback(() => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    
    let iteration = 0;
    
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      let newText = text.split('').map((letter, index) => {
        if (index < iteration) {
          return text[index];
        }
        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      }).join('');
      
      setDisplayText(newText);
      
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        isScrambling.current = false;
        setDisplayText(text); 
      }
      
      iteration += 1 / 3; 
    }, 30);
  }, [text]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { displayText, triggerScramble };
}
