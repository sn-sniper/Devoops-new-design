import { Outlet } from 'react-router-dom';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { useOpeningSequence } from '../hooks/useOpeningSequence';
import { InitialLoader } from '../components/ui/InitialLoader';
import { HUDGrid } from '../components/ui/HUDGrid';

export default function MainLayout() {
  useSmoothScroll();
  const sequenceComplete = useOpeningSequence();

  return (
    <>
      {!sequenceComplete && <InitialLoader />}
      
      <HUDGrid />
      
      <div id="main-content" className="min-h-screen pt-[10vw] pb-[10vw] px-[10vw] relative z-10 opacity-0 scale-95">
        <Outlet />
      </div>
    </>
  );
}
