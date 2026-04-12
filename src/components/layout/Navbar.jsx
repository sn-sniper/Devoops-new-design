import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Component1Icon, SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useScrambleText } from "../../hooks/useScrambleText";
import { ScrambleLink } from "../ui/ScrambleLink";
import { useTheme } from "../../context/ThemeContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/#about" },
  { name: "Work", path: "/work" },
  { name: "Contact", path: "/contact" },
];

function NavMenuItem({ link, isActive, onClick }) {
  const { displayText, triggerScramble } = useScrambleText(link.name);

  return (
    <div className="overflow-hidden p-2 nav-link-container">
      <Link
        to={link.path}
        onClick={onClick}
        onMouseEnter={triggerScramble}
        className={`flex items-center leading-none font-black font-sans uppercase tracking-tighter transition-all duration-300 transform origin-left ${isActive ? "bracket-btn text-4xl md:text-6xl lg:text-7xl text-primary" : "text-4xl md:text-6xl lg:text-7xl text-muted hover:text-primary"}`}
      >
        <span>{displayText}</span>
      </Link>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);
  const menuRef = useRef(null);
  const tl = useRef(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  const { displayText: contactText, triggerScramble: triggerContactScramble } = useScrambleText("INITIATE_CONTACT");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power3.out",
        clearProps: "all",
      });

      tl.current = gsap
        .timeline({ paused: true })
        .to(menuRef.current, {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.8,
          ease: "power4.inOut",
        })
        .from(
          ".nav-link-container",
          {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4",
        );
    },
    { scope: containerRef },
  );

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      tl.current?.reverse();
    } else {
      tl.current?.play();
    }
    setIsOpen((prev) => !prev);
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    if (isOpen) {
      tl.current?.reverse();
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      tl.current?.reverse();
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <header
      ref={containerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ease-in-out ${isScrolled ? "bg-background pointer-events-auto" : "bg-transparent pointer-events-none"}`}
    >
      <div className="flex justify-between items-center w-full px-8 py-6 relative z-50 pointer-events-auto">
        <div className="flex-1 text-primary">
          <ScrambleLink
            to="/"
            className="text-3xl font-black font-sans uppercase tracking-tighter transition-opacity inline-block"
          >
            DEVOOPS
          </ScrambleLink>
        </div>

        <div className="flex-1 flex justify-center text-primary">
          <button
            onClick={toggleMenu}
            className="flex items-center gap-3 px-6 py-2 font-mono text-sm tracking-widest uppercase hover:text-black transition-all duration-300 ease-in-out group clip-btn-brutalist"
          >
            <Component1Icon className="w-5 h-5 group-hover:animate-pulse" />
            <span>{isOpen ? "CLOSE" : "MENU"}</span>
          </button>
        </div>

        <div className="flex-1 flex justify-end text-primary">
          <Link
            to="/contact"
            onMouseEnter={triggerContactScramble}
            className="bracket-btn font-mono text-[13px] md:text-[15px] tracking-widest uppercase transition-opacity whitespace-nowrap"
          >
            <span>{contactText}</span>
          </Link>
        </div>
      </div>

      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-background flex flex-col justify-center items-start pl-12 md:pl-24 lg:pl-32 pointer-events-auto"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
          <div className="absolute top-1/2 left-0 w-full h-px bg-primary"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-primary"></div>
          <div className="absolute top-8 left-8 w-8 h-px bg-primary"></div>
          <div className="absolute top-8 left-8 w-px h-8 bg-primary"></div>
          <div className="absolute bottom-8 right-8 w-8 h-px bg-primary"></div>
          <div className="absolute bottom-8 right-8 w-px h-8 bg-primary"></div>
        </div>

        <nav className="relative z-10 flex flex-col items-start gap-4 md:gap-6">
          {navLinks.map((link, idx) => {
            const currentPath = location.pathname + location.hash;
            const isActive =
              currentPath === link.path ||
              (currentPath === "/" && link.path === "/");

            return (
              <NavMenuItem
                key={idx}
                link={link}
                isActive={isActive}
                onClick={closeMenu}
              />
            );
          })}
        </nav>
      </div>
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center p-2 border border-hud bg-background text-muted hover:text-primary transition-all duration-300 pointer-events-auto mix-blend-difference"
      >
        {theme === 'dark' ? <SunIcon className="w-6 h-6 md:w-8 md:h-8" /> : <MoonIcon className="w-6 h-6 md:w-8 md:h-8" />}
      </button>
    </header>
  );
}
