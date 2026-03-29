import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useOpeningSequence } from "../hooks/useOpeningSequence";
import { useHoverSound } from "../hooks/useHoverSound";
import { InitialLoader } from "../components/ui/InitialLoader";
import { HUDGrid } from "../components/ui/HUDGrid";
import { Navbar } from "../components/layout/Navbar";

export default function MainLayout() {
  useSmoothScroll();
  const { sequenceComplete, setSequenceComplete } = useOpeningSequence();
  useHoverSound();

  useEffect(() => {
    if (sequenceComplete) {
      window.dispatchEvent(new Event('sequence-complete'));
    }
  }, [sequenceComplete]);

  return (
    <>
      {!sequenceComplete && <InitialLoader onComplete={() => setSequenceComplete(true)} />}

      <HUDGrid />
      <Navbar />

      <div
        id="main-content"
        className="min-h-screen pt-[10vw] pb-[10vw] px-[10vw] relative z-10 opacity-0 scale-95"
      >
        <Outlet />
      </div>
    </>
  );
}
