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
      {/* 🇮🇹 Italy Trip 2026 Beautiful Visual Banner */}
      <div className="flex flex-col gap-4">
        {/* Panoramic Vector Graphic Banner (4:1 Aspect Ratio) matching the user reference */}
        <div className="w-full aspect-[4/1] bg-[#030712] rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl relative select-none">
          <svg viewBox="0 0 800 200" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
            {/* Definitions for Gradients */}
            <defs>
              <linearGradient id="hillGradBack" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#022c22" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#064e3b" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="hillGradFront" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>
              <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#eab308" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Dark Midnight Sky Background */}
            <rect width="800" height="200" fill="#020617" />

            {/* Warm Golden Sunset Sun with Ambient Glow */}
            <circle cx="410" cy="115" r="50" fill="url(#sunGlow)" />
            <circle cx="410" cy="115" r="36" fill="#eab308" opacity="0.85" />

            {/* Background Rolling Hills - Smooth translucent arcs */}
            <path d="M-50 185 Q 160 110 380 155 T 850 170 L 850 200 L -50 200 Z" fill="#052e16" fillOpacity="0.6" />
            <path d="M120 185 Q 430 115 740 162 L 850 185 L 850 200 L 120 200 Z" fill="#022c22" fillOpacity="0.5" />

            {/* Middleground Rolling Garden Hills */}
            <path d="M-50 185 Q 240 120 530 168 T 850 180 L 850 200 L -50 200 Z" fill="#064e3b" fillOpacity="0.8" />
            
            {/* Tall Elegant Cypress Trees (Needles) styled precisely like the reference image */}
            {/* Tree 1: Left tall */}
            <path d="M280 85 L283.5 178 L276.5 178 Z" fill="#022c22" stroke="#047857" strokeWidth="0.5" />
            {/* Tree 2: Left medium */}
            <path d="M295 105 L298 178 L292 178 Z" fill="#011f10" stroke="#047857" strokeWidth="0.5" />
            {/* Tree 3: Center-right in front of sun */}
            <path d="M414 112 L417 178 L411 178 Z" fill="#022c22" stroke="#047857" strokeWidth="0.5" />
            {/* Tree 4: Right tall */}
            <path d="M515 95 L518.5 178 L511.5 178 Z" fill="#022c22" stroke="#047857" strokeWidth="0.5" />
            {/* Tree 5: Right medium */}
            <path d="M530 108 L533.5 178 L526.5 178 Z" fill="#011f10" stroke="#047857" strokeWidth="0.5" />

            {/* LEFT ELEMENT: Fully Custom Leaning Tower of Pisa (Tilted to the Left at ~10 degrees) */}
            <g transform="translate(160, 115) rotate(-11) scale(0.55)">
              {/* Foundation Slanted Steps */}
              <path d="M-10 115 L110 115 L100 135 L0 135 Z" fill="#1e293b" />
              {/* Tower Core Wall Background */}
              <path d="M10 115 L25 -30 L75 -35 L90 115 Z" fill="#0f172a" />
              {/* Vertical architectural lines / Column simulations */}
              <line x1="25" y1="115" x2="35" y2="-30" stroke="#334155" strokeWidth="1" />
              <line x1="45" y1="115" x2="52" y2="-32" stroke="#334155" strokeWidth="1" />
              <line x1="65" y1="115" x2="68" y2="-33" stroke="#334155" strokeWidth="1" />
              <line x1="85" y1="115" x2="80" y2="-30" stroke="#334155" strokeWidth="1" />
              {/* Tier Horizontal Borders */}
              <rect x="23" y="90" width="64" height="6" fill="#334155" />
              <rect x="25" y="70" width="60" height="6" fill="#334155" />
              <rect x="27" y="50" width="56" height="6" fill="#334155" />
              <rect x="29" y="30" width="52" height="6" fill="#334155" />
              <rect x="31" y="10" width="48" height="6" fill="#334155" />
              <rect x="33" y="-10" width="44" height="6" fill="#334155" />
              <rect x="35" y="-30" width="40" height="6" fill="#334155" />
              {/* Symmetrical Window Arches on levels */}
              <circle cx="35" cy="80" r="2.5" fill="#e2e8f0" />
              <circle cx="45" cy="80" r="2.5" fill="#e2e8f0" />
              <circle cx="55" cy="80" r="2.5" fill="#e2e8f0" />
              <circle cx="65" cy="80" r="2.5" fill="#e2e8f0" />
              <circle cx="75" cy="80" r="2.5" fill="#e2e8f0" />
              
              <circle cx="37" cy="60" r="2.5" fill="#e2e8f0" />
              <circle cx="47" cy="60" r="2.5" fill="#e2e8f0" />
              <circle cx="57" cy="60" r="2.5" fill="#e2e8f0" />
              <circle cx="67" cy="60" r="2.5" fill="#e2e8f0" />
              <circle cx="77" cy="60" r="2.5" fill="#e2e8f0" />

              <circle cx="39" cy="40" r="2.5" fill="#e2e8f0" />
              <circle cx="49" cy="40" r="2.5" fill="#e2e8f0" />
              <circle cx="59" cy="40" r="2.5" fill="#e2e8f0" />
              <circle cx="69" cy="40" r="2.5" fill="#e2e8f0" />
              <circle cx="79" cy="40" r="2.5" fill="#e2e8f0" />
              
              <circle cx="41" cy="20" r="2.5" fill="#e2e8f0" />
              <circle cx="51" cy="20" r="2.5" fill="#e2e8f0" />
              <circle cx="61" cy="20" r="2.5" fill="#e2e8f0" />
              <circle cx="71" cy="20" r="2.5" fill="#e2e8f0" />

              {/* Dome / Belfry top */}
              <path d="M37 -30 Q 55 -55 73 -30 Z" fill="#475569" />
              <rect x="52" y="-62" width="6" height="12" fill="#1e293b" />
            </g>

            {/* MIDDLE ELEMENT: Piagnaro Castle of Pontremoli (Dark, simple layout) */}
            <g transform="translate(360, 96) scale(0.55)">
              {/* Lower castellated hall/keep on left */}
              <rect x="10" y="55" width="45" height="40" rx="1" fill="#1e293b" />
              <rect x="14" y="47" width="8" height="8" fill="#1e293b" />
              <rect x="28" y="47" width="8" height="8" fill="#1e293b" />
              <rect x="42" y="47" width="8" height="8" fill="#1e293b" />
              {/* Castle Main Gate */}
              <path d="M26 95 Q 32.5 75 39 95 Z" fill="#020617" />
              
              {/* Tower on right */}
              <rect x="55" y="15" width="28" height="80" rx="1" fill="#2d3748" />
              <rect x="55" y="7" width="28" height="8" fill="#1e293b" />
              {/* Arrow Loop Window */}
              <rect x="65" y="32" width="8" height="15" rx="1" fill="#0f172a" />
              
              {/* Cute Waving Red Flag atop Tower mast */}
              <line x1="69" y1="7" x2="69" y2="-5" stroke="#475569" strokeWidth="1.5" />
              <polygon points="69,-5 82,-1 69,3" fill="#ef4444" />
            </g>

            {/* RIGHT ELEMENT: Symmetrical Multi-Stepped Cruise Ship on Horizon */}
            <g transform="translate(595, 115) scale(0.65)">
              {/* Cruise Hull base */}
              <path d="M 0 60 L 180 60 L 205 32 L 35 32 Z" fill="#0f172a" stroke="#000000" strokeWidth="1.5" />
              {/* Bottom protection strip */}
              <path d="M 2 60 L 178 60 Q 150 66 90 66 T 2 60 Z" fill="#b91c1c" />
              {/* Accommodation guest cabin blocks */}
              <rect x="35" y="15" width="145" height="17" fill="#ffffff" rx="1.5" stroke="#111827" strokeWidth="1" />
              <rect x="47" y="-2" width="125" height="17" fill="#f8fafc" rx="1.5" stroke="#111827" strokeWidth="1" />
              <rect x="65" y="-19" width="100" height="17" fill="#f1f5f9" rx="1.5" stroke="#111827" strokeWidth="1" />
              {/* Glowing golden circular windows */}
              <circle cx="55" cy="45" r="2.5" fill="#fbbf24" />
              <circle cx="75" cy="45" r="2.5" fill="#fbbf24" />
              <circle cx="95" cy="45" r="2.5" fill="#fbbf24" />
              <circle cx="115" cy="45" r="2.5" fill="#fbbf24" />
              <circle cx="135" cy="45" r="2.5" fill="#fbbf24" />
              <circle cx="155" cy="45" r="2.5" fill="#fbbf24" />
              <circle cx="175" cy="45" r="2.5" fill="#fbbf24" />
              
              <circle cx="65" cy="23" r="2" fill="#fbbf24" />
              <circle cx="85" cy="23" r="2" fill="#fbbf24" />
              <circle cx="105" cy="23" r="2" fill="#fbbf24" />
              <circle cx="125" cy="23" r="2" fill="#fbbf24" />
              <circle cx="145" cy="23" r="2" fill="#fbbf24" />
              
              <circle cx="85" cy="6" r="2" fill="#fbbf24" />
              <circle cx="105" cy="6" r="2" fill="#fbbf24" />
              <circle cx="125" cy="6" r="2" fill="#fbbf24" />
              <circle cx="145" cy="6" r="2" fill="#fbbf24" />

              {/* Symmetrical modern red funnel stack at rear/top */}
              <rect x="135" y="-32" width="14" height="13" fill="#ef4444" rx="1" />
              <rect x="135" y="-35" width="14" height="3" fill="#0f172a" />
              {/* Gentle ocean wake lines */}
              <path d="M-30 63 L215 63" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="6 8" />
            </g>

            {/* GROUND HORIZON STREAK */}
            <line x1="10" y1="184" x2="790" y2="184" stroke="#1e293b" strokeWidth="1.5" />

            {/* ITALIAN FLAG HORIZONTAL FOOTER STRIP (spanning within the card) */}
            <g transform="translate(15, 190)">
              {/* Green quadrant */}
              <rect x="0" y="0" width="250" height="4.5" fill="#10b981" rx="1" />
              {/* White quadrant */}
              <rect x="250" y="0" width="270" height="4.5" fill="#f8fafc" rx="1" />
              {/* Red quadrant */}
              <rect x="520" y="0" width="250" height="4.5" fill="#ef4444" rx="1" />
            </g>
          </svg>
        </div>

        {/* Dynamic & Beautifully Colored Bottom Header Title exactly matching physical reference */}
        <div className="text-center mt-1 select-none">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="text-[#a7f3d0] drop-shadow-md">SUMMER 2026</span>
            <span className="text-[#fca5a5] drop-shadow-md">ITALY TOUR</span>
          </h2>
          <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-[0.2em] font-extrabold mt-2">
            Companion Planning & Travel Deck
          </p>
        </div>
      </div>

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
