import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Copy, 
  Check, 
  Phone, 
  MapPin, 
  AlertTriangle, 
  ThermometerSun, 
  Sun,
  Wind,
  CloudSun,
  CloudRain,
  Bus, 
  Home, 
  Utensils, 
  Compass, 
  Music, 
  Ship, 
  Heart,
  ChevronRight,
  Info,
  ArrowUp
} from 'lucide-react';
import { itinerary, ItineraryDay, ItineraryActivity } from '../data';
import { InteractiveMap } from './InteractiveMap';
import { triggerHaptic } from '../utils/haptics';

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

export function getCityShortName(dayNum: number, month: string, fullLocation: string) {
  if (month === 'June') {
    if (dayNum >= 18 && dayNum <= 22) return 'Pontremoli';
    if (dayNum === 23) return 'Livorno';
    if (dayNum === 24) return 'Cagliari';
    if (dayNum === 25) return 'Palermo';
    if (dayNum === 26) return 'Valletta';
    if (dayNum === 27) return 'At Sea';
    if (dayNum === 28) return 'Barcelona';
    if (dayNum === 29) return 'Marseille';
    if (dayNum === 30) return 'Departure';
  }
  // Fallback: extract first word before comma or parenthesis
  const parts = fullLocation.split(/[,(]/);
  return parts[0].trim();
}

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
              className="inline-flex items-center gap-0.5 text-orange-400 hover:text-orange-300 underline font-bold transition-all decoration-dotted whitespace-nowrap bg-orange-500/10 hover:bg-orange-500/20 px-1.5 py-0.5 rounded text-[11px] sm:text-xs mx-0.5 pointer-events-auto cursor-pointer"
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
  const category = getActivityCategory(iconType);
  if (category === 'Food') {
    return <Utensils className="w-4 h-4 text-amber-400" />;
  }
  if (category === 'Sights') {
    return <Camera className="w-4 h-4 text-emerald-400" />;
  }
  if (iconType === 'ship') {
    return <Ship className="w-4 h-4 text-blue-400" />;
  }
  return <Bus className="w-4 h-4 text-sky-400" />;
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
      // June 30: Blend White -> Slate (Disembark & Departure)
      return isActive
        ? 'bg-gradient-to-r from-slate-200/15 to-indigo-500/25 border-indigo-400 text-indigo-200 shadow-md ring-1 ring-indigo-400/45 scale-[1.02]'
        : 'bg-gradient-to-r from-slate-900/40 to-slate-950/30 border-slate-800 hover:from-slate-800 hover:to-slate-900 text-slate-300';
    }
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
        cardBg: 'bg-emerald-950/25 border-emerald-500/25 shadow-[0_4px_30px_rgba(16,185,129,0.03),inset_0_1px_1px_rgba(16,185,129,0.1)]',
        phaseName: 'Tuscany Discovery',
        phaseColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
      };
    } else if (dayNum === 23) {
      return {
        accentLine: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-gradient-to-r before:from-emerald-500 before:to-slate-100',
        dateText: 'text-emerald-300 font-bold',
        weatherIcon: 'text-indigo-400',
        weatherHigh: 'text-emerald-500',
        weatherLow: 'text-slate-300',
        cardBg: 'bg-gradient-to-br from-emerald-950/20 to-blue-950/25 border-cyan-500/25 shadow-[0_4px_30px_rgba(6,182,212,0.03),inset_0_1px_1px_rgba(6,182,212,0.1)]',
        phaseName: 'Cruise Embarkation',
        phaseColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
      };
    } else if (dayNum >= 24 && dayNum <= 29) {
      return {
        accentLine: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-slate-200',
        dateText: 'text-slate-100 font-bold',
        weatherIcon: 'text-slate-400',
        weatherHigh: 'text-white',
        weatherLow: 'text-slate-400',
        cardBg: 'bg-blue-950/20 border-blue-500/25 shadow-[0_4px_30px_rgba(59,130,246,0.03),inset_0_1px_1px_rgba(59,130,246,0.1)]',
        phaseName: 'Mediterranean Cruise',
        phaseColor: 'text-sky-400 border-sky-500/30 bg-sky-500/10'
      };
    } else if (dayNum === 30) {
      return {
        accentLine: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-gradient-to-r before:from-slate-200 before:to-indigo-500',
        dateText: 'text-indigo-300 font-bold font-mono text-xs',
        weatherIcon: 'text-indigo-400',
        weatherHigh: 'text-white',
        weatherLow: 'text-indigo-450',
        cardBg: 'bg-gradient-to-br from-indigo-950/20 to-slate-950/25 border-indigo-505/25 shadow-[0_4px_30px_rgba(99,102,241,0.03),inset_0_1px_1px_rgba(99,102,241,0.1)]',
        phaseName: 'Return Journey Home',
        phaseColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10'
      };
    }
  }
  // Fallback for extreme cases
  return {
    accentLine: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-slate-500',
    dateText: 'text-slate-400 font-bold',
    weatherIcon: 'text-slate-405',
    weatherHigh: 'text-slate-100',
    weatherLow: 'text-slate-400',
    cardBg: 'bg-slate-900/20 border-slate-750 shadow-md',
    phaseName: 'Travel segment',
    phaseColor: 'text-slate-400 border-slate-700 bg-slate-800/10'
  };
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 24
    }
  }
};

function getActivityCategory(iconType?: string): 'Sights' | 'Food' | 'Transit' | 'Unclassified' {
  if (iconType === 'food') return 'Food';
  if (iconType === 'unclassified') return 'Unclassified';
  if (iconType === 'transfer' || iconType === 'ship') return 'Transit';
  return 'Sights';
}

function isChurchActivity(title: string, desc?: string, loc?: string, date?: string) {
  if (date && (date.includes('June 18') || date.includes('June 19'))) {
    return false;
  }
  const text = `${title} ${desc || ''} ${loc || ''}`.toLowerCase();
  return text.includes('church') || 
         text.includes('chiesa') || 
         text.includes('cathedral') || 
         text.includes('cattedrale') || 
         text.includes('basilica') || 
         text.includes('mass') || 
         text.includes('monastero') || 
         text.includes('abbey') || 
         text.includes('catacomb') || 
         text.includes('duomo');
}

function getWeatherMeta(detail: string) {
  const text = detail.toLowerCase();
  
  if (text.includes('hot') || text.includes('sicily is hot') || text.includes('86°f') || text.includes('84°f') || text.includes('scirocco')) {
    return {
      glowClass: 'bg-orange-500/10 border-orange-500/30 text-orange-200',
      iconColor: 'text-orange-400',
      ambientGlow: 'shadow-[0_0_15px_rgba(249,115,22,0.12)]',
      icon: <ThermometerSun className="w-5 h-5 text-orange-400 shrink-0 select-none animate-pulse" />,
      labelColor: 'text-orange-350'
    };
  }
  if (text.includes('sunny') || text.includes('mostly sunny') || text.includes('strong sun') || text.includes('clear skies') || text.includes('82°f') || text.includes('83°f')) {
    return {
      glowClass: 'bg-amber-500/10 border-amber-505/35 text-amber-200',
      iconColor: 'text-amber-400',
      ambientGlow: 'shadow-[0_0_15px_rgba(245,158,11,0.12)]',
      icon: <Sun className="w-5 h-5 text-amber-400 shrink-0 select-none animate-pulse" />,
      labelColor: 'text-amber-300'
    };
  }
  if (text.includes('breeze') || text.includes('wind') || text.includes('refreshing')) {
    return {
      glowClass: 'bg-emerald-950/20 border-emerald-500/25 text-emerald-250',
      iconColor: 'text-emerald-400',
      ambientGlow: 'shadow-[0_0_15px_rgba(16,185,129,0.10)]',
      icon: <Wind className="w-5 h-5 text-emerald-400 shrink-0 select-none" />,
      labelColor: 'text-emerald-350'
    };
  }
  if (text.includes('cloud') || text.includes('pleasant day with some')) {
    return {
      glowClass: 'bg-sky-950/15 border-sky-505/25 text-sky-200',
      iconColor: 'text-sky-400',
      ambientGlow: 'shadow-[0_0_12px_rgba(56,189,248,0.08)]',
      icon: <CloudSun className="w-5 h-5 text-sky-450 shrink-0 select-none" />,
      labelColor: 'text-sky-350'
    };
  }
  if (text.includes('shower') || text.includes('rain') || text.includes('precipitation')) {
    return {
      glowClass: 'bg-cyan-950/20 border-cyan-500/25 text-cyan-200',
      iconColor: 'text-cyan-450',
      ambientGlow: 'shadow-[0_0_14px_rgba(56,189,248,0.14)]',
      icon: <CloudRain className="w-5 h-5 text-cyan-400 shrink-0 select-none animate-bounce" />,
      labelColor: 'text-cyan-300'
    };
  }
  
  // Default fallback
  return {
    glowClass: 'bg-slate-900/30 border-slate-800 text-slate-350',
    iconColor: 'text-teal-400',
    ambientGlow: '',
    icon: <ThermometerSun className="w-5 h-5 text-teal-400 shrink-0" />,
    labelColor: 'text-slate-400'
  };
}

function parseTimeToMinutes(timeStr?: string): number {
  if (!timeStr) return 9999;
  const cleaned = timeStr.trim().toLowerCase();
  
  // Try matching HH:MM or H:MM (e.g. 10:30, 09:00, 14:00, 9 AM, 1:30 PM, etc)
  const timeRegex = /(\d{1,2}):(\d{2})\s*(am|pm)?/i;
  const match = cleaned.match(timeRegex);
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const ampm = match[3];
    if (ampm) {
      if (ampm.toLowerCase() === 'pm' && hours < 12) hours += 12;
      if (ampm.toLowerCase() === 'am' && hours === 12) hours = 0;
    }
    return hours * 60 + minutes;
  }
  
  // Support simple AM/PM matching without colon e.g. "9 AM" or "2 PM"
  const ampmRegex = /(\d{1,2})\s*(am|pm)/i;
  const ampmMatch = cleaned.match(ampmRegex);
  if (ampmMatch) {
    let hours = parseInt(ampmMatch[1], 10);
    const ampm = ampmMatch[2].toLowerCase();
    if (ampm === 'pm' && hours < 12) hours += 12;
    if (ampm === 'am' && hours === 12) hours = 0;
    return hours * 60;
  }

  // Fallbacks for descriptors
  if (cleaned.includes('morning')) return 8 * 60; // 08:00
  if (cleaned.includes('noon') || cleaned.includes('lunch')) return 12 * 60; // 12:00
  if (cleaned.includes('afternoon')) return 14 * 60; // 14:00
  if (cleaned.includes('evening') || cleaned.includes('dinner')) return 19 * 60; // 19:00
  if (cleaned.includes('night')) return 21 * 60; // 21:00
  
  return 9999; // fallback high value for anything else
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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Sights' | 'Food' | 'Transit'>('All');
  const [showTransitMap, setShowTransitMap] = useState(false);

  useEffect(() => {
    setActiveCategory('All');
  }, [selectedDate]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedDay = itinerary.find(day => day.date === selectedDate) || itinerary[0];

  const familyActivities = selectedDay.activities?.filter(act => act.isFamilyEvent) || [];
  
  // Planned are other activities with a time
  const plannedActivities = selectedDay.activities?.filter(act => !act.isFamilyEvent && act.time && act.time.trim() !== '') || [];
  const sortedPlannedActivities = [...plannedActivities].sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));

  // Suggested are other activities without a time
  const suggestedActivities = selectedDay.activities?.filter(act => !act.isFamilyEvent && (!act.time || act.time.trim() === '')) || [];
  const filteredSuggestedActivities = suggestedActivities.filter(act => {
    if (activeCategory === 'All') return true;
    return getActivityCategory(act.icon) === activeCategory;
  });

  const hasActivities = selectedDay.activities && selectedDay.activities.length > 0;

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  // Group by month for nice calendar separation
  const juneDays = itinerary.filter(day => day.month === 'June');

  const theme = getDetailsThemeClasses(selectedDay.dayNum, selectedDay.month);

  return (
    <div className="flex flex-col gap-4">
      {/* Calendar Header/Help Banner */}
      <div className="glass-panel p-3.5 flex items-center gap-2.5 bg-indigo-950/20 border-indigo-505/20 text-xs text-indigo-300 leading-relaxed">
        <Info className="w-4 h-4 shrink-0 text-indigo-400" />
        <span>Tap any date below to inspect detailed schedules, lodging details, and live image highlights.</span>
      </div>



      {/* Pocket Calendar Grid Tab */}
      <div className="glass-panel p-3.5 flex flex-col gap-3">
        {/* June Section */}
        <div>
          <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase block mb-2 font-mono">
            June 2026
          </span>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 font-sans">
            {juneDays.map((day) => {
              const isActive = day.date === selectedDate;
              const styleClasses = getDayStyle(day.dayNum, day.month, isActive);
              // Calculate day of the week for June 2026 (Month 5 is June in Date constructor)
              const dateObj = new Date(2026, 5, day.dayNum);
              const weekdayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
              const cityShortName = getCityShortName(day.dayNum, day.month, day.location);
              return (
                <button
                  key={day.date}
                  onClick={() => {
                    triggerHaptic('light');
                    setSelectedDate(day.date);
                  }}
                  className={`flex flex-col items-center justify-between p-2 rounded-lg border text-center transition-all cursor-pointer ${styleClasses}`}
                >
                  <span className="text-[10px] leading-none uppercase tracking-wider font-black flex flex-col items-center gap-0.5">
                    <span className="text-[9px] text-indigo-400 font-extrabold">{weekdayName}</span>
                    <span className="text-[8px] text-slate-550 opacity-80 mt-0.5">{day.date.split(' ')[0].substring(0, 3)}</span>
                  </span>
                  <span className="text-sm font-black mt-1 mb-1 leading-none">{day.dayNum}</span>
                  <span className="text-[9px] font-mono leading-none font-extrabold mb-1">
                    {day.highF}°/{day.lowF}°
                  </span>
                  <span className="text-[8.5px] font-bold text-slate-300 uppercase tracking-tight truncate max-w-full leading-none pt-0.5 border-t border-slate-700/30 w-full">
                    {cityShortName}
                  </span>
                </button>
              );
            })}

            {/* Interactive Route Map Trigger Grid Button */}
            <button
              onClick={() => {
                triggerHaptic('medium');
                setShowTransitMap(true);
              }}
              className="col-span-3 sm:col-span-1 flex flex-row sm:flex-col items-center justify-center sm:justify-between p-2 rounded-lg border text-center transition-all cursor-pointer bg-gradient-to-br from-emerald-950/20 to-teal-950/20 border-emerald-500/30 hover:from-emerald-950/35 hover:to-teal-950/35 hover:border-emerald-500/60 text-emerald-400 hover:text-emerald-300 hover:scale-[1.02] active:scale-98 shadow-md gap-3 sm:gap-1.5"
              title="Open Interactive Mediterranean Cruise Map"
              id="open-transit-map-grid"
            >
              <div className="flex flex-col items-start sm:items-center">
                <span className="text-[9px] text-emerald-300 font-extrabold font-mono tracking-wider leading-none">MSC DECK</span>
                <span className="text-[8px] text-slate-500 font-mono tracking-wider mt-0.5 leading-none">TRACKER</span>
              </div>
              <Compass className="w-5 h-5 text-emerald-400 shrink-0 select-none animate-spin-slow my-0 sm:my-1.5" />
              <span className="text-[8.5px] font-bold text-emerald-300 uppercase tracking-tight truncate max-w-full leading-none py-0.5 sm:pt-1 sm:border-t sm:border-emerald-500/20 w-fit sm:w-full">
                Route Map
              </span>
            </button>
          </div>
        </div>
        
        {/* Footnote about historical temperatures */}
        <p className="text-[10px] sm:text-xs text-amber-400 italic text-center font-semibold mt-2.5">
          * Displayed temperatures reflect historical weather data. See button in top left of screen for real-time weather data.*
        </p>
      </div>

      {/* Selected Day Details Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay.date}
          initial={{ opacity: 0, y: 15, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className={`rounded-xl p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden border backdrop-blur-[10px] transition-all duration-300 shadow-xl ${theme.cardBg} ${theme.accentLine}`}
        >
          {/* Header metadata summary */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`${theme.dateText} font-black text-xs sm:text-sm uppercase tracking-widest font-mono`}>
                  {selectedDay.date}
                </span>
                <span className={`inline-flex items-center text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded border ${theme.phaseColor} tracking-wider leading-none shadow-sm`}>
                  {theme.phaseName}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1.5 uppercase tracking-tight">
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
            <motion.div 
              initial={{ opacity: 0, height: 0, scale: 0.96 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-red-950/20 border border-red-500/30 p-3 rounded-xl flex items-start gap-2 text-xs text-red-200 overflow-hidden"
            >
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-extrabold uppercase tracking-wide text-red-300">Important Advisory:</span>
                <span className="mt-0.5 font-medium leading-relaxed">{selectedDay.warning}</span>
              </div>
            </motion.div>
          )}

          {/* Modesty Warning Daily Reminder Banner */}
          {selectedDay.activities?.some(act => isChurchActivity(act.title, act.description, act.location, selectedDay.date)) && (
            <motion.div 
              initial={{ opacity: 0, height: 0, scale: 0.96 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-amber-950/20 border border-amber-500/30 p-3 rounded-xl flex items-start gap-2 text-xs text-amber-200 overflow-hidden text-left"
            >
              <span className="text-base shrink-0 select-none">⛪</span>
              <div className="flex flex-col">
                <span className="font-extrabold uppercase tracking-wide text-amber-300">Modesty Check Rule Reminder:</span>
                <span className="mt-0.5 font-medium leading-relaxed">Today's schedule covers historic churches or religious sites. Please ensure shoulders and knees are covered (no sleeveless shirts, short shorts, or short skirts) before departing the hotel.</span>
              </div>
            </motion.div>
          )}

          {/* Lodging & Accommodation Highlight */}
          {selectedDay.hotel && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.08, type: 'spring', stiffness: 280, damping: 22 }}
              className="bg-gradient-to-br from-emerald-950/10 via-slate-900/40 to-slate-950/50 p-4 rounded-xl border border-emerald-500/20 flex flex-col gap-2.5"
            >
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
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedDay.hotel.coordinates || (selectedDay.hotel.name + ', ' + selectedDay.hotel.address))}`}
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
            </motion.div>
          )}

          {/* Daily Schedule Events Timeline */}
          <div>
            {/* Render Family Activities at the VERY TOP of the activities section */}
            {familyActivities.length > 0 && (
              <div className="flex flex-col gap-3 mb-6">
                <span className="text-amber-400/80 font-extrabold uppercase tracking-widest text-[9px] block border-b border-slate-800/80 pb-2">
                  Family Feature Day Spotlight
                </span>
                {familyActivities.map((activity, index) => {
                  const isAtSeaDay = selectedDay.dayNum === 27 && selectedDay.month === 'June';
                  const searchQuery = [
                    activity.title,
                    activity.location,
                    selectedDay.location !== 'AT SEA' ? selectedDay.location : null
                  ].filter(Boolean).join(', ');

                  return (
                    <motion.div 
                      key={`family-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 relative z-10"
                    >
                      {/* Visual icon badge step */}
                      <div className="w-9 h-9 rounded-xl bg-slate-950 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(234,179,8,0.1)]">
                        {getActivityIcon(activity.icon)}
                      </div>

                      {/* Timeline card activity */}
                      <div className="flex-1 p-4 rounded-xl bg-amber-950/15 border-2 border-amber-400 shadow-[0_0_15px_rgba(234,179,8,0.15)] ring-1 ring-amber-400/20 flex flex-col gap-1.5 transition-all">
                        {/* Family Event Heading Block */}
                        <div className="flex items-center gap-1.5 bg-amber-400/10 text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-amber-400/25 w-fit mb-1 shadow-sm leading-none">
                          <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                          <span>FAMILY EVENT</span>
                        </div>

                        {isChurchActivity(activity.title, activity.description, activity.location, selectedDay.date) && (
                          <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/40 text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-300 px-2.5 py-1 rounded-md w-fit mb-1 animate-pulse leading-none shadow-sm">
                            <span>⛪ Modesty Check: Cover shoulders & knees!</span>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="font-bold text-amber-200 text-base pr-9 sm:pr-0">
                            <InteractiveText text={activity.title} disableLinks={isAtSeaDay} />
                          </h4>
                          
                          {activity.time && (
                            <span className="font-mono text-[11px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest shrink-0 self-start sm:self-center shadow-[0_0_8px_rgba(245,158,11,0.08)]">
                              {activity.time}
                            </span>
                          )}
                        </div>

                        <p className="text-xs leading-relaxed font-normal text-amber-100/90">
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
                          <div className="mt-1 flex items-center gap-1.5 text-[11px] font-extrabold px-2.5 py-1 rounded-md w-fit font-sans text-amber-300 bg-amber-400/10 border border-amber-400/20">
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
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-lg border transition-all cursor-pointer bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border-amber-400/35 hover:border-amber-400/65 shadow-sm"
                              id={`img-search-family-${index}`}
                            >
                              <Camera className="w-3.5 h-3.5" />
                              <span>IMAGE HIGHLIGHTS</span>
                            </a>
                            
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.coordinates || searchQuery)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              referrerPolicy="no-referrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-lg border transition-all cursor-pointer bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border-amber-400/35 hover:border-amber-400/65 shadow-sm"
                              id={`map-link-family-${index}`}
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              <span>OPEN MAPS</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Planned Activities Section */}
            {sortedPlannedActivities.length > 0 && (
              <div className="flex flex-col gap-3 mb-6">
                <span className="text-slate-400 font-extrabold uppercase tracking-widest text-[9px] block border-b border-slate-800 pb-2">
                  Planned Activities
                </span>

                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-3 relative mt-1"
                >
                  {/* Visual vertical lineage line connector */}
                  <div className="absolute top-2 bottom-2 left-[18px] w-0.5 bg-slate-850"></div>

                  {sortedPlannedActivities.map((activity, index) => {
                    const isAtSeaDay = selectedDay.dayNum === 27 && selectedDay.month === 'June';
                    const searchQuery = [
                      activity.title,
                      activity.location,
                      selectedDay.location !== 'AT SEA' ? selectedDay.location : null
                    ].filter(Boolean).join(', ');

                    return (
                      <motion.div 
                        key={`planned-${index}`} 
                        variants={staggerItem}
                        className="flex gap-4 relative z-10 group"
                      >
                        {/* Visual icon badge step */}
                        <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center shrink-0 group-hover:border-slate-700 transition-colors">
                          {getActivityIcon(activity.icon)}
                        </div>

                        {/* Timeline card activity */}
                        <div className="flex-1 p-4 rounded-xl bg-slate-950/40 border border-slate-900 group-hover:border-slate-800 transition-all flex flex-col gap-1.5">
                          {isChurchActivity(activity.title, activity.description, activity.location, selectedDay.date) && (
                            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-400 px-2.5 py-1 rounded-md w-fit mb-1 animate-pulse leading-none shadow-sm">
                              <span>⛪ Modesty Check: Cover shoulders & knees!</span>
                            </div>
                          )}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-sans">
                            <h4 className="font-extrabold text-sm pr-9 sm:pr-0 text-slate-100">
                              <InteractiveText text={activity.title} disableLinks={isAtSeaDay} />
                            </h4>
                            
                            {activity.time && (
                              <span className="font-mono text-[11px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase tracking-widest shrink-0 self-start sm:self-center shadow-[0_0_8px_rgba(99,102,241,0.08)]">
                                {activity.time}
                              </span>
                            )}
                          </div>

                          <p className="text-xs leading-relaxed font-normal text-slate-400">
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
                            <div className="mt-1 flex items-center gap-1.5 text-[11px] font-extrabold px-2.5 py-1 rounded-md w-fit font-sans text-rose-450 bg-rose-500/10 border border-rose-500/20">
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
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-lg border border-orange-500/20 hover:border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition-all cursor-pointer font-bold"
                                id={`planned-img-search-${index}-${activity.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                              >
                                <Camera className="w-3.5 h-3.5" />
                                <span>IMAGE HIGHLIGHTS</span>
                              </a>
                              
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.coordinates || searchQuery)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                referrerPolicy="no-referrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-lg border border-indigo-500/20 hover:border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-all cursor-pointer"
                                id={`planned-map-link-${index}-${activity.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                              >
                                <MapPin className="w-3.5 h-3.5" />
                                <span>OPEN MAPS</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            )}

            {/* Suggested Activities Section */}
            {suggestedActivities.length > 0 && (
              <div>
                <span className="text-slate-400 font-extrabold uppercase tracking-widest text-[9px] block mb-4 border-b border-slate-800 pb-2">
                  Suggested Activities
                </span>

              {hasActivities && (
                <div className="flex flex-col gap-3">
                  {/* Category Filter Chips Bar */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 bg-slate-950/25 p-2.5 rounded-xl border border-slate-800/40 mb-1">
                    <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase font-mono pl-1">
                      Daily Suggestions in {getCityShortName(selectedDay.dayNum, selectedDay.month, selectedDay.location)}:
                    </span>
                    
                    <div className="flex gap-1.5 overflow-x-auto pb-0.5 pt-0.5 scrollbar-none shrink-0 px-1">
                      {(['All', 'Sights', 'Food'] as const).map((cat) => {
                        const isActive = cat === activeCategory;
                        let catIcon = <Compass className="w-3.5 h-3.5" />;
                        if (cat === 'Sights') catIcon = <Camera className="w-3.5 h-3.5" />;
                        if (cat === 'Food') catIcon = <Utensils className="w-3.5 h-3.5" />;

                        const isEmeraldDay = selectedDay.month === 'June' && selectedDay.dayNum >= 18 && selectedDay.dayNum <= 22;
                        const activeBtnStyle = isEmeraldDay
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-500/5 font-extrabold'
                          : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-md shadow-indigo-500/5 font-extrabold';

                        return (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border leading-none ${
                              isActive 
                                ? activeBtnStyle 
                                : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:bg-slate-850 hover:text-slate-200'
                            }`}
                          >
                            {catIcon}
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Filtered suggestions list */}
                  {filteredSuggestedActivities.length > 0 ? (
                    <motion.div 
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-col gap-3 relative mt-1"
                    >
                      {/* Visual vertical lineage line connector */}
                      <div className="absolute top-2 bottom-2 left-[18px] w-0.5 bg-slate-850"></div>

                      {filteredSuggestedActivities.map((activity, index) => {
                        const isAtSeaDay = selectedDay.dayNum === 27 && selectedDay.month === 'June';
                        const searchQuery = [
                          activity.title,
                          activity.location,
                          selectedDay.location !== 'AT SEA' ? selectedDay.location : null
                        ].filter(Boolean).join(', ');

                        return (
                          <motion.div 
                            key={index} 
                            variants={staggerItem}
                            className="flex gap-4 relative z-10 group"
                          >
                            {/* Visual icon badge step */}
                            <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center shrink-0 group-hover:border-slate-700 transition-colors">
                              {getActivityIcon(activity.icon)}
                            </div>

                            {/* Timeline card activity */}
                            <div className="flex-1 p-4 rounded-xl bg-slate-950/40 border border-slate-900 group-hover:border-slate-800 transition-all flex flex-col gap-1.5">
                              {isChurchActivity(activity.title, activity.description, activity.location, selectedDay.date) && (
                                <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-400 px-2.5 py-1 rounded-md w-fit mb-1 animate-pulse leading-none shadow-sm">
                                  <span>⛪ Modesty Check: Cover shoulders & knees!</span>
                                </div>
                              )}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-sans">
                                <h4 className="font-extrabold text-sm pr-9 sm:pr-0 text-slate-100">
                                  <InteractiveText text={activity.title} disableLinks={isAtSeaDay} />
                                </h4>
                              </div>

                              <p className="text-xs leading-relaxed font-normal text-slate-400">
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
                                <div className="mt-1 flex items-center gap-1.5 text-[11px] font-extrabold px-2.5 py-1 rounded-md w-fit font-sans text-rose-450 bg-rose-500/10 border border-rose-500/20">
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
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-lg border border-orange-500/20 hover:border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition-all cursor-pointer font-bold"
                                    id={`img-search-${index}-${activity.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                  >
                                    <Camera className="w-3.5 h-3.5" />
                                    <span>IMAGE HIGHLIGHTS</span>
                                  </a>
                                  
                                  <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.coordinates || searchQuery)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    referrerPolicy="no-referrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-lg border border-indigo-500/20 hover:border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-all cursor-pointer"
                                    id={`map-link-${index}-${activity.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                  >
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>OPEN MAPS</span>
                                  </a>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <span className="text-slate-500 font-bold text-xs italic block text-center py-6 bg-slate-950/25 border border-slate-900/60 rounded-xl">
                      No suggestions found for category "{activeCategory}" on this day. Explore other tabs!
                    </span>
                  )}
                </div>
              )}
            </div>
            )}

            {!hasActivities && (
              <span className="text-slate-500 font-bold text-xs italic block text-center py-4">No scheduled specific activities listed. Take advantage of leisure time!</span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-indigo-650 hover:bg-indigo-550 text-white shadow-xl shadow-indigo-950/60 border border-indigo-400/40 transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
            title="Back to Top"
            aria-label="Back to top"
            id="back-to-top-button"
          >
            <ArrowUp className="w-5 h-5 shrink-0" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTransitMap && (
          <InteractiveMap 
            selectedDate={selectedDate}
            onSelectDate={(date) => {
              triggerHaptic('light');
              setSelectedDate(date);
            }}
            onClose={() => setShowTransitMap(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
