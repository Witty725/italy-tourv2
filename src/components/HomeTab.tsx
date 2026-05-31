import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, CalendarRange } from 'lucide-react';
import { italyFunFacts } from '../data';

interface HomeTabProps {
  onNavigate: (tab: 'Packing' | 'Laundry' | 'Itinerary' | 'Emergency' | 'Phrases' | 'Tips') => void;
}

export function HomeTab({ onNavigate }: HomeTabProps) {
  const [factIndex, setFactIndex] = useState(0);

  const changeFact = () => {
    setFactIndex((prev) => (prev + 1) % italyFunFacts.length);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-6 bg-gradient-to-br from-indigo-950/40 via-slate-900/50 to-emerald-950/20 border-slate-700/50 relative overflow-hidden"
      >
        {/* Subtle decorative flag accents */}
        <div className="absolute top-0 left-0 right-0 h-[3px] flex">
          <div className="flex-1 bg-emerald-500"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-red-500"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2 border border-emerald-500/20">
              <Sparkles className="w-3 h-3" />
              BUONGIORNO
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Benvenuti in Italia!
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-md leading-relaxed">
              Welcome to your dedicated luxury Italian adventure hub. Prepare your bags, practice the culture, monitor the weather, and preview your premium itinerary.
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-950/50 p-2 rounded-xl border border-slate-800/80 shrink-0">
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest font-extrabold px-1">
              Summer 2026
            </span>
          </div>
        </div>
      </motion.div>

      {/* Interactive Fun Facts Wisdom Panel */}
      <div className="w-full">
        {/* Fun Facts Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-panel p-5 flex flex-col justify-between border-indigo-500/20"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Italian Wisdom
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-850 px-2 py-0.5 rounded border border-slate-800">
                {italyFunFacts[factIndex].category}
              </span>
            </div>
            
            <div className="min-h-[76px] flex flex-col justify-center">
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-medium">
                "{italyFunFacts[factIndex].fact}"
              </p>
              {italyFunFacts[factIndex].italianTranslation && (
                <div className="mt-2.5 bg-indigo-950/30 border border-indigo-500/20 p-2 rounded-lg text-indigo-300 font-mono text-[10px] sm:text-xs">
                  <span className="font-bold uppercase tracking-wider text-[9px] text-indigo-400 block mb-0.5">Learn the phrase:</span>
                  {italyFunFacts[factIndex].italianTranslation}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={changeFact}
            className="mt-4 w-full py-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-700/50 transition-all flex items-center justify-center gap-1.5 animate-fade-in"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Discover Another Fact
          </button>
        </motion.div>
      </div>

      {/* Trip Highlights Journey Overview */}
      <div className="glass-panel p-5 border-slate-700/50">
        <h3 className="text-[10px] font-black tracking-widest text-slate-400 uppercase flex items-center gap-1.5 mb-4 border-b border-slate-800 pb-2">
          <CalendarRange className="w-3.5 h-3.5 text-red-400" />
          The Italian Route Chronicles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Phase 1 */}
          <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-900 flex flex-col gap-1 hover:border-slate-800 transition-colors">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none">Days 18 - 22</span>
              <span className="text-[9px] font-black text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded uppercase leading-none border border-amber-500/20">Phase 1</span>
            </div>
            <h4 className="text-slate-100 font-extrabold text-sm mt-1">Tuscany Hills & Pontremoli</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Explore historic Piagnaro Castle, enjoy traditional Lunigiana food feasts, and sleep cozy at Hotel Napoleon.</p>
          </div>

          {/* Phase 2 */}
          <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-900 flex flex-col gap-1 hover:border-slate-800 transition-colors">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none">Days 23 - 30</span>
              <span className="text-[9px] font-black text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded uppercase leading-none border border-blue-500/20">Phase 2</span>
            </div>
            <h4 className="text-slate-100 font-extrabold text-sm mt-1">MSC Splendida Cruising</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Embark from Livorno. Sail across stunning coastlines to Cagliari, Sicily, Rome, Barcelona, sea days and France!</p>
          </div>

          {/* Phase 3 */}
          <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-900 flex flex-col gap-1 hover:border-slate-800 transition-colors">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none">Days 1 - 3 (July)</span>
              <span className="text-[9px] font-black text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded uppercase leading-none border border-red-500/20">Phase 3</span>
            </div>
            <h4 className="text-slate-100 font-extrabold text-sm mt-1">Eternal City of Rome</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Take the exclusive pre-booked Vatican museums & Colosseum guided tours. Prepare well for strict modesty dress codes.</p>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('Itinerary')}
          className="mt-4 w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider rounded-lg border border-red-500/20 transition-all flex items-center justify-center gap-1.5"
        >
          View Full Interactive Calendar
        </button>
      </div>
    </div>
  );
}
