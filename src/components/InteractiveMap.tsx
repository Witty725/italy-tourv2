import React from 'react';
import { motion } from 'motion/react';
import { Compass, Ship, MapPin, Anchor, ArrowRight, X, Search } from 'lucide-react';
import { itinerary, ItineraryDay } from '../data';

interface InteractiveMapProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onClose: () => void;
}

// Coordinate configurations on a 1000 x 600 map coordinate system
const MAP_STOPS = [
  { id: 'livorno', date: 'June 23, 2026', title: 'Livorno Port', label: 'MSC Cruise Boarding', x: 672, y: 92, dates: 'Jun 23' },
  { id: 'cagliari', date: 'June 24, 2026', title: 'Cagliari', label: 'Sardinia Port stop', x: 539, y: 331, dates: 'Jun 24' },
  { id: 'palermo', date: 'June 25, 2026', title: 'Palermo', label: 'Sicily Port stop', x: 855, y: 418, dates: 'Jun 25' },
  { id: 'valletta', date: 'June 26, 2026', title: 'Valletta', label: 'Malta Port stop', x: 914, y: 577, dates: 'Jun 26' },
  { id: 'atsea', date: 'June 27, 2026', title: 'At Sea', label: 'MSC Splendida Cruising', x: 440, y: 380, dates: 'Jun 27' },
  { id: 'barcelona', date: 'June 28, 2026', title: 'Barcelona', label: 'Catalonia Port stop', x: 22, y: 156, dates: 'Jun 28' },
  { id: 'marseille', date: 'June 29, 2026', title: 'Marseille', label: 'French Riviera stop', x: 261, y: -4, dates: 'Jun 29' },
  { id: 'departure', date: 'June 30, 2026', title: 'Livorno Port', label: 'Disembark & Flight', x: 672, y: 92, dates: 'Jun 30' },
];

export function InteractiveMap({ selectedDate, onSelectDate, onClose }: InteractiveMapProps) {
  // Map day number directly to the corresponding stop coordinates
  const getCoordinatesForDate = (dateStr: string) => {
    const matched = MAP_STOPS.find(stop => stop.date === dateStr);
    return matched || MAP_STOPS[0];
  };

  const currentStop = getCoordinatesForDate(selectedDate);

  // Trace sequential legs for path rendering
  const voyageLegs = [
    { from: MAP_STOPS[0], to: MAP_STOPS[1], isSail: true, desc: 'MSC Splendida sailing overnight to Sardinia' },
    { from: MAP_STOPS[1], to: MAP_STOPS[2], isSail: true, desc: 'Sailing overnight across Tyrrhenian Sea to Sicily' },
    { from: MAP_STOPS[2], to: MAP_STOPS[3], isSail: true, desc: 'Voyaging south towards historical Valletta' },
    { from: MAP_STOPS[3], to: MAP_STOPS[4], isSail: true, desc: 'Cruising Open Balearic Sea towards Spain' },
    { from: MAP_STOPS[4], to: MAP_STOPS[5], isSail: true, desc: 'Approaching spectacular Barcelona Port' },
    { from: MAP_STOPS[5], to: MAP_STOPS[6], isSail: true, desc: 'Sailing north along picturesque Costa Brava to Marseille' },
    { from: MAP_STOPS[6], to: MAP_STOPS[7], isSail: true, desc: 'Final segment crossing Ligurian Sea back to Livorno' },
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
                Interactive cruise track trace mapping of your 8-day itinerary
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
                        {stop.title.includes('Port') ? (
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
          <div className="lg:col-span-8 p-3 sm:p-5 flex flex-col justify-center items-center bg-slate-950/25 relative min-h-[350px] sm:min-h-[420px] order-1 lg:order-2">
            
            {/* Ambient Title Layer */}

            {/* Outer high-end SVG canvas map workspace */}
            <div className="w-full h-full max-w-[850px] aspect-[850/500] relative bg-[#aad3df] rounded-xl border border-slate-350 p-0 overflow-hidden shadow-inner">
              <svg 
                viewBox="-40 -20 1080 670" 
                className="w-full h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Google Maps Ocean Blue Color Fill */}
                  <linearGradient id="googleOcean" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#aad3df" />
                    <stop offset="100%" stopColor="#9ecbd8" />
                  </linearGradient>

                  {/* Google Maps Landmass Color Fill */}
                  <linearGradient id="googleLand" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dbf0e5" />
                    <stop offset="100%" stopColor="#c5edd2" />
                  </linearGradient>

                  <filter id="shadow-filter" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodOpacity="0.25" />
                  </filter>
                </defs>
                
                {/* Apply deep ocean color fill */}
                <rect x="-100" y="-100" width="1200" height="900" fill="url(#googleOcean)" />

                {/* Embed Google Map Image as a background layer */}
                <image 
                  href="/med-map.png" 
                  x="-40" 
                  y="-20" 
                  width="1080" 
                  height="670" 
                  preserveAspectRatio="none"
                />

                {/* Trace sea paths: connect sequential stops onto map cords */}
                {voyageLegs.map((leg, idx) => {
                  const isActiveLeg = leg.from.id === currentStop.id || leg.to.id === currentStop.id;
                  
                  return (
                    <g key={`leg-${idx}`}>
                      {/* White border masking path for high-contrast outline effect */}
                      <path 
                        d={`M ${leg.from.x},${leg.from.y} Q ${(leg.from.x + leg.to.x)/2 + (leg.isSail ? -35 : 0)},${(leg.from.y + leg.to.y)/2 + (leg.isSail ? -25 : 0)} ${leg.to.x},${leg.to.y}`}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth={isActiveLeg ? 5.5 : 3}
                        className="transition-all duration-500 opacity-90"
                      />
                      {/* Active foreground trace path */}
                      <path 
                        d={`M ${leg.from.x},${leg.from.y} Q ${(leg.from.x + leg.to.x)/2 + (leg.isSail ? -35 : 0)},${(leg.from.y + leg.to.y)/2 + (leg.isSail ? -25 : 0)} ${leg.to.x},${leg.to.y}`}
                        fill="none"
                        stroke={isActiveLeg 
                          ? '#1a73e8' 
                          : 'rgba(26, 115, 232, 0.45)'
                        }
                        strokeWidth={isActiveLeg ? 3.2 : 1.5}
                        strokeDasharray={leg.isSail ? "6,5" : "2,3"}
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
                      {/* Active locator radar ripple effect */}
                      {isNodeActive && (
                        <motion.circle 
                          cx={stop.x} 
                          cy={stop.y} 
                          initial={{ r: 6, opacity: 0.95 }}
                          animate={{ r: 24, opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                          fill="none" 
                          stroke="#ea4335" 
                          strokeWidth="2.2"
                        />
                      )}
                      
                      {/* Google Maps Teardrop Marker Pin or Blue Target Round Dot */}
                      {isNodeActive ? (
                        <g transform={`translate(${stop.x}, ${stop.y})`} filter="url(#shadow-filter)">
                          <path 
                            d="M 0,0 C -5,-5 -10,-10 -10,-17 C -10,-24 -5.5,-28 0,-28 C 5.5,-28 10,-24 10,-17 C 10,-10 5,-5 0,0 Z" 
                            fill="#ea4335" 
                            stroke="#ffffff"
                            strokeWidth="1.8"
                          />
                          <circle cx="0" cy="-17" r="4" fill="#ffffff" />
                        </g>
                      ) : (
                        <circle 
                          cx={stop.x} 
                          cy={stop.y} 
                          r={5.5}
                          fill="#ffffff"
                          stroke="#1a73e8"
                          strokeWidth="2.8"
                          className="transition-all duration-300 group-hover:fill-blue-500 group-hover:scale-125"
                        />
                      )}

                      {/* Tooltip text labels displaying near nodes with white outline halos */}
                      <text 
                        x={stop.x} 
                        y={stop.y - (isNodeActive ? 31 : 12)} 
                        textAnchor="middle" 
                        fill={isNodeActive ? "#ea4335" : "#1a73e8"} 
                        fontSize={isNodeActive ? 11 : 10} 
                        fontWeight={isNodeActive ? "900" : "750"}
                        paintOrder="stroke"
                        stroke="#ffffff"
                        strokeWidth="3.2"
                        strokeLinejoin="round"
                        className="font-sans transition-all duration-300 pointer-events-none"
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
                  <g transform="translate(-16, -16)" className="drop-shadow-md">
                    <circle cx="16" cy="16" r="13" fill="#1a73e8" stroke="#ffffff" strokeWidth="2.2" />
                    <g transform="translate(7, 7)">
                      <Ship className="text-white" size={18} />
                    </g>
                  </g>
                </motion.g>
              </svg>

              {/* Simulated Google Maps Vignette / Info Overlay floating at bottom left now */}
              <div 
                className="absolute bottom-3 left-3 bg-white/95 border border-slate-200/90 p-3 rounded-xl shadow-xl flex flex-col gap-1.5 font-sans backdrop-blur-sm z-10 max-w-[260px] sm:max-w-[290px] text-left transition-all" 
                id="vessel-vignette-bubble"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 px-1.5 bg-blue-50 border border-blue-100 text-[#1a73e8] font-mono text-[9px] uppercase tracking-wider font-extrabold rounded-md leading-none">
                    Current Vessel Point
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 font-extrabold ml-auto">{currentStop.dates}</span>
                </div>
                
                <div className="flex items-center gap-2 mt-0.5">
                  <Ship className="w-4 h-4 text-[#1a73e8] shrink-0 animate-bounce" />
                  <p className="text-slate-800 text-xs font-extrabold leading-tight">
                    Active Station: <span className="text-[#1a73e8] font-black">{currentStop.title}</span>
                  </p>
                </div>
                
                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                  {currentStop.label}. Tap other milestones on the list to map live tracks.
                </p>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
