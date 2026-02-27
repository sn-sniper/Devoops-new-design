import React from 'react';
import abdallahImg from '../../assets/abdallah.jpg';
import georgeImg from '../../assets/george.jpg';
import hassanImg from '../../assets/hassan.jpg';
import jadImg from '../../assets/jad.jpg';

const teamMembers = [
  { name: 'ABDALLAH EL-SAYED AHMAD', role: 'CO-FOUNDER', img: abdallahImg },
  { name: 'GEORGE TERS', role: 'CO-FOUNDER', img: georgeImg },
  { name: 'HASSAN ASSAAD', role: 'PARTNER', img: hassanImg },
  { name: 'JAD KADDOUR', role: 'PARTNER', img: jadImg },
];

export function Team() {
  return (
    <section className="py-24 border-b border-white/10 px-4">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">Team</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, i) => (
          <div key={i} className="group relative border border-white/20 p-4">
            <div className="overflow-hidden bg-white/5 aspect-[3/4] mb-6">
              <img 
                src={member.img} 
                alt={member.name} 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-95 group-hover:opacity-100 transition-all duration-700 ease-out"
              />
            </div>
            <div className="flex justify-between items-center border-t border-white/20 pt-4">
              <h3 className="font-bold text-xl uppercase tracking-wider">{member.name}</h3>
              <p className="font-mono text-xs text-white/50">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
