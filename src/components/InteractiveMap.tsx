import React from 'react';
import { motion } from 'motion/react';
import { Compass, Ship, MapPin, Anchor, ArrowRight, X } from 'lucide-react';
import { itinerary, ItineraryDay } from '../data';

interface InteractiveMapProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onClose: () => void;
}

// Coordinate configurations on a 1000 x 600 map coordinate system
const MAP_STOPS = [
  { id: 'pontremoli', date: 'June 18, 2026', title: 'Pontremoli', label: 'Tuscany Base', x: 670, y: 110, dates: 'Jun 18-22' },
  { id: 'livorno', date: 'June 23, 2026', title: 'Livorno Port', label: 'MSC Cruise Boarding', x: 680, y: 195, dates: 'Jun 23' },
  { id: 'cagliari', date: 'June 24, 2026', title: 'Cagliari', label: 'Sardinia Port stop', x: 580, y: 440, dates: 'Jun 24' },
  { id: 'palermo', date: 'June 25, 2026', title: 'Palermo', label: 'Sicily Port stop', x: 790, y: 495, dates: 'Jun 25' },
  { id: 'valletta', date: 'June 26, 2026', title: 'Valletta', label: 'Malta Port stop', x: 830, y: 575, dates: 'Jun 26' },
  { id: 'atsea', date: 'June 27, 2026', title: 'At Sea', label: 'MSC Splendida Cruising', x: 480, y: 450, dates: 'Jun 27' },
  { id: 'barcelona', date: 'June 28, 2026', title: 'Barcelona', label: 'Catalonia Port stop', x: 170, y: 295, dates: 'Jun 28' },
  { id: 'marseille', date: 'June 29, 2026', title: 'Marseille', label: 'French Riviera stop', x: 390, y: 155, dates: 'Jun 29' },
  { id: 'departure', date: 'June 30, 2026', title: 'Livorno Port', label: 'Disembark & Flight', x: 680, y: 195, dates: 'Jun 30' },
];

export function InteractiveMap({ selectedDate, onSelectDate, onClose }: InteractiveMapProps) {
  // Map day number directly to the corresponding stop coordinates
  const getCoordinatesForDate = (dateStr: string) => {
    // If it's Pontremoli days
    if (dateStr.includes('June 18') || dateStr.includes('June 19') || dateStr.includes('June 20') || dateStr.includes('June 21') || dateStr.includes('June 22')) {
      return MAP_STOPS[0]; // Pontremoli stop
    }
    const matched = MAP_STOPS.find(stop => stop.date === dateStr);
    return matched || MAP_STOPS[0];
  };

  const currentStop = getCoordinatesForDate(selectedDate);

  // Trace sequential legs for path rendering
  const voyageLegs = [
    { from: MAP_STOPS[0], to: MAP_STOPS[1], isSail: false, desc: 'Scenic train transit down to Tuscany shores' },
    { from: MAP_STOPS[1], to: MAP_STOPS[2], isSail: true, desc: 'MSC Splendida sailing overnight to Sardinia' },
    { from: MAP_STOPS[2], to: MAP_STOPS[3], isSail: true, desc: 'Sailing overnight across Tyrrhenian Sea to Sicily' },
    { from: MAP_STOPS[3], to: MAP_STOPS[4], isSail: true, desc: 'Voyaging south towards historical Valletta' },
    { from: MAP_STOPS[4], to: MAP_STOPS[5], isSail: true, desc: 'Cruising Open Balearic Sea towards Spain' },
    { from: MAP_STOPS[5], to: MAP_STOPS[6], isSail: true, desc: 'Approaching spectacular Barcelona Port' },
    { from: MAP_STOPS[6], to: MAP_STOPS[7], isSail: true, desc: 'Sailing north along picturesque Costa Brava to Marseille' },
    { from: MAP_STOPS[7], to: MAP_STOPS[8], isSail: true, desc: 'Final segment crossing Ligurian Sea back to Livorno' },
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/90 [backdrop-filter:blur(12px)] z-55 flex items-center justify-center p-3 sm:p-5 outline-none overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] relative"
        id="interactive-transit-route"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-sans font-black text-white text-base tracking-wide flex items-center gap-2">
                MEDITERRANEAN TRANSIT GRAPH (MSC SPLENDIDA VOYAGE)
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
                Interactive cruise track trace mapping of your 13-day itinerary
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            id="close-transit-map"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden min-h-0 bg-slate-900/60">
          
          {/* Left panel: Info Panel & Route Selector */}
          <div className="lg:col-span-4 border-r border-slate-800/80 p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto bg-slate-950/20 max-h-[300px] lg:max-h-none order-2 lg:order-1">
            <div className="bg-slate-950/45 border border-slate-800/60 p-3.5 rounded-xl text-left shadow-inner flex flex-col gap-1.5">
              <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block font-mono">Active Leg Focus:</span>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-white text-sm tracking-wide">{currentStop.title}</span>
                <span className="p-1 px-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-extrabold rounded-md">
                  {currentStop.dates}
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                {currentStop.label}. Currently located in the base of{' '}
                <strong className="text-emerald-300 font-bold">{currentStop.title}</strong> segment. Tap other points on the grid or map vector nodes to dynamic sync focus!
              </p>
            </div>

            {/* Micro progress stepper list */}
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider block font-mono">Journey Milestones:</span>
              <div className="flex flex-col gap-1.5">
                {MAP_STOPS.map((stop, i) => {
                  const isActive = stop.id === currentStop.id;
                  return (
                    <button
                      key={`${stop.id}-${i}`}
                      onClick={() => onSelectDate(stop.date)}
                      className={`flex items-center justify-between p-2 rounded-lg text-left transition-all text-xs border ${
                        isActive 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-bold' 
                          : 'bg-slate-950/20 border-slate-850 hover:bg-slate-900 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {stop.id === 'pontremoli' ? (
                          <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                        ) : stop.title.includes('Port') ? (
                          <Anchor className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                        ) : (
                          <Ship className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-505'}`} />
                        )}
                        <span>{stop.title}</span>
                      </div>
                      <span className="font-mono text-[9.5px] text-slate-550">{stop.dates}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right panel: Live Scalable Interactive SVG Map */}
          <div className="lg:col-span-8 p-3 sm:p-5 flex flex-col justify-center items-center bg-slate-950/25 relative min-h-[300px] sm:min-h-[400px] order-1 lg:order-2">
            
            {/* Ambient Title Layer */}
            <div className="absolute top-3 left-4 text-left pointer-events-none select-none">
              <span className="text-[9.5px] font-mono tracking-widest text-[#34d399] font-black block">WEST MEDITERRANEAN OCEAN REGION</span>
              <span className="text-[8.5px] font-mono text-slate-500 tracking-wider block">Scale relative: Spain • France • Italy • Sardinia • Sicily • Malta</span>
            </div>

            {/* Outer high-end SVG canvas map workspace */}
            <div className="w-full h-full max-w-[850px] aspect-[850/500] relative bg-slate-950/60 rounded-xl border border-slate-800 p-1 font-sans">
              <svg 
                viewBox="0 0 1000 620" 
                className="w-full h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Stylized Ocean/Water grid backdrop nodes */}
                <defs>
                  {/* Beautiful ocean gradient reflecting marine depths */}
                  <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#081423" />
                    <stop offset="45%" stopColor="#0b2440" />
                    <stop offset="85%" stopColor="#0e3156" />
                    <stop offset="100%" stopColor="#143c66" />
                  </linearGradient>

                  {/* Vibrant landmass gradients */}
                  <linearGradient id="spainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e3427" />
                    <stop offset="50%" stopColor="#254631" />
                    <stop offset="100%" stopColor="#172b20" />
                  </linearGradient>

                  <linearGradient id="franceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1d2d38" />
                    <stop offset="100%" stopColor="#121b22" />
                  </linearGradient>

                  <linearGradient id="italyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3d371d" />
                    <stop offset="60%" stopColor="#524824" />
                    <stop offset="100%" stopColor="#302b17" />
                  </linearGradient>

                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="0.8" />
                  </pattern>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* Apply deep ocean color fill */}
                <rect width="1000" height="620" fill="url(#oceanGrad)" rx="10" />
                <rect width="1000" height="620" fill="url(#grid)" rx="10" />

                {/* Stylized Landmass Silhouette Curves - Representing the Mediterranean Coast */}
                {/* Spain (Barcelona area coastline outline) */}
                <path 
                  d="M 0,250 C 70,250 120,320 180,330 C 230,340 230,360 210,400 C 190,440 220,490 200,550 L 0,600 Z" 
                  fill="url(#spainGrad)" 
                  stroke="#10b981" 
                  strokeWidth="2" 
                />
                
                {/* France (Marseille area coastline) */}
                <path 
                  d="M 180,180 C 240,160 300,160 370,170 C 420,180 470,140 490,140 C 510,140 540,105 570,80 L 1000,50 L 1000,0 L 0,0 Z" 
                  fill="url(#franceGrad)" 
                  stroke="#38bdf8" 
                  strokeWidth="2" 
                />

                {/* Italy Mainland Coast Boot Outline */}
                <path 
                  d="M 640,-10 C 640,30 630,90 650,110 C 670,130 690,170 710,210 C 730,250 780,270 790,290 C 800,310 820,340 850,380 C 870,410 930,460 1000,430 L 1000,-10 Z" 
                  fill="url(#italyGrad)" 
                  stroke="#f59e0b" 
                  strokeWidth="2" 
                />

                {/* Major Islands (Sardinia, Sicily, Malta, Corsica, Balearic) */}
                {/* Balearic Islands (Spain) */}
                <ellipse cx="230" cy="370" rx="30" ry="14" fill="url(#spainGrad)" stroke="#10b981" strokeWidth="1" />
                <text x="230" y="373" textAnchor="middle" fill="rgba(209, 250, 229, 0.45)" fontSize="8.5" fontWeight="black" className="font-sans">BALEARIC ISL.</text>

                {/* Corsica (North Island above Sardinia) */}
                <ellipse cx="585" cy="300" rx="20" ry="32" transform="rotate(-10 585 300)" fill="url(#franceGrad)" stroke="#38bdf8" strokeWidth="1" />
                <text x="585" y="303" textAnchor="middle" fill="rgba(186, 230, 253, 0.4)" fontSize="8.5" fontWeight="black" className="font-sans">CORSICA</text>

                {/* Sardinia Island */}
                <ellipse cx="580" cy="440" rx="26" ry="48" fill="url(#spainGrad)" stroke="#10b981" strokeWidth="1.5" />
                <text x="580" y="443" textAnchor="middle" fill="rgba(209, 250, 229, 0.55)" fontSize="9.5" fontWeight="black" className="font-sans">SARDINIA</text>

                {/* Sicily Island */}
                <polygon points="730,480 830,490 800,540" fill="url(#italyGrad)" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="775" y="510" textAnchor="middle" fill="rgba(254, 243, 199, 0.55)" fontSize="9.5" fontWeight="black" className="font-sans">SICILY</text>

                {/* Malta Island */}
                <circle cx="830" cy="575" r="9" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.2" />
                <text x="830" y="578" textAnchor="middle" fill="#f59e0b" fontSize="7.5" fontWeight="black" className="font-mono">MLT</text>

                {/* Landmass Labels */}
                <text x="80" y="560" fill="rgba(16, 185, 129, 0.15)" fontSize="20" fontWeight="950" fontStyle="italic" className="tracking-widest">SPAIN</text>
                <text x="360" y="60" fill="rgba(56, 189, 248, 0.15)" fontSize="20" fontWeight="950" fontStyle="italic" className="tracking-widest">FRANCE</text>
                <text x="880" y="160" fill="rgba(245, 158, 11, 0.15)" fontSize="20" fontWeight="950" fontStyle="italic" className="tracking-widest">ITALY</text>

                {/* Major Reference Cities on Map */}
                {[
                  { x: 745, y: 250, name: 'Rome 🇮🇹' },
                  { x: 705, y: 135, name: 'Florence 🇮🇹' },
                  { x: 615, y: 92, name: 'Genoa 🇮🇹' },
                  { x: 512, y: 115, name: 'Nice 🇫🇷' },
                  { x: 235, y: 372, name: 'Palma 🇪🇸' },
                  { x: 75, y: 440, name: 'Valencia 🇪🇸' },
                ].map((city, idx) => (
                  <g key={`city-${idx}`} className="opacity-60 pointer-events-none">
                    <circle cx={city.x} cy={city.y} r="2.5" fill="#e2e8f0" />
                    <text x={city.x + 5} y={city.y + 3} textAnchor="start" fill="#94a3b8" fontSize="8" fontWeight="bold" className="font-mono tracking-wide">{city.name}</text>
                  </g>
                ))}

                {/* Decorative Seas Labels */}
                <text x="310" y="380" fill="rgba(56, 189, 248, 0.20)" fontSize="9" fontWeight="900" letterSpacing="0.25em" fontStyle="italic" className="pointer-events-none select-none font-mono">BALEARIC SEA (MAR BALEAR)</text>
                <text x="635" y="340" fill="rgba(56, 189, 248, 0.20)" fontSize="9" fontWeight="900" letterSpacing="0.25em" fontStyle="italic" className="pointer-events-none select-none font-mono">TYRRHENIAN SEA (MAR TIRRENO)</text>
                <text x="475" y="210" fill="rgba(56, 189, 248, 0.20)" fontSize="9" fontWeight="900" letterSpacing="0.25em" fontStyle="italic" className="pointer-events-none select-none font-mono">LIGURIAN SEA</text>
                <text x="320" y="230" fill="rgba(56, 189, 248, 0.15)" fontSize="9" fontWeight="900" letterSpacing="0.25em" fontStyle="italic" className="pointer-events-none select-none font-mono">GULF OF LION</text>

                {/* Compass Rose Decoration */}
                <g transform="translate(90, 130)" className="opacity-50 pointer-events-none">
                  <circle cx="0" cy="0" r="26" fill="none" stroke="rgba(148, 163, 184, 0.25)" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="0" y1="-32" x2="0" y2="32" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1" />
                  <line x1="-32" y1="0" x2="32" y2="0" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1" />
                  <polygon points="0,-34 4,-4 0,0" fill="#f59e0b" />
                  <polygon points="0,-34 -4,-4 0,0" fill="#d97706" />
                  <polygon points="0,34 4,4 0,0" fill="#94a3b8" />
                  <polygon points="0,34 -4,4 0,0" fill="#64748b" />
                  <polygon points="34,0 4,4 0,0" fill="#94a3b8" />
                  <polygon points="34,0 4,-4 0,0" fill="#64748b" />
                  <polygon points="-34,0 -4,4 0,0" fill="#94a3b8" />
                  <polygon points="-34,0 -4,-4 0,0" fill="#64748b" />
                  <text x="0" y="-38" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="black" className="font-mono">N</text>
                </g>

                {/* Trace sea paths: connect sequential stops onto map cords */}
                {voyageLegs.map((leg, idx) => {
                  const isActiveLeg = leg.from.id === currentStop.id || leg.to.id === currentStop.id;
                  
                  return (
                    <g key={`leg-${idx}`}>
                      <path 
                        d={`M ${leg.from.x},${leg.from.y} Q ${(leg.from.x + leg.to.x)/2 + (leg.isSail ? -35 : 0)},${(leg.from.y + leg.to.y)/2 + (leg.isSail ? -25 : 0)} ${leg.to.x},${leg.to.y}`}
                        fill="none"
                        stroke={isActiveLeg 
                          ? leg.isSail ? '#10b981' : '#38bdf8' 
                          : 'rgba(148, 163, 184, 0.25)'
                        }
                        strokeWidth={isActiveLeg ? 4 : 2}
                        strokeDasharray={leg.isSail ? "6,6" : "2,4"}
                        className="transition-all duration-500"
                      />
                    </g>
                  );
                })}

                {/* Nodes on Map representing specific coordinates stop stations */}
                {MAP_STOPS.map((stop, ind) => {
                  const isNodeActive = stop.id === currentStop.id;
                  return (
                    <g 
                      key={`node-${stop.id}-${ind}`} 
                      className="cursor-pointer group"
                      onClick={() => onSelectDate(stop.date)}
                    >
                      {/* Active locator radar effect with Framer Motion to prevent flying away */}
                      {isNodeActive && (
                        <motion.circle 
                          cx={stop.x} 
                          cy={stop.y} 
                          initial={{ r: 6, opacity: 0.9 }}
                          animate={{ r: 22, opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                          fill="none" 
                          stroke="#10b981" 
                          strokeWidth="1.8"
                        />
                      )}
                      
                      {/* Node core circle anchor */}
                      <circle 
                        cx={stop.x} 
                        cy={stop.y} 
                        r={isNodeActive ? 8 : 5.5}
                        fill={isNodeActive ? "#10b981" : "#1e293b"}
                        stroke={isNodeActive ? "#ffffff" : "rgba(148, 163, 184, 0.9)"}
                        strokeWidth={isNodeActive ? 2.5 : 1.5}
                        className="transition-all duration-300 group-hover:fill-emerald-500 group-hover:scale-125"
                      />

                      {/* Tooltip text labels display near nodes dynamically */}
                      <text 
                        x={stop.x} 
                        y={stop.y - (isNodeActive ? 14 : 10)} 
                        textAnchor="middle" 
                        fill={isNodeActive ? "#34d399" : "#f1f5f9"} 
                        fontSize={isNodeActive ? 11 : 9.5} 
                        fontWeight={isNodeActive ? "900" : "600"}
                        className="font-sans transition-all duration-300 pointer-events-none drop-shadow-[0_2.5px_4px_rgba(0,0,0,0.95)]"
                      >
                        {stop.title}
                      </text>
                    </g>
                  );
                })}

                {/* Cruising Vessel Traced Marker Indicator */}
                <motion.g
                  animate={{
                    x: currentStop.x,
                    y: currentStop.y,
                  }}
                  transition={{ type: 'spring', damping: 24, stiffness: 85 }}
                  id="vessel-marker"
                  style={{ originX: 0, originY: 0 }}
                >
                  {/* Floating vessel wrapper */}
                  <g transform="translate(-16, -16)">
                    <circle cx="16" cy="16" r="14" fill="#020617" stroke="#10b981" strokeWidth="2.5" className="shadow-lg" />
                    <g transform="translate(7, 7)">
                      <Ship className="text-emerald-400" size={18} />
                    </g>
                  </g>
                </motion.g>
              </svg>

              {/* Ship Sailing Mini Info overlay at bottom right of viewport */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg flex items-center justify-between gap-4 text-xs font-mono shadow-md">
                <div className="flex items-center gap-2">
                  <Ship className="w-4 h-4 text-emerald-400 shrink-0 select-none animate-bounce" />
                  <span className="text-slate-100 font-extrabold max-w-[140px] sm:max-w-none truncate text-[11px] sm:text-xs">
                    Current vessel point: <span className="text-emerald-400">{currentStop.title}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10.5px]">
                  <span>Focus:</span>
                  <span className="text-indigo-400 font-bold">{currentStop.dates}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
