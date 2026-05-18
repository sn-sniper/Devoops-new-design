import React, { createContext, useContext, useState, useEffect } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('isMuted');
      return saved === 'true';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('isMuted', isMuted);
  }, [isMuted]);

  const toggleMute = () => setIsMuted(prev => !prev);

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, setIsMuted }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
