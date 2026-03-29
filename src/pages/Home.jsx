import React from 'react';
import { useSystemTitle } from '../hooks/useSystemTitle';
import { Hero } from '../components/sections/Hero';
import { Services } from '../components/sections/Services';
import { About } from '../components/sections/About';
import { Team } from '../components/sections/Team';
import { FAQ } from '../components/sections/FAQ';
import { Footer } from '../components/layout/Footer';

export default function Home() {
  useSystemTitle('[SYS.ON] Devoops');

  return (
    <main className="w-full">
      <Hero />
      <Services />
      <About />
      <Team />
      <FAQ />
      <Footer />
    </main>
  );
}
