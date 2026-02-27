import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center max-w-4xl mx-auto w-full px-4">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4">INITIATE <br/> SEQUENCE</h1>
        <p className="font-mono text-white/50 text-sm tracking-widest uppercase">
          SECURE CONNECTION ESTABLISHED. AWAITING INPUT.
        </p>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-12" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col">
          <label className="font-mono text-xs text-white/50 mb-2 uppercase tracking-widest">[CLIENT.EMAIL]</label>
          <input 
            type="email" 
            className="bg-transparent border-b border-white/20 pb-2 text-xl focus:outline-none focus:border-white transition-colors uppercase font-mono placeholder:text-white/10"
            placeholder="ENTER EMAIL"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-mono text-xs text-white/50 mb-2 uppercase tracking-widest">[COMM.SUBJECT]</label>
          <input 
            type="text" 
            className="bg-transparent border-b border-white/20 pb-2 text-xl focus:outline-none focus:border-white transition-colors uppercase font-mono placeholder:text-white/10"
            placeholder="ENTER SUBJECT"
          />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="font-mono text-xs text-white/50 mb-2 uppercase tracking-widest">[MISSION.BRIEF / MESSAGE]</label>
          <textarea 
            rows="4"
            className="bg-transparent border-b border-white/20 pb-2 text-xl focus:outline-none focus:border-white transition-colors uppercase font-mono placeholder:text-white/10 resize-none"
            placeholder="TRANSMIT MESSAGE..."
          ></textarea>
        </div>
        
        <div className="md:col-span-2 flex justify-between items-end mt-8 border-t border-white/20 pt-8">
          <div className="font-mono text-xs text-white/50 uppercase tracking-widest space-y-2">
            <div><span className="opacity-50">EMAIL:</span> support@devoops.info</div>
            <div><span className="opacity-50">COMM_LINK_01:</span> +961 71 881 429</div>
            <div><span className="opacity-50">COMM_LINK_02:</span> +1 (619) 873-1807</div>
          </div>
          <button className="border border-white/20 px-8 py-4 font-mono text-sm tracking-widest hover:bg-white hover:text-black transition-colors uppercase flex items-center gap-4 group">
            <span>[EXECUTE_TRANSMISSION]</span>
            <span className="w-2 h-2 bg-white group-hover:bg-black transition-colors"></span>
          </button>
        </div>
      </form>
    </div>
  );
}
