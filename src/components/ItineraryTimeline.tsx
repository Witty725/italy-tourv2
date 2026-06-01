import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Copy, 
  Check, 
  Phone, 
  MapPin, 
  AlertTriangle, 
  ThermometerSun, 
  Bus, 
  Home, 
  Utensils, 
  Compass, 
  Music, 
  Ship, 
  Heart,
  ChevronRight,
  Info
} from 'lucide-react';
import { itinerary, ItineraryDay, ItineraryActivity } from '../data';

// Locations to turn into Google Images links
const LOCATIONS = [
  { name: "Cargalla", query: "Cargalla Pontremoli Italy" },
  { name: "Molinello", query: "Molinello Pontremoli Italy" },
  { name: "Toplecca", query: "Toplecca Pontremoli Italy" },
  { name: "Piagnaro Castle", query: "Castello del Piagnaro Pontremoli" },
  { name: "Museum of Lunigiana Stele Statues", query: "Museo delle Statue Stele Pontremoli" },
  { name: "Santissima Annunziata Church", query: "Chiesa della Santissima Annunziata Pontremoli" },
  { name: "Ristorante Abramo", query: "Ristorante Abramo Pontremoli" },
  { name: "Lido di Camaiore", query: "Lido di Camaiore Tuscany" },
  { name: "Villa Dosi Delfini", query: "Villa Dosi Delfini Pontremoli" },
  { name: "Ristorante Locanda Ca' del Moro", query: "Locanda Ca del Moro Pontremoli" },
  { name: "Hotel Napoleon", query: "Hotel Napoleon Pontremoli" },
  { name: "Livorno", query: "Livorno Italy Port" },
  { name: "Cagliari", query: "Cagliari Sardinia" },
  { name: "Palermo", query: "Palermo Sicily" },
  { name: "Valletta", query: "Valletta Malta" },
  { name: "Barcelona", query: "Barcelona Spain coast" },
  { name: "Marseille", query: "Marseille France port" },
  { name: "Rome", query: "Rome Italy Colosseum" },
  { name: "Vatican", query: "Vatican City tour" },
  { name: "Colosseum", query: "Colosseum Rome Italy" },
  { name: "Roman Forum", query: "Roman Forum Rome ruins" },
  { name: "Sella del Diavolo", query: "Sella del Diavolo Cagliari Sardinia" },
  { name: "San Benedetto Market", query: "Mercato di San Benedetto Cagliari" },
  { name: "Stella Marina di Montecristo", query: "Stella Marina di Montecristo Cagliari" },
  { name: "Martorana Church", query: "Santa Maria dell Ammiraglio Palermo Martorana" },
  { name: "Monastero di Santa Caterina", query: "Monastero di Santa Caterina Palermo pastries" },
  { name: "Friggitoria Chiluzzo", query: "Friggitoria Chiluzzo Kalsa Palermo" },
  { name: "Capuchin Catacombs", query: "Catacombe dei Cappuccini Palermo" },
  { name: "Lower Barrakka Gardens", query: "Lower Barrakka Gardens Valletta" },
  { name: "Siege Bell War Memorial", query: "Siege Bell War Memorial Valletta" },
  { name: "Valletta Underground", query: "Valletta Underground Tunnels" },
  { name: "Birgu", query: "Birgu Vittoriosa Malta" },
  { name: "Crystal Palace pastizzi", query: "Crystal Palace Rabat Malta pastizzi" },
  { name: "Hospital de Sant Pau", query: "Hospital de Sant Pau Barcelona" },
  { name: "Carrer dels Flassaders", query: "Carrer dels Flassaders Barcelona" },
  { name: "El Xampanyet", query: "El Xampanyet Barcelona tapas" },
  { name: "Bunkers del Carmel", query: "Bunkers del Carmel Barcelona view" },
  { name: "Le Panier", query: "Le Panier district Marseille" },
  { name: "Vallon des Auffes", query: "Vallon des Auffes Marseille" },
  { name: "La Caravelle", query: "La Caravelle Marseille pub" },
  { name: "Calanque de Sugiton", query: "Calanque de Sugiton Marseille" },
  { name: "Torta di Ceci", query: "Torta di Ceci Livorno" },
  { name: "Gagarin", query: "Torteria da Gagarin Livorno" },
  { name: "Chiosi Bridge", query: "Ponte Chiosi Pontremoli Italy" },
  { name: "Caffè Svizzer", query: "Caffe Svizzer Pontremoli" },
  { name: "Osteria della Sanacore", query: "Osteria della Sanacore Pontremoli" },
  { name: "Campanone Tower", query: "Il Campanone Pontremoli Italy" },
  { name: "Pontremoli Cathedral", query: "Cattedrale Santa Maria Assunta Pontremoli" },
  { name: "Pasticceria Della Cresa", query: "Pasticceria Della Cresa Pontremoli" },
  { name: "Baci di Pontremoli", query: "Baci di Pontremoli cookies pastry" }
];

export const VOYAGE_PORTS = [
  { city: 'Pontremoli', abbr: 'PT', date: 'June 18, 2026', day: 'June 18-22' },
  { city: 'Livorno', abbr: 'LV', date: 'June 23, 2026', day: 'June 23' },
  { city: 'Cagliari', abbr: 'CG', date: 'June 24, 2026', day: 'June 24' },
  { city: 'Palermo', abbr: 'PL', date: 'June 25, 2026', day: 'June 25' },
  { city: 'Valletta', abbr: 'VL', date: 'June 26, 2026', day: 'June 26' },
  { city: 'At Sea', abbr: 'AS', date: 'June 27, 2026', day: 'June 27' },
  { city: 'Barcelona', abbr: 'BC', date: 'June 28, 2026', day: 'June 28' },
  { city: 'Marseille', abbr: 'MS', date: 'June 29, 2026', day: 'June 29' },
  { city: 'Rome', abbr: 'RM', date: 'July 1, 2026', day: 'July 1-3' }
];

// Helper to convert plain text into rich components featuring Google Images hyperlinks
export function InteractiveText({ text, disableLinks = false }: { text: string; disableLinks?: boolean }) {
  if (!text) return null;
  
  // Sort descending by length to ensure longer match phrases win first
  const sortedAndEscaped = [...LOCATIONS].sort((a, b) => b.name.length - a.name.length);
  
  let parts: React.ReactNode[] = [text];
  
  sortedAndEscaped.forEach((loc) => {
    const term = loc.name;
    const nextParts: React.ReactNode[] = [];
    
    parts.forEach((part) => {
      if (typeof part !== 'string') {
        nextParts.push(part);
        return;
      }
      
      const regex = new RegExp(`(${term})`, 'gi');
      const segments = part.split(regex);
      
      segments.forEach((seg, idx) => {
        if (seg.toLowerCase() === term.toLowerCase() && !disableLinks) {
          nextParts.push(
            <a
              key={`${loc.name}-${idx}`}
              href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(loc.query)}`}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-0.5 text-orange-400 hover:text-orange-300 underline font-bold transition-all decoration-dotted whitespace-nowrap bg-orange-500/10 hover:bg-orange-500/20 px-1.5 py-0.5 rounded text-[11px] sm:text-xs mx-0.5"
              title={`View photos of ${seg}`}
              id={`link-location-${loc.name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <Camera className="w-3.5 h-3.5 shrink-0 inline" />
              {seg}
            </a>
          );
        } else if (seg) {
          nextParts.push(seg);
        }
      });
    });
    
    parts = nextParts;
  });
  
  return <>{parts}</>;
}

// Activity category icons
function getActivityIcon(iconType?: string) {
  switch (iconType) {
    case 'hotel':
      return <Home className="w-4 h-4 text-emerald-400" />;
    case 'tour':
      return <Compass className="w-4 h-4 text-indigo-400" />;
    case 'food':
      return <Utensils className="w-4 h-4 text-amber-400" />;
    case 'concert':
      return <Music className="w-4 h-4 text-rose-400" />;
    case 'ship':
      return <Ship className="w-4 h-4 text-blue-400" />;
    case 'church':
      return <Heart className="w-4 h-4 text-purple-400" />;
    case 'transfer':
    default:
      return <Bus className="w-4 h-4 text-sky-400" />;
  }
}

function getDayStyle(dayNum: number, month: string, isActive: boolean) {
  if (month === 'June') {
    if (dayNum >= 18 && dayNum <= 22) {
      // June 18-22: Green
      return isActive
        ? 'bg-emerald-500/25 border-emerald-500/70 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/50 text-emerald-200 font-bold scale-[1.02]'
        : 'bg-emerald-950/15 border-emerald-500/30 text-emerald-400/95 hover:bg-emerald-950/25 hover:border-emerald-500/50';
    } else if (dayNum === 23) {
      // June 23: Blend Green -> White
      return isActive
        ? 'bg-gradient-to-r from-emerald-500/25 to-slate-200/20 border-emerald-300 text-white shadow-md ring-1 ring-emerald-300/40 scale-[1.02]'
        : 'bg-gradient-to-r from-emerald-950/20 to-slate-900/40 border-slate-700/60 hover:from-emerald-950/35 hover:to-slate-800 text-slate-300';
    } else if (dayNum >= 24 && dayNum <= 29) {
      // June 24-29: White
      return isActive
        ? 'bg-slate-200/20 border-slate-100 shadow-md ring-1 ring-slate-200/35 text-white font-bold scale-[1.02]'
        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-700';
    } else if (dayNum === 30) {
      // June 30: Blend White -> Red
      return isActive
        ? 'bg-gradient-to-r from-slate-200/15 to-red-500/25 border-rose-450 text-rose-200 shadow-md ring-1 ring-rose-450/45 scale-[1.02]'
        : 'bg-gradient-to-r from-slate-900/40 to-red-950/30 border-rose-950/40 hover:from-slate-800 hover:to-red-950/40 text-slate-300';
    }
  } else if (month === 'July') {
    // July 1-3: Red
    return isActive
      ? 'bg-red-500/25 border-red-500/70 shadow-lg shadow-red-500/10 ring-1 ring-red-500/50 text-red-100 font-bold scale-[1.02]'
      : 'bg-red-950/15 border-red-500/30 text-red-400 hover:bg-red-950/25 hover:border-red-500/50';
  }
  return isActive
    ? 'bg-rose-500/25 border-rose-500/60 shadow-lg'
    : 'bg-slate-900/40 border-slate-800/80';
}

function getDetailsThemeClasses(dayNum: number, month: string) {
  if (month === 'June') {
    if (dayNum >= 18 && dayNum <= 22) {
      return {
        accentLine: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-emerald-500',
        dateText: 'text-emerald-400 font-bold',
        weatherIcon: 'text-emerald-400',
        weatherHigh: 'text-emerald-500',
        weatherLow: 'text-cyan-400',
      };
    } else if (dayNum === 23) {
      return {
        accentLine: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-gradient-to-r before:from-emerald-500 before:to-slate-100',
        dateText: 'text-emerald-300 font-bold',
        weatherIcon: 'text-indigo-400',
        weatherHigh: 'text-emerald-500',
        weatherLow: 'text-slate-300',
      };
    } else if (dayNum >= 24 && dayNum <= 29) {
      return {
        accentLine: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-slate-200',
        dateText: 'text-slate-100 font-bold',
        weatherIcon: 'text-slate-400',
        weatherHigh: 'text-white',
        weatherLow: 'text-slate-400',
      };
    } else if (dayNum === 30) {
      return {
        accentLine: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-gradient-to-r before:from-slate-200 before:to-red-500',
        dateText: 'text-rose-300 font-bold',
        weatherIcon: 'text-rose-450',
        weatherHigh: 'text-white',
        weatherLow: 'text-red-400',
      };
    }
  }
  // July 1-3
  return {
    accentLine: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-red-500',
    dateText: 'text-red-400 font-bold',
    weatherIcon: 'text-red-400',
    weatherHigh: 'text-red-500',
    weatherLow: 'text-cyan-450',
  };
}

export function ItineraryTimeline() {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    try {
      const today = new Date();
      if (today.getFullYear() === 2026) {
        const monthNum = today.getMonth(); // 5 = June, 6 = July
        const dayOfMonth = today.getDate();
        if (monthNum === 5 && dayOfMonth >= 18 && dayOfMonth <= 30) {
          const matched = itinerary.find(d => d.month === 'June' && d.dayNum === dayOfMonth);
          if (matched) return matched.date;
        } else if (monthNum === 6 && dayOfMonth >= 1 && dayOfMonth <= 3) {
          const matched = itinerary.find(d => d.month === 'July' && d.dayNum === dayOfMonth);
          if (matched) return matched.date;
        }
      }
    } catch (_) {}
    return itinerary[0].date;
  });
  const [copiedPhone, setCopiedPhone] = useState(false);

  const selectedDay = itinerary.find(day => day.date === selectedDate) || itinerary[0];

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  // Group by month for nice calendar separation
  const juneDays = itinerary.filter(day => day.month === 'June');
  const julyDays = itinerary.filter(day => day.month === 'July');

  const theme = getDetailsThemeClasses(selectedDay.dayNum, selectedDay.month);

  return (
    <div className="flex flex-col gap-4">
      {/* Calendar Header/Help Banner */}
      <div className="glass-panel p-3.5 flex items-center gap-2.5 bg-indigo-950/20 border-indigo-505/20 text-xs text-indigo-300 leading-relaxed">
        <Info className="w-4 h-4 shrink-0 text-indigo-400" />
        <span>Tap any date below to inspect detailed schedules, lodging details, and live image highlights.</span>
      </div>

      {/* Interactive Voyage Route Map Card */}
      <div className="glass-panel bg-gradient-to-br from-slate-950 via-slate-900/60 to-slate-950 p-4 border-slate-800 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase flex items-center gap-1.5 leading-none">
            <Compass className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            Interactive Cruise Voyage Path
          </span>
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            Mediterranean Loop
          </span>
        </div>
        
        {/* Horizontal Scrollable Voyage Progress and Ports indicator map */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none shrink-0 -mx-1 px-1">
          {VOYAGE_PORTS.map((port, index) => {
            const isSelected = selectedDay.location.toLowerCase().includes(port.city.toLowerCase()) || 
                               (port.city === 'At Sea' && selectedDay.location.includes('AT SEA')) ||
                               (port.city === 'Rome' && selectedDay.location.includes('ROME')) ||
                               (port.city === 'Rome' && selectedDay.location.includes('VATICAN'));
            return (
              <div key={index} className="flex items-center shrink-0">
                {/* Connected Line (hidden for first) */}
                {index > 0 && (
                  <div className={`h-0.5 w-4 sm:w-6 transition-all shrink-0 ${isSelected ? 'bg-indigo-500' : 'bg-slate-800'}`}></div>
                )}
                
                {/* Port Point Interactive Node */}
                <button
                  onClick={() => {
                    const found = itinerary.find(d => d.date === port.date);
                    if (found) setSelectedDate(found.date);
                  }}
                  className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    isSelected 
                      ? 'scale-105 select-none' 
                      : 'opacity-55 hover:opacity-100 hover:scale-[1.02]'
                  }`}
                  id={`voyage-port-${port.city.toLowerCase().replace(/\s+/g, '-')}`}
                  title={`Jump to ${port.city}`}
                >
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 transition-all shadow-md ${
                    isSelected 
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400 font-extrabold shadow-indigo-500/15' 
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}>
                    <span className="text-[10px] sm:text-xs font-mono font-black">{port.abbr}</span>
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-black leading-none tracking-tight uppercase ${
                    isSelected ? 'text-indigo-400 font-extrabold' : 'text-slate-500'
                  }`}>
                    {port.city}
                  </span>
                  <span className="text-[8px] font-mono font-semibold text-slate-500 leading-none mt-0.5">
                    {port.day}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pocket Calendar Grid Tab */}
      <div className="glass-panel p-3.5 flex flex-col gap-3">
        {/* June Section */}
        <div>
          <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase block mb-2">
            June 2026
          </span>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
            {juneDays.map((day) => {
              const isActive = day.date === selectedDate;
              const styleClasses = getDayStyle(day.dayNum, day.month, isActive);
              return (
                <button
                  key={day.date}
                  onClick={() => setSelectedDate(day.date)}
                  className={`flex flex-col items-center justify-between p-2 rounded-lg border text-center transition-all cursor-pointer ${styleClasses}`}
                >
                  <span className="text-[10px] leading-none text-slate-400 uppercase tracking-widest font-black">
                    {day.date.split(' ')[0].substring(0, 3)}
                  </span>
                  <span className="text-sm font-black mt-1 mb-1 leading-none">{day.dayNum}</span>
                  <span className="text-[9px] font-mono leading-none font-extrabold">
                    {day.highF}°/{day.lowF}°
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* July Section */}
        <div>
          <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase block mb-2">
            July 2026
          </span>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
            {julyDays.map((day) => {
              const isActive = day.date === selectedDate;
              const styleClasses = getDayStyle(day.dayNum, day.month, isActive);
              return (
                <button
                  key={day.date}
                  onClick={() => setSelectedDate(day.date)}
                  className={`flex flex-col items-center justify-between p-2 rounded-lg border text-center transition-all cursor-pointer ${styleClasses}`}
                >
                  <span className="text-[10px] leading-none text-slate-400 uppercase tracking-widest font-black">
                    {day.date.split(' ')[0].substring(0, 3)}
                  </span>
                  <span className="text-sm font-black mt-1 mb-1 leading-none">{day.dayNum}</span>
                  <span className="text-[9px] font-mono leading-none font-extrabold">
                    {day.highF}°/{day.lowF}°
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Footnote about historical temperatures */}
        <p className="text-[10px] sm:text-xs text-amber-400 italic text-center font-semibold mt-2.5">
          * Displayed temperatures reflect historical weather data. Check home tab for real-time weather.
        </p>
      </div>

      {/* Selected Day Details Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay.date}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`glass-panel p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden ${theme.accentLine}`}
        >
          {/* Header metadata summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-slate-800">
            <div>
              <span className={`${theme.dateText} font-black text-xs sm:text-sm uppercase tracking-widest font-mono`}>
                {selectedDay.date}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 uppercase tracking-tight">
                {selectedDay.location}
              </h3>
            </div>

            {/* Micro Weather card */}
            <div className="bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800 text-left shrink-0 max-w-xs flex items-center gap-2.5">
              <ThermometerSun className={`w-5 h-5 ${theme.weatherIcon} shrink-0`} />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className={`font-mono text-xs ${theme.weatherHigh} font-black`}>H: {selectedDay.highF}°F</span>
                  <span className={`font-mono text-xs ${theme.weatherLow} font-black`}>L: {selectedDay.lowF}°F</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold mt-1 font-sans">{selectedDay.weather}</span>
              </div>
            </div>
          </div>

          {/* Warning Banner */}
          {selectedDay.warning && (
            <div className="bg-red-950/20 border border-red-500/30 p-3 rounded-xl flex items-start gap-2 text-xs text-red-200">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-extrabold uppercase tracking-wide text-red-300">Important Advisory:</span>
                <span className="mt-0.5 font-medium leading-relaxed">{selectedDay.warning}</span>
              </div>
            </div>
          )}

          {/* High-Fidelity Extended Weather description */}
          {selectedDay.weatherDetails && (
            <div className="bg-slate-900/30 p-3.5 rounded-xl border border-slate-800/80 text-xs">
              <span className="text-slate-400 font-extrabold uppercase tracking-widest text-[9px] block mb-1">Weather Forecast Breakdown:</span>
              <p className="text-slate-350 leading-relaxed font-medium">{selectedDay.weatherDetails}</p>
            </div>
          )}

          {/* Lodging & Accommodation Highlight */}
          {selectedDay.hotel && (
            <div className="bg-gradient-to-br from-emerald-950/10 via-slate-900/40 to-slate-950/50 p-4 rounded-xl border border-emerald-500/20 flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <Home className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <span className="text-emerald-400 font-black uppercase text-[10px] tracking-wider leading-none">Hotel Accommodation Stay</span>
              </div>
              
              <div className="flex flex-col gap-0.5">
                <span className="text-base font-black text-slate-100">{selectedDay.hotel.name}</span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <InteractiveText text={selectedDay.hotel.address} />
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-1">
                <a 
                  href={`tel:${selectedDay.hotel.phone.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 rounded-lg border border-slate-800 text-xs text-slate-200 font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedDay.hotel.phone}
                </a>

                <button 
                  onClick={() => handleCopyPhone(selectedDay.hotel!.address)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 rounded-lg border border-slate-800 text-xs text-slate-200 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copiedPhone ? 'Copied Complex Address!' : 'Copy Address'}</span>
                </button>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedDay.hotel.name + ', ' + selectedDay.hotel.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 rounded-lg border border-indigo-500/25 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  id={`hotel-map-${selectedDay.hotel.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                >
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>OPEN MAPS</span>
                </a>

                <a
                  href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(selectedDay.hotel.name + ' ' + selectedDay.hotel.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 rounded-lg border border-orange-500/25 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  id={`hotel-images-${selectedDay.hotel.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                >
                  <Camera className="w-3.5 h-3.5 text-orange-400" />
                  <span>IMAGE HIGHLIGHTS</span>
                </a>
              </div>
            </div>
          )}

          {/* Daily Schedule Events Timeline */}
          <div>
            <span className="text-slate-400 font-extrabold uppercase tracking-widest text-[9px] block mb-4 border-b border-slate-800 pb-2">
              Timeline Activities
            </span>

            {selectedDay.activities && selectedDay.activities.length > 0 ? (
              <div className="flex flex-col gap-3 relative">
                {/* Visual vertical lineage line connector */}
                <div className="absolute top-2 bottom-2 left-[18px] w-0.5 bg-slate-850"></div>

                {selectedDay.activities.map((activity, index) => {
                  const isAtSeaDay = selectedDay.dayNum === 27 && selectedDay.month === 'June';
                  
                  // Construct a rich local query for Maps & Images search
                  const searchQuery = [
                    activity.title,
                    activity.location,
                    selectedDay.location !== 'AT SEA' ? selectedDay.location : null
                  ].filter(Boolean).join(', ');

                  return (
                    <div key={index} className="flex gap-4 relative z-10 group">
                      {/* Visual icon badge step */}
                      <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center shrink-0 group-hover:border-slate-700 transition-colors">
                        {getActivityIcon(activity.icon)}
                      </div>

                      {/* Timeline card activity */}
                      <div className={`flex-1 p-4 rounded-xl transition-all flex flex-col gap-1.5 ${
                        activity.isFamilyEvent 
                          ? 'bg-amber-950/15 border-2 border-amber-400 shadow-[0_0_15px_rgba(234,179,8,0.15)] ring-1 ring-amber-400/20' 
                          : 'bg-slate-950/40 border border-slate-900 group-hover:border-slate-800'
                      }`}>
                        {/* Family Event Heading Block */}
                        {activity.isFamilyEvent && (
                          <div className="flex items-center gap-1.5 bg-amber-400/10 text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-amber-400/25 w-fit mb-1 shadow-sm leading-none">
                            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                            <span>FAMILY EVENT</span>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className={`font-black text-sm pr-9 sm:pr-0 ${activity.isFamilyEvent ? 'text-amber-200 text-base' : 'text-slate-100'}`}>
                            <InteractiveText text={activity.title} disableLinks={isAtSeaDay} />
                          </h4>
                          
                          {activity.time && (
                            <span className="font-mono text-[11px] font-black text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-850 uppercase tracking-widest shrink-0 self-start sm:self-center">
                              {activity.time}
                            </span>
                          )}
                        </div>

                        <p className={`text-xs leading-relaxed font-normal ${activity.isFamilyEvent ? 'text-amber-100/90' : 'text-slate-400'}`}>
                          <InteractiveText text={activity.description} disableLinks={isAtSeaDay} />
                        </p>

                        {/* Optional metadata additions */}
                        {activity.guidedBy && (
                          <div className="mt-1 flex items-center gap-1 text-[11px] font-extrabold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 w-fit">
                            <Compass className="w-3.5 h-3.5" />
                            <span>GUIDED BY: {activity.guidedBy}</span>
                          </div>
                        )}

                        {activity.transport && (
                          <div className="mt-1 flex items-center gap-1.5 text-[11px] font-extrabold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20 w-fit font-sans">
                            <Bus className="w-3.5 h-3.5" />
                            <span>TRANSPORTATION: {activity.transport}</span>
                          </div>
                        )}

                        {activity.location && !isAtSeaDay && (
                          <div className={`mt-1 flex items-center gap-1.5 text-[11px] font-extrabold px-2.5 py-1 rounded-md w-fit font-sans ${
                            activity.isFamilyEvent
                              ? 'text-amber-300 bg-amber-400/10 border border-amber-400/20'
                              : 'text-rose-450 bg-rose-500/10 border border-rose-500/20'
                          }`}>
                            <MapPin className="w-3.5 h-3.5" />
                            <span>LOCATION: <InteractiveText text={activity.location} disableLinks={isAtSeaDay} /></span>
                          </div>
                        )}

                        {activity.menu && (
                          <div className="mt-2 bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/25 text-[11px] sm:text-xs">
                            <span className="font-black text-amber-400 uppercase tracking-wide block mb-1">Catering & Beverage Menu:</span>
                            <span className="text-slate-300 font-medium leading-relaxed">{activity.menu}</span>
                          </div>
                        )}

                        {/* Standalone Google Images and Google Maps actions */}
                        {!isAtSeaDay && (
                          <div className="mt-3 pt-3 border-t border-slate-900 flex flex-wrap gap-2">
                            <a
                              href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchQuery)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              referrerPolicy="no-referrer"
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-lg border transition-all cursor-pointer ${
                                activity.isFamilyEvent
                                  ? 'bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border-amber-400/35 hover:border-amber-400/65 shadow-sm'
                                  : 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 border-orange-500/20 hover:border-orange-500/30'
                              }`}
                              id={`img-search-${index}-${activity.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                            >
                              <Camera className="w-3.5 h-3.5" />
                              <span>IMAGE HIGHLIGHTS</span>
                            </a>
                            
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              referrerPolicy="no-referrer"
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-lg border transition-all cursor-pointer ${
                                activity.isFamilyEvent
                                  ? 'bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border-amber-400/35 hover:border-amber-400/65 shadow-sm'
                                  : 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border-indigo-500/20 hover:border-indigo-500/30'
                              }`}
                              id={`map-link-${index}-${activity.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              <span>OPEN MAPS</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <span className="text-slate-500 font-bold text-xs italic block text-center py-4">No scheduled specific activities listed. Take advantage of leisure time!</span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
