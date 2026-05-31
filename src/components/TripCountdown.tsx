import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function TripCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  function calculateTimeLeft() {
    // June 18, 2026 trip start
    const difference = +new Date('2026-06-18T00:00:00') - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) {
    return (
      <div className="glass-panel p-3 mb-6 bg-emerald-950/20 border-emerald-500/30 text-emerald-400 font-bold text-center text-sm uppercase tracking-widest">
        The Trip Has Begun!
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
