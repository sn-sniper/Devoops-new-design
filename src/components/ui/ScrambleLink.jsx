import React from 'react';
import { Link } from 'react-router-dom';
import { useScrambleText } from '../../hooks/useScrambleText';

export function ScrambleLink({ to, className, children, onClick }) {
  const textContent = typeof children === 'string' ? children : '';
  const { displayText, triggerScramble } = useScrambleText(textContent);

  return (
    <Link 
      to={to} 
      className={className} 
      onMouseEnter={triggerScramble}
      onClick={onClick}
    >
      {typeof children === 'string' ? displayText : children}
    </Link>
  );
}
