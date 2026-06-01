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
            
            {/* Beautiful Tuscan Vineyard rows following the contour of the green rolling hills */}
            <g opacity="0.8">
              {/* Vineyard Left Hill Rows */}
              <path d="M 170 152 Q 220 138 270 150" fill="none" stroke="#15803d" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" />
              <path d="M 180 162 Q 230 148 280 160" fill="none" stroke="#16a34a" strokeWidth="3" strokeDasharray="6 3" strokeLinecap="round" />
              <path d="M 190 174 Q 240 158 290 172" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="4 4" strokeLinecap="round" />
              
              {/* Left Vineyard Tiny Supporting Posts */}
              <line x1="185" y1="151" x2="185" y2="157" stroke="#78350f" strokeWidth="1.2" />
              <line x1="215" y1="145" x2="215" y2="151" stroke="#78350f" strokeWidth="1.2" />
              <line x1="245" y1="145" x2="245" y2="151" stroke="#78350f" strokeWidth="1.2" />
              <line x1="275" y1="152" x2="275" y2="158" stroke="#78350f" strokeWidth="1.2" />

              {/* Vineyard Right Hill Rows */}
              <path d="M 450 165 Q 490 154 530 167" fill="none" stroke="#15803d" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" />
              <path d="M 440 176 Q 485 166 530 180" fill="none" stroke="#16a34a" strokeWidth="3" strokeDasharray="6 3" strokeLinecap="round" />
              
              {/* Right Vineyard Tiny Supporting Posts */}
              <line x1="460" y1="163" x2="460" y2="169" stroke="#78350f" strokeWidth="1.2" />
              <line x1="490" y1="160" x2="490" y2="166" stroke="#78350f" strokeWidth="1.2" />
              <line x1="520" y1="166" x2="520" y2="172" stroke="#78350f" strokeWidth="1.2" />
            </g>

            {/* Highly artistic Organic Cypress Trees (with rich multi-layered volumetric canopies) */}
            {/* Cypress 1: Elegant left tree */}
            <g transform="translate(295, 118) scale(0.65)">
              <rect x="-1.5" y="15" width="3" height="40" fill="#451a03" />
              <path d="M 0 -22 C -11 0, -9 35, 0 45 C 9 35, 11 0, 0 -22 Z" fill="#064e3b" />
              <path d="M 0 -10 C -8 10, -7 30, 0 38 C 7 30, 8 10, 0 -10 Z" fill="#022c22" />
              <path d="M 0 2 C -5 18, -4 28, 0 32 C 4 28, 5 18, 0 2 Z" fill="#047857" />
            </g>

            {/* Cypress 2: Medium right tree by the castle */}
            <g transform="translate(432, 128) scale(0.52)">
              <rect x="-1" y="15" width="2" height="40" fill="#451a03" />
              <path d="M 0 -22 C -11 0, -9 35, 0 45 C 9 35, 11 0, 0 -22 Z" fill="#064e3b" />
              <path d="M 0 -10 C -8 10, -7 30, 0 38 C 7 30, 8 10, 0 -10 Z" fill="#022c22" />
              <path d="M 0 2 C -5 18, -4 28, 0 32 C 4 28, 5 18, 0 2 Z" fill="#047857" />
            </g>

            {/* Cypress 3: Small background tree */}
            <g transform="translate(418, 142) scale(0.38)">
              <rect x="-1" y="15" width="2" height="30" fill="#451a03" />
              <path d="M 0 -20 C -10 0, -8 30, 0 40 C 8 30, 10 0, 0 -20 Z" fill="#022c22" />
              <path d="M 0 -5 C -6 10, -5 25, 0 31 C 5 25, 6 10, 0 -5 Z" fill="#047857" />
            </g>

            {/* LEFT ELEMENT: Symmetrical Masterpiece Leaning Tower of Pisa (Tilted to the Right at 5.2 degrees, mimicking the photo) */}
            <g transform="translate(115, 184) rotate(5.2) scale(0.72)">
              {/* Dual Stepped White Stone Base Foundation */}
              <rect x="-33" y="-5" width="66" height="5" fill="#94a3b8" rx="0.5" />
              <rect x="-29" y="-10" width="58" height="5" fill="#cbd5e1" rx="0.5" />

              {/* TIER 1 (Tower Ground level - Solid white marble block with blind arches) */}
              <rect x="-24.5" y="-34" width="49" height="24" fill="#f8fafc" />
              {/* Round Column Trim at top of Base Tier */}
              <rect x="-25" y="-36" width="50" height="2" fill="#cbd5e1" rx="0.5" />
              {/* Dark blind arches recessed on Tier 1 */}
              {[-19, -11, -3, 5, 13, 21].map((xLeft, cIdx) => (
                <rect key={cIdx} x={xLeft - 1.5} y="-30" width="3" height="15" fill="#1e293b" rx="1.5" />
              ))}

              {/* SIX OPEN-GALLERY TIERS (Tiers 2 to 7 with columns and semicircular arches spanning cylinder) */}
              {[0, 1, 2, 3, 4, 5].map((idx) => {
                const bY = -36 - (idx * 14); // level bottom height
                const tY = bY - 14;          // level top height
                const width = 48 - (idx * 0.4); // extremely subtle cylindrical taper
                const colCount = 8;
                return (
                  <g key={idx}>
                    {/* Dark depth recess backdrop inside gallery */}
                    <rect x={-width/2 + 2} y={tY} width={width - 4} height={14} fill="#020617" />
                    
                    {/* Gallery columns & delicate arches */}
                    {Array.from({ length: colCount }).map((_, cIdx) => {
                      const segmentLength = (width - 4) / (colCount - 1);
                      const cx = -width/2 + 2 + (cIdx * segmentLength);
                      return (
                        <g key={cIdx}>
                          {/* Semicircular gallery arch top link */}
                          {cIdx < colCount - 1 && (
                            <path 
                              d={`M ${cx} ${tY + 3.5} A ${segmentLength/2} ${segmentLength/2} 0 0 1 ${cx + segmentLength} ${tY + 3.5}`} 
                              fill="none" 
                              stroke="#c084fc" 
                              strokeWidth="0.3" 
                              opacity="0.1" 
                            />
                          )}
                          {/* Column Shafts */}
                          <line x1={cx} y1={bY} x2={cx} y2={tY + 3.5} stroke="#f1f5f9" strokeWidth="0.9" />
                          {/* Golden top capital details */}
                          <circle cx={cx} cy={tY + 3.5} r="0.6" fill="#f8fafc" />
                        </g>
                      );
                    })}

                    {/* Horizontal balcony handrails & structural cornices */}
                    <rect x={-width/2 - 1.5} y={tY} width={width + 3} height={2} fill="#e2e8f0" rx="0.5" />
                    <rect x={-width/2 - 1} y={bY - 2} width={width + 2} height={2} fill="#cbd5e1" />
                    {/* Dark baluster accents on railing */}
                    <line x1={-width/2} y1={bY - 1} x2={width/2} y2={bY - 1} stroke="#64748b" strokeWidth="0.6" strokeDasharray="1.2 1.2" />
                  </g>
                );
              })}

              {/* TIER 8 (Belfry set back from the ledge - slightly narrower cylindrical top) */}
              <g>
                {/* Dark recess inside the belfry */}
                <rect x="-17" y="-136" width="34" height="16" fill="#020617" />
                {/* Belfry pillars & arches */}
                {Array.from({ length: 6 }).map((_, cIdx) => {
                  const cx = -14 + (cIdx * 5.6);
                  return (
                    <g key={cIdx}>
                      <rect x={cx - 1} y="-133" width="2" height="13" fill="#cbd5e1" rx="0.5" />
                      <path d={`M ${cx - 1.5} -130 A 1.5 1.5 0 0 1 ${cx + 1.5} -130`} fill="none" stroke="#f1f5f9" strokeWidth="0.8" />
                    </g>
                  );
                })}
                {/* Hanging gold metal bell in the center archway of belfry */}
                <polygon points="-2,-128 2,-128 3,-124 -3,-124" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
                <circle cx="0" cy="-122.5" r="1.2" fill="#d97706" />

                {/* Top deck dome roof cornice ring & spire stack */}
                <rect x="-19" y="-139" width="38" height="3" fill="#cbd5e1" rx="1" />
                {/* Top safety railing */}
                <line x1="-18" y1="-141" x2="18" y2="-141" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="1 1" />
                {/* Slim spire pole for Italian flagpole display */}
                <line x1="0" y1="-139" x2="0" y2="-154" stroke="#475569" strokeWidth="1" />
                <polygon points="0,-154 9,-151.5 0,-149" fill="#ef4444" />
              </g>
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
