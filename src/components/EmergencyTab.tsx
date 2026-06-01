import React, { useState } from 'react';
import { Phone, ShieldAlert, Building, Ambulance, Flame, Siren, Copy, Check, ExternalLink, Globe, Smartphone } from 'lucide-react';
import { emergencyContacts } from '../data';

export function EmergencyTab() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }).catch(() => {
      // Fallback
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Failed to copy', err);
      }
      document.body.removeChild(el);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    });
  };

  const renderWhereAreUShortcut = () => (
    <div className="bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-900/40 flex items-center justify-between flex-wrap gap-2 text-[10.5px] text-slate-400">
      <div className="flex items-center gap-1.5">
        <Globe className="w-3.5 h-3.5 text-emerald-400" />
        <span>Digital Calling Option: <strong className="text-slate-300">Open Where Are U App</strong></span>
      </div>
      <div className="flex items-center gap-2">
        <a 
          href="https://apps.apple.com/it/app/where-are-u/id1041845180?l=en" 
          target="_blank" 
          referrerPolicy="no-referrer" 
          className="text-indigo-400 font-bold hover:underline inline-flex items-center gap-0.5"
        >
          iOS <ExternalLink className="w-2.5 h-2.5" />
        </a>
        <span className="text-slate-800">|</span>
        <a 
          href="https://play.google.com/store/apps/details?id=it.areu.whereareu" 
          target="_blank" 
          referrerPolicy="no-referrer" 
          className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-0.5"
        >
          Android <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Primary Emergency Section */}
      <div className="glass-panel p-5 sm:p-6 bg-red-950/20 border-red-500/30">
        <h3 className="text-red-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
          <Phone className="w-4 h-4 text-red-400 animate-pulse" />
          Immediate Assistance
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* EU Emergency 112 Card */}
          <div className="flex flex-col gap-3 p-4 bg-red-950/30 border border-red-900/50 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span className="text-[10px] font-black text-red-200 uppercase tracking-widest">EU Emergency</span>
              </div>
              <button
                onClick={() => handleCopy(emergencyContacts.euEmergency, 'eu')}
                className="p-1 px-2 rounded bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-400 hover:text-slate-200 text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                title="Copy number to clipboard"
              >
                {copiedKey === 'eu' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-500" />
                    Copy Number
                  </>
                )}
              </button>
            </div>
            
            <a 
              href={`tel:${emergencyContacts.euEmergency}`} 
              className="group flex items-center justify-between p-3.5 bg-red-900/40 hover:bg-red-800/50 border border-red-700/40 rounded-xl transition-all font-sans"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-2xl sm:text-3xl font-black text-white group-hover:scale-102 origin-left transition-transform leading-none tracking-tight font-mono">
                  {emergencyContacts.euEmergency}
                </span>
                <span className="text-[10px] font-bold text-red-350 uppercase tracking-wider font-sans">
                  Tap to Dial Naturally
                </span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-full bg-red-500/25 text-red-200 group-hover:bg-red-500/35 transition-all">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-200" />
              </div>
            </a>

            {renderWhereAreUShortcut()}
          </div>

          {/* US Embassy Card */}
          <div className="flex flex-col gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">US Embassy in Italy</span>
              </div>
              <button
                onClick={() => handleCopy(emergencyContacts.usEmbassy, 'us')}
                className="p-1 px-2 rounded bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-400 hover:text-slate-200 text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                title="Copy number to clipboard"
              >
                {copiedKey === 'us' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-500" />
                    Copy Number
                  </>
                )}
              </button>
            </div>

            <a 
              href={`tel:${emergencyContacts.usEmbassy.replace(/\s/g, '')}`} 
              className="group flex items-center justify-between p-3.5 bg-slate-950/30 hover:bg-slate-955/60 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all font-sans"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xl sm:text-2xl font-black text-white group-hover:scale-102 origin-left transition-transform leading-none tracking-tight font-mono">
                  {emergencyContacts.usEmbassy}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                  Tap to Dial Naturally
                </span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-750 font-mono">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
              </div>
            </a>

            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-900 flex flex-col gap-1">
              <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest font-mono flex items-center gap-1">
                <Globe className="w-3 h-3" /> Digital Contact Option:
              </span>
              <p className="text-[10px] text-slate-400 leading-normal">
                Submit emergency citizen requests online 24/7 over standard internet connection via the official <a href="https://it.usembassy.gov/embassy-consulates/rome/acs-navigator/" target="_blank" referrerPolicy="no-referrer" className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-0.5">ACS Navigator <ExternalLink className="w-2.5 h-2.5" /></a>, or use standard VoIP systems (Skype, Viber, Google Voice) to dial.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Local Services Section */}
      <div className="glass-panel p-5 sm:p-6">
        <h3 className="text-slate-300 text-[10px] font-black uppercase tracking-widest mb-4">
          Local Services (Dial or Copy)
        </h3>
        <p className="text-[11px] text-slate-400 leading-relaxed mb-4 border-b border-slate-800/80 pb-3 font-sans">
          Note: Local emergency dialing services are unified through the Single Emergency Service <strong className="text-white font-semibold font-sans">112</strong>, which routes directly to state police, fire departments, or health centers.
        </p>

        <div className="grid grid-cols-1 gap-3.5">
          <ServiceRow 
            name="Polizia di Stato" 
            subtitle="State Police" 
            number="113" 
            icon={<Siren className="w-4 h-4 text-blue-400" />} 
            copiedKey={copiedKey}
            onCopy={handleCopy}
            shortcutRenderer={renderWhereAreUShortcut}
          />
          <ServiceRow 
            name="Vigili del Fuoco" 
            subtitle="Fire Brigade" 
            number="115" 
            icon={<Flame className="w-4 h-4 text-orange-400" />} 
            copiedKey={copiedKey}
            onCopy={handleCopy}
            shortcutRenderer={renderWhereAreUShortcut}
          />
          <ServiceRow 
            name="Emergenza Sanitaria" 
            subtitle="Medical / Ambulance" 
            number="118" 
            icon={<Ambulance className="w-4 h-4 text-rose-400" />} 
            copiedKey={copiedKey}
            onCopy={handleCopy}
            shortcutRenderer={renderWhereAreUShortcut}
          />
        </div>
      </div>
    </div>
  );
}

interface ServiceRowProps {
  name: string;
  subtitle: string;
  number: string;
  icon: React.ReactNode;
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
  shortcutRenderer: () => React.ReactNode;
}

function ServiceRow({ name, subtitle, number, icon, copiedKey, onCopy, shortcutRenderer }: ServiceRowProps) {
  const cKey = `srv-${number}`;
  const isCopied = copiedKey === cKey;

  return (
    <div className="flex flex-col gap-2 p-3 sm:p-4 bg-slate-900/50 rounded-lg border border-slate-800/60 hover:border-slate-750 transition-all">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {icon}
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-200">{name}</span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{subtitle}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Copy button */}
          <button
            onClick={() => onCopy(number, cKey)}
            className="p-1 px-2 rounded bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-[10px] text-slate-400 hover:text-slate-200 font-mono transition-colors cursor-pointer flex items-center gap-1"
            title="Copy number"
          >
            {isCopied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400 animate-in fade-in-20 duration-200" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-slate-500" />
                Copy
              </>
            )}
          </button>

          {/* Natural dial button */}
          <a 
            href={`tel:${number}`} 
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold text-sm rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Dial from phone"
          >
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            {number}
          </a>
        </div>
      </div>

      {shortcutRenderer()}
    </div>
  );
}
