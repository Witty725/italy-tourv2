import { Droplets, Info, Sparkles, CheckCircle2, DollarSign, Clock, HelpCircle, Sun } from 'lucide-react';

export function LaundryStrategy() {
  return (
    <div className="flex flex-col gap-6 mt-8 border-t border-slate-800/80 pt-6">
      {/* Visual Quick Overview Header */}
      <div className="glass-panel p-6 bg-indigo-950/20 border-indigo-500/10 text-center sm:text-left">
        <h3 className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2 mb-3">
          <Droplets className="w-5 h-5 text-emerald-400 animate-pulse" />
          Master Laundry Strategy
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl text-justify sm:text-left">
          Packing light for a 16-day Italian tour is seamless with a structured washing plan. Below is your optimized timeline by travel phase, tracking exactly when and where your garments are cleaned.
        </p>

        {/* Phase Timeline Tracker */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center flex flex-col gap-1">
            <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">Phase 1: Pontremoli</span>
            <span className="text-xs font-extrabold text-slate-100 mt-1">Laundromat Visit</span>
            <span className="text-[10px] font-mono text-slate-500 mt-0.5">June 18 – June 22</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center flex flex-col gap-1">
            <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase">Phase 2: MSC Cruise</span>
            <span className="text-xs font-extrabold text-slate-100 mt-1">Pre-Paid Valet Bag</span>
            <span className="text-[10px] font-mono text-slate-500 mt-0.5">June 23 – June 30</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center flex flex-col gap-1">
            <span className="text-[10px] font-black tracking-widest text-red-400 uppercase">Phase 3: Rome Stay</span>
            <span className="text-xs font-extrabold text-slate-100 mt-1">Hand-Wash / Dry</span>
            <span className="text-[10px] font-mono text-slate-500 mt-0.5">July 1 – July 3</span>
          </div>
        </div>
      </div>

      {/* Spacious Phase Cards */}
      <div className="flex flex-col gap-6">
        {/* Phase 1 Detail Card */}
        <div className="glass-panel p-6 relative overflow-hidden border-l-4 border-emerald-500 bg-emerald-950/5 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/85 pb-4 gap-2">
            <div>
              <span className="text-[9px] font-mono font-black uppercase text-emerald-400 tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">Phase 1</span>
              <h4 className="text-base font-black text-white mt-2">Pontremoli Countryside Estate</h4>
            </div>
            <span className="text-[11px] font-bold text-slate-500 font-mono tracking-wider">June 18 – June 22 • 5 Days</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="flex flex-col gap-2 bg-slate-1000 p-4 rounded-xl border border-slate-850">
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                The Laundry Dilemma
              </span>
              <p className="text-slate-300 leading-relaxed text-xs">
                No laundry options or machines are available on-site at the countryside estate hotel. Self-service is required.
              </p>
            </div>

            <div className="flex flex-col gap-2 bg-slate-1000 p-4 rounded-xl border border-slate-850">
              <span className="text-[10px] font-black tracking-widest uppercase text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Strategic Plan
              </span>
              <div className="flex flex-col gap-2 text-xs text-slate-300">
                <div className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Use nearby self-service laundromat: <a href="https://maps.google.com/?q=Lavanderia+Il+Giglio+Pontremoli" target="_blank" rel="noopener noreferrer" className="font-extrabold text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 underline-offset-2 transition-colors">Lavanderia Il Giglio</a> (Via Sismondo 13/15, approx. 5 min walk).</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Bring compact travel detergent sheets and portable flat sink stoppers from home to wash small items.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2 Detail Card */}
        <div className="glass-panel p-6 relative overflow-hidden border-l-4 border-indigo-500 bg-indigo-950/5 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/85 pb-4 gap-2">
            <div>
              <span className="text-[9px] font-mono font-black uppercase text-indigo-400 tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">Phase 2</span>
              <h4 className="text-base font-black text-white mt-2">MSC Splendida Cruise Segment</h4>
            </div>
            <span className="text-[11px] font-bold text-slate-500 font-mono tracking-wider">June 23 – June 30 • 8 Days</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="flex flex-col gap-2 bg-slate-1000 p-4 rounded-xl border border-slate-850">
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                The Laundry Dilemma
              </span>
              <p className="text-slate-300 leading-relaxed text-xs">
                There are absolutely no self-service washing machine decks on MSC Cruise liners. Placing standard single items can cost €5–€10 per piece.
              </p>
            </div>

            <div className="flex flex-col gap-2 bg-slate-1000 p-4 rounded-xl border border-slate-850">
              <span className="text-[10px] font-black tracking-widest uppercase text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Strategic Plan
              </span>
              <div className="flex flex-col gap-2 text-xs text-slate-300">
                <div className="flex gap-2">
                  <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Pre-purchase the <span className="font-extrabold text-white">"Back Home Clean" (40-Item) Valet Package</span> online on MSC account before the trip for <span className="font-bold text-emerald-400">~$50 - $55</span> total.</span>
                </div>
                <div className="flex gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Fill the laundry bag, hand it to your cabin steward before noon. It is returned clean and ironed 48 hours later.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 3 Detail Card */}
        <div className="glass-panel p-6 relative overflow-hidden border-l-4 border-red-500 bg-red-950/5 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/85 pb-4 gap-2">
            <div>
              <span className="text-[9px] font-mono font-black uppercase text-red-400 tracking-widest bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">Phase 3</span>
              <h4 className="text-base font-black text-white mt-2">Historic Rome Townstay</h4>
            </div>
            <span className="text-[11px] font-bold text-slate-500 font-mono tracking-wider">July 1 – July 3 • 3 Days</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="flex flex-col gap-2 bg-slate-1000 p-4 rounded-xl border border-slate-850">
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                The Laundry Dilemma
              </span>
              <p className="text-slate-300 leading-relaxed text-xs">
                Short 3-day stay in Rome with heavy sightseeing. No dedicated washing machines, and local laundromats consume valuable vacation hours.
              </p>
            </div>

            <div className="flex flex-col gap-2 bg-slate-1000 p-4 rounded-xl border border-slate-850">
              <span className="text-[10px] font-black tracking-widest uppercase text-red-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                Strategic Plan
              </span>
              <div className="flex flex-col gap-2 text-xs text-slate-300">
                <div className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Rely heavily on clean valet clothes from the end of the cruise.</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Perform quick underwear/sock hand-washing in the bathroom sink using travel detergent sheets and a quick-dry sports microtowel to press excess moisture.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Italian Laundry Pro-Tips section */}
      <div className="glass-panel p-6 bg-slate-905/30 border border-slate-800/80 flex flex-col gap-4">
        <h4 className="text-xs font-black uppercase text-amber-400 tracking-widest flex items-center gap-2">
          <Sun className="w-4.5 h-4.5" />
          Pro-Tips for Doing Laundry in Italy
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs text-slate-300 leading-relaxed">
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-950 border border-slate-850">
            <span className="font-extrabold text-white flex items-center gap-1.5 text-xs">
              1. Air-Drying is King 🇮🇹
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed text-justify">
              In Italy, electric tumble dryers are extremely rare due to high electricity costs and architectural rules. Almost everyone uses a folding rack called a <span className="text-slate-200 font-semibold italic">"stendibiancheria"</span>. Look in closets, wardrobes, or balconies for one to dry hand-washed items.
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-950 border border-slate-850">
            <span className="font-extrabold text-white flex items-center gap-1.5 text-xs">
              2. Packing Sheet-Detergent 📦
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed text-justify">
              Never pack liquid laundry bottles—high altitude cabin pressure in flights can cause messy baggage ruptures! Pack laundry sheets instead. They are completely dry, paper-thin, pre-dosed, and dissolve instantly in cold or warm tubs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
