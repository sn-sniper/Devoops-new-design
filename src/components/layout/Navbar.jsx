import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Component1Icon } from "@radix-ui/react-icons";
import { useScrambleText } from "../../hooks/useScrambleText";
import { ScrambleLink } from "../ui/ScrambleLink";

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
        className={`flex items-center text-4xl md:text-6xl lg:text-7xl leading-none font-black font-sans uppercase tracking-tighter transition-all duration-300 transform origin-left ${isActive ? "text-white" : "text-white/80"}`}
      >
        {isActive && (
          <span className="font-mono font-light opacity-50 mr-4 md:mr-6 -mt-1 md:-mt-2">
            [
          </span>
        )}
        <span>{displayText}</span>
        {isActive && (
          <span className="font-mono font-light opacity-50 ml-4 md:ml-6 -mt-1 md:-mt-2">
            ]
          </span>
        )}
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
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
  }, [location.pathname]);

  return (
    <header
      ref={containerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ease-in-out ${isScrolled ? "bg-black pointer-events-auto" : "bg-transparent pointer-events-none"}`}
    >
      <div className="flex justify-between items-center w-full px-8 py-6 relative z-50 pointer-events-auto mix-blend-difference text-white">
        <div className="flex-1">
          <ScrambleLink
            to="/"
            className="text-3xl font-black font-sans uppercase tracking-tighter transition-opacity"
          >
            DEVOOPS
          </ScrambleLink>
        </div>

        <div className="flex-1 flex justify-center">
          <button
            onClick={toggleMenu}
            className="flex items-center gap-3 px-6 py-2 font-mono text-sm tracking-widest uppercase hover:text-black transition-all duration-300 ease-in-out group clip-btn-brutalist"
          >
            <Component1Icon className="w-5 h-5 group-hover:animate-pulse" />
            <span>{isOpen ? "CLOSE" : "MENU"}</span>
          </button>
        </div>

        <div className="flex-1 flex justify-end">
          <ScrambleLink
            to="/contact"
            className="font-mono text-sm tracking-widest uppercase transition-opacity whitespace-nowrap"
          >
            [ INITIATE_CONTACT ]
          </ScrambleLink>
        </div>
      </div>

      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-background flex flex-col justify-center items-start pl-12 md:pl-24 lg:pl-32 pointer-events-auto"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
          <div className="absolute top-1/2 left-0 w-full h-px bg-white"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-white"></div>
          <div className="absolute top-8 left-8 w-8 h-px bg-white"></div>
          <div className="absolute top-8 left-8 w-px h-8 bg-white"></div>
          <div className="absolute bottom-8 right-8 w-8 h-px bg-white"></div>
          <div className="absolute bottom-8 right-8 w-px h-8 bg-white"></div>
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
    </header>
  );
}
