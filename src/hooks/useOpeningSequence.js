import { useEffect, useState } from 'react';
import gsap from 'gsap';

export function useOpeningSequence() {
  const [sequenceComplete, setSequenceComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setSequenceComplete(true)
    });

    tl.to('#loader-text', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    })
    .to('#loader-text', {
      opacity: 0,
      duration: 0.5,
      delay: 1,
      ease: 'power2.in'
    })
    .to('#loader-bg', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 1.2,
      ease: 'expo.inOut'
    }, '+=0.2')
    .fromTo('#main-content', {
      scale: 0.95,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out'
    }, '-=0.5');

    return () => {
      tl.kill();
    };
  }, []);

  return sequenceComplete;
}
