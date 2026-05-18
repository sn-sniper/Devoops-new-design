import React from 'react';
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "../../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center p-2 border border-hud bg-background text-muted hover:text-primary transition-all duration-300 pointer-events-auto mix-blend-difference"
    >
      {theme === 'dark' ? <SunIcon className="w-6 h-6 md:w-8 md:h-8" /> : <MoonIcon className="w-6 h-6 md:w-8 md:h-8" />}
    </button>
  );
}
