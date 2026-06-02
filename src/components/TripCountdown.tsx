import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TripCountdownProps {
  badgeStyle?: boolean;
}

export function TripCountdown({ badgeStyle = false }: TripCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  function calculateTimeLeft() {
    // June 18, 2026 trip start
    const tripStartDate = new Date('2026-06-18T00:00:00');
    const now = new Date();
    const difference = +tripStartDate - +now;
    
    let isTripStarted = difference <= 0;
    
    if (isTripStarted) {
      // Return details for days count with June 18th being Day 1
      const msInDay = 1000 * 60 * 60 * 24;
      const startOfTodayVal = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfTripVal = new Date(tripStartDate.getFullYear(), tripStartDate.getMonth(), tripStartDate.getDate());
      const daysSinceTripStart = Math.floor((+startOfTodayVal - +startOfTripVal) / msInDay);
      const currentTripDay = daysSinceTripStart >= 0 ? daysSinceTripStart + 1 : 1;
      
      return {
        isTripStarted: true,
        currentTripDay,
        days: 0,
        hours: 0,
        minutes: 0,
      };
    }

    return {
      isTripStarted: false,
      currentTripDay: 0,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  if (badgeStyle) {
    if (timeLeft.isTripStarted) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-emerald-500/20 shadow-sm whitespace-nowrap">
          <Clock className="w-3 h-3 text-emerald-400" />
          Day {timeLeft.currentTripDay}
        </span>
      );
    }

    // Countdown active
    let countdownText = '';
    if (timeLeft.days > 0) {
      countdownText = `${timeLeft.days}d ${timeLeft.hours}h`;
    } else if (timeLeft.hours > 0) {
      countdownText = `${timeLeft.hours}h ${timeLeft.minutes}m`;
    } else {
      countdownText = `${timeLeft.minutes}m`;
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-indigo-500/20 shadow-sm whitespace-nowrap">
        <Clock className="w-3 h-3 text-indigo-455" />
        {countdownText} left
      </span>
    );
  }

  // Fallback / legacy display if badgeStyle is false
  if (timeLeft.isTripStarted) {
    return (
      <div className="glass-panel p-3 mb-6 bg-emerald-950/20 border-emerald-500/30 text-emerald-400 font-bold text-center text-sm uppercase tracking-widest">
        Day {timeLeft.currentTripDay} of the Italian Adventure!
      </div>
    );
  }

  return (
    <div className="glass-panel p-4 mb-6 flex items-center justify-between border-slate-700/50">
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-indigo-400" />
        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Countdown to Italy</span>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-black text-slate-100 leading-none">{timeLeft.days}</span>
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 border-t border-slate-700 pt-0.5">Days</span>
        </div>
        <div className="text-slate-600 font-black text-xl leading-none">:</div>
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-black text-slate-100 leading-none">{timeLeft.hours}</span>
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 border-t border-slate-700 pt-0.5">Hrs</span>
        </div>
        <div className="text-slate-600 font-black text-xl leading-none">:</div>
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-black text-slate-100 leading-none">{timeLeft.minutes}</span>
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 border-t border-slate-700 pt-0.5">Mins</span>
        </div>
      </div>
    </div>
  );
}
