import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, CalendarRange, Info, Smartphone, X, ShieldAlert, Globe, ExternalLink, Heart } from 'lucide-react';
import { italyFunFacts } from '../data';
import { TripCountdown } from './TripCountdown';

interface HomeTabProps {
  onNavigate: (tab: 'Packing' | 'Laundry' | 'Itinerary' | 'Emergency' | 'Phrases' | 'Tips') => void;
}

export function HomeTab({ onNavigate }: HomeTabProps) {
  const [factIndex, setFactIndex] = useState(0);
  const [showOfflineMapsGuide, setShowOfflineMapsGuide] = useState(false);
  const [activePwaModal, setActivePwaModal] = useState<'iphone' | 'android' | null>(null);
  const [showSpecialThanks, setShowSpecialThanks] = useState(false);

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

            {/* BUONGIORNO text top center with a subtle looping breathing pulse */}
            <motion.text 
              x="400" 
              y="54" 
              textAnchor="middle" 
              fill="#34d399" 
              fontSize="30" 
              fontWeight="955" 
              fontStyle="italic" 
              letterSpacing="0.32em" 
              fontFamily="'Inter', system-ui, sans-serif" 
              animate={{
                opacity: [0.88, 1.0, 0.88],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ 
                textShadow: '0 4px 14px rgba(0,0,0,0.95), 0 2px 4px rgba(52,211,153,0.3)',
                transformOrigin: '400px 48px'
              }}
            >
              BUONGIORNO!
            </motion.text>

            {/* Warm Golden Sunset Sun with Ambient Glow, breathing like a real dawn sunrise */}
            <motion.circle 
              cx="410" 
              cy="115" 
              r="50" 
              fill="url(#sunGlow)" 
              animate={{
                opacity: [0.25, 0.60, 0.25],
                scale: [0.95, 1.15, 0.95]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ transformOrigin: '410px 115px' }}
            />
            <motion.circle 
              cx="410" 
              cy="115" 
              r="36" 
              fill="#eab308" 
              animate={{
                opacity: [0.75, 0.95, 0.75],
                scale: [0.98, 1.05, 0.98]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ transformOrigin: '410px 115px' }}
            />

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

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between w-full gap-2">
            <TripCountdown badgeStyle />
            
            <button
              onClick={() => setShowSpecialThanks(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-yellow-500/60 hover:border-yellow-400 text-yellow-500 hover:text-yellow-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-yellow-500/5 hover:bg-yellow-500/15 shadow-sm leading-none transition-all cursor-pointer whitespace-nowrap"
            >
              <Heart className="w-3 h-3 text-yellow-500 fill-yellow-500/10" />
              Special Thanks
            </button>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight text-center">
              Benvenuti in Italia!
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-md leading-relaxed">
              Welcome to your dedicated Italian Adventure Hub. Prepare your bags, practice the culture, monitor weather, and view your itinerary.
            </p>
            <p className="text-[#34d399] font-black italic text-xs sm:text-sm mt-2.5 leading-relaxed">
              Scroll down for easy instructions to prepare your phone BEFORE this trip!
            </p>
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

      {/* Three Steps - Phone Prep to Work Offline Banner */}
      <div className="glass-panel p-4 bg-gradient-to-r from-emerald-950/40 to-slate-900/40 border-emerald-500/25 rounded-xl shadow-lg flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="flex-1">
              <h4 className="text-white font-black text-xs uppercase tracking-wider hidden sm:block">Three Steps - Phone Prep to Work Offline</h4>
              <h4 className="text-white font-black text-xs uppercase tracking-wider sm:hidden">Phone Prep to Work Offline</h4>
              
              <p className="text-[11px] text-slate-350 leading-tight mt-0.5 hidden sm:block">Prepare your phone in advance to access maps, instructions, and calling systems offline or over Wi-Fi.</p>
              <p className="text-[11px] text-emerald-400 font-extrabold uppercase tracking-wider mt-0.5 sm:hidden">Three Easy Steps</p>
            </div>
          </div>
          <button
            onClick={() => setShowOfflineMapsGuide(!showOfflineMapsGuide)}
            className="sm:self-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            {showOfflineMapsGuide ? 'Close Instructions' : 'View Download Steps'}
          </button>
        </div>

        {/* Mobile-only centered description statement */}
        <p className="text-[11px] text-slate-350 leading-relaxed text-center sm:hidden mt-0.5">
          Prepare your phone in advance to access maps, instructions, and calling systems offline or over Wi-Fi.
        </p>

        {showOfflineMapsGuide && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-slate-800/80 pt-3 mt-1 space-y-4 text-xs text-slate-300 leading-relaxed overflow-hidden"
          >
            {/* Step One Card */}
            <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-900 flex flex-col gap-3">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono text-center block w-full">Step One - First Things First</span>
              <p className="text-[11px] text-slate-355 text-justify leading-relaxed">
                Make sure you've downloaded this app to your home's phone screen so that you can use a large bulk of it offline. If you haven't yet, tap either <strong className="text-white">iPhone</strong> or <strong className="text-white">Android</strong> below for simple instructions to secure your offline app shortcut!
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1 justify-center">
                <button
                  onClick={() => setActivePwaModal('iphone')}
                  className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 hover:border-indigo-500/30 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  iPhone
                </button>
                <button
                  onClick={() => setActivePwaModal('android')}
                  className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/30 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  Android
                </button>
              </div>
            </div>

            {/* Step Two Card */}
            <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-900 flex flex-col gap-3">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono text-center block w-full">Step Two - Offline Google Map Setup</span>
              
              <div className="space-y-3 pt-1 border-t border-slate-900/50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Step-by-Step Instructions:</span>
                <ol className="space-y-2.5 list-none pl-0">
                  <li className="flex gap-2.5 items-start">
                    <span className="flex items-center justify-center bg-slate-850 text-emerald-400 w-5 h-5 rounded-full text-[10px] font-black shrink-0 border border-slate-700 shadow font-mono">1</span>
                    <span>Connect your phone to home/hotel Wi-Fi and open the <strong className="text-slate-100">Google Maps App</strong>.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="flex items-center justify-center bg-slate-850 text-emerald-400 w-5 h-5 rounded-full text-[10px] font-black shrink-0 border border-slate-700 shadow font-mono">2</span>
                    <div>
                      <span><strong className="text-slate-100">Define the map area</strong> by searching for our destinations:</span>
                      <ul className="grid grid-cols-2 gap-2 mt-2 text-[10.5px] text-slate-400 font-medium font-sans">
                        <li>• 📍 <em>Lunigiana / Pontremoli</em></li>
                        <li>• 📍 <em>Livorno, Pisa & Florence</em></li>
                        <li>• 📍 <em>Cagliari & Southern Sardinia</em></li>
                        <li>• 📍 <em>Palermo / Mondello</em></li>
                        <li>• 📍 <em>Valletta (Malta Island)</em></li>
                        <li>• 📍 <em>Barcelona & Marseille</em></li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="flex items-center justify-center bg-slate-850 text-emerald-400 w-5 h-5 rounded-full text-[10px] font-black shrink-0 border border-slate-700 shadow font-mono">3</span>
                    <div>
                      <strong className="text-white">On iPhone / iOS:</strong> After searching for a town (e.g. <em>Pontremoli</em>), Google Maps may automatically show "Directions" at the bottom. If so, tap the <strong className="text-slate-100">"Details"</strong> button (about two options to the right of Directions) to open the full place page. From there, locate the row of action tabs (such as Directions, Save, Share). You may need to <strong className="text-slate-100">swipe these tabs to the left</strong> to reveal the three dots button (<span className="text-emerald-400 font-bold">...</span>) or the direct <strong className="text-slate-100">"Download offline map"</strong> option to start downloading.
                    </div>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="flex items-center justify-center bg-slate-850 text-emerald-400 w-5 h-5 rounded-full text-[10px] font-black shrink-0 border border-slate-700 shadow font-mono">4</span>
                    <div>
                      <strong className="text-white">On Android:</strong> Tap your Google Profile Picture (top right) → tap <strong className="text-slate-100">"Offline maps"</strong> → select <strong className="text-slate-100">"SELECT YOUR OWN MAP"</strong>, adjust the blue bounding rectangle over the region, and hit <strong className="text-slate-100">"Download"</strong>.
                    </div>
                  </li>
                </ol>

                <div className="bg-emerald-950/15 border border-emerald-500/15 p-2.5 rounded-lg text-[10.5px] text-emerald-300 flex items-start gap-1.5 mt-2">
                  <Info className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white font-semibold">Ready to test?</strong> Once downloaded, turn on Airplane Mode and click any address or location link inside the daily itinerary. It will load the location instantly with high accuracy!</span>
                </div>
              </div>
            </div>

            {/* Step Three Card */}
            <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-900 flex flex-col gap-3">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono text-center block w-full">Step Three - Offline Emergency Calling Setup</span>
              
              <div className="flex flex-col gap-4 pt-1 border-t border-slate-900/50">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <h5 className="text-amber-400 font-extrabold text-[10px] uppercase tracking-widest leading-none">
                      Network & Cell Service Disclaimer
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans mt-1">
                      <strong className="text-white">Active cell service or roaming is required</strong> to dial standard emergency telephone numbers (like <span className="text-amber-400 font-mono">112</span>, <span className="text-amber-400 font-mono">113</span>, etc.) directly. If you have no traditional cellular coverage but are connected to <strong className="text-white">Wi-Fi (via hotel, local cafes, or cruise ship satellite)</strong>, direct voice network dialing might fail unless your carrier supports <strong className="text-white">Wi-Fi Calling</strong>.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-850/80 pt-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider font-mono">
                      Internet & Digital Calling Option: "Where ARE U" App
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-450 leading-relaxed pl-6">
                    Italy’s official European emergency response app. If you are connected to internet data (Wi-Fi or a Data-Only Travel eSIM), you can open this app to initiate a <strong className="text-white font-bold">VoIP / digital internet call</strong> or chat directly with emergency operators. The app will automatically transmit your precise real-time GPS coordinates directly to Italian first responders.
                  </p>
                  <div className="flex gap-2.5 pl-6 mt-1 flex-wrap">
                    <a
                      href="https://apps.apple.com/it/app/where-are-u/id1041845180?l=en"
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-850 text-[10px] text-slate-300 font-bold transition-colors cursor-pointer"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                      iOS App Store
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=it.areu.whereareu"
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-850 text-[10px] text-slate-300 font-bold transition-colors cursor-pointer"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                      Android Play Store
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {activePwaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-750 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative flex flex-col gap-4"
            >
              <button
                onClick={() => setActivePwaModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-800/80">
                <Smartphone className={`w-5 h-5 ${activePwaModal === 'iphone' ? 'text-indigo-400' : 'text-emerald-400'}`} />
                <h4 className="text-white font-black text-xs uppercase tracking-wider">
                  Save to {activePwaModal === 'iphone' ? 'iPhone' : 'Android'} Home
                </h4>
              </div>

              {activePwaModal === 'iphone' ? (
                <div className="space-y-3 text-xs text-slate-305 leading-relaxed font-sans">
                  <p>Follow these steps to add this app to your iPhone home's screen for offline access:</p>
                  <ol className="list-decimal pl-4 space-y-2">
                    <li>Open this website inside your iPhone's <strong className="text-indigo-400 font-bold">Safari</strong> browser.</li>
                    <li>Tap the standard iOS <strong className="text-indigo-400 font-semibold">Share button</strong> (square icon with an arrow pointing up at the bottom).</li>
                    <li>Scroll down and select <strong className="text-indigo-400 font-semibold">"Add to Home Screen"</strong>.</li>
                    <li>Tap <strong className="text-white font-black">"Add"</strong> in the top-right corner to confirm.</li>
                  </ol>
                  <p className="text-[10px] text-slate-500 italic mt-1 leading-normal">Note: Third-party browsers (like iOS Chrome) do not support the iOS installation option directly.</p>
                </div>
              ) : (
                <div className="space-y-3 text-xs text-slate-305 leading-relaxed font-sans">
                  <p>Follow these steps to add this app to your Android home's screen for offline access:</p>
                  <ol className="list-decimal pl-4 space-y-2">
                    <li>Open this website inside your Android's <strong className="text-emerald-400 font-bold">Chrome</strong> browser.</li>
                    <li>Tap the Chrome menu button (the <strong className="text-emerald-400 font-semibold">three vertical dots</strong> at the top right).</li>
                    <li>Select <strong className="text-emerald-400 font-semibold">"Install app"</strong> or <strong className="text-emerald-400 font-semibold">"Add to Home screen"</strong> from the menu.</li>
                    <li>Confirm the dialog prompt by tapping <strong className="text-white font-black">"Install"</strong> or <strong className="text-white">"Add"</strong>.</li>
                  </ol>
                </div>
              )}

              <button
                onClick={() => setActivePwaModal(null)}
                className="mt-2 w-full py-2 bg-indigo-650 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-md"
              >
                Got It, Thank You!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSpecialThanks && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-750 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative flex flex-col gap-4"
            >
              <button
                onClick={() => setShowSpecialThanks(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-800/80">
                <Heart className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />
                <h4 className="text-white font-black text-xs uppercase tracking-wider">
                  Special Thanks
                </h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans text-justify">
                "Much love and special thanks to Teresa, GP, Rita, Alan, Nancy, and everyone else who selflessly took so much of their personal time, effort, and resources to make this trip happen. Thank you, each and every one of you."
              </p>

              <button
                onClick={() => setShowSpecialThanks(false)}
                className="mt-2 w-full py-2 bg-yellow-600 hover:bg-yellow-500 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-md"
              >
                Con Tutto il Cuore ❤️
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
