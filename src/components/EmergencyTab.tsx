import React from 'react';
import { Phone, ShieldAlert, Building, Ambulance, Flame, Siren } from 'lucide-react';
import { emergencyContacts } from '../data';

export function EmergencyTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="glass-panel p-5 sm:p-6 bg-red-950/20 border-red-500/30">
        <h3 className="text-red-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          Immediate Assistance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href={`tel:${emergencyContacts.euEmergency}`} className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 bg-red-900/40 hover:bg-red-800/50 border border-red-700/50 rounded-xl transition-all group">
            <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 group-hover:scale-110 transition-transform" />
            <span className="text-xl sm:text-2xl font-black text-white">{emergencyContacts.euEmergency}</span>
            <span className="text-[10px] sm:text-xs font-bold text-red-200 uppercase tracking-widest text-center">EU Emergency</span>
          </a>
          
          <a href={`tel:${emergencyContacts.usEmbassy.replace(/\s/g, '')}`} className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700 rounded-xl transition-all group">
            <Building className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-lg sm:text-xl font-black text-white">{emergencyContacts.usEmbassy}</span>
            <span className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase tracking-widest text-center">US Embassy Rome</span>
          </a>
        </div>
      </div>
      
      <div className="glass-panel p-5 sm:p-6">
        <h3 className="text-slate-300 text-[10px] font-black uppercase tracking-widest mb-4">
          Local Services
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <ServiceRow name="Polizia di Stato" subtitle="State Police" number="113" icon={<Siren className="w-4 h-4 text-blue-400" />} />
          <ServiceRow name="Vigili del Fuoco" subtitle="Fire Brigade" number="115" icon={<Flame className="w-4 h-4 text-orange-400" />} />
          <ServiceRow name="Emergenza Sanitaria" subtitle="Medical / Ambulance" number="118" icon={<Ambulance className="w-4 h-4 text-rose-400" />} />
        </div>
      </div>
    </div>
  );
}

function ServiceRow({ name, subtitle, number, icon }: { name: string, subtitle: string, number: string, icon: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-900/50 rounded-lg border border-slate-800/60 hover:bg-slate-800/60 transition-colors">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-200">
          {icon}
          {name}
        </div>
        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 uppercase tracking-widest ml-6">{subtitle}</span>
      </div>
      <a href={`tel:${number}`} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-800 rounded-md border border-slate-700 text-slate-200 font-mono font-bold text-sm sm:text-base hover:bg-slate-700 hover:text-white transition-colors">
        {number}
      </a>
    </div>
  );
}
