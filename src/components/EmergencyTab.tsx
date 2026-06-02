import React, { useState } from 'react';
import { 
  Phone, 
  ShieldAlert, 
  Building, 
  Ambulance, 
  Flame, 
  Siren, 
  Copy, 
  Check, 
  ExternalLink, 
  Globe, 
  MapPin,
  Smartphone
} from 'lucide-react';

interface CountryConfig {
  id: 'italy' | 'france' | 'spain';
  name: string;
  flag: string;
  generalSos: string;
  embassyName: string;
  embassyPhone: string;
  embassyPhoneCleaned: string;
  embassyAddress: string;
  embassyLink: string;
  digitalCallingText?: string;
  digitalCallingApps?: { name: string; url: string; os: 'ios' | 'android' }[];
  localServices: {
    name: string;
    subtitle: string;
    number: string;
    type: 'police' | 'fire' | 'medical';
  }[];
}

const EMERGENCY_DATA: Record<string, CountryConfig> = {
  italy: {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    generalSos: '112',
    embassyName: 'US Embassy in Rome',
    embassyPhone: '+39 06 46741',
    embassyPhoneCleaned: '+390646741',
    embassyAddress: 'Via Vittorio Veneto, 121, 00187 Rome, Italy',
    embassyLink: 'https://it.usembassy.gov/embassy-consulates/rome/acs-navigator/',
    digitalCallingText: 'Where Are U (Official 112 Italy App)',
    digitalCallingApps: [
      { name: 'iOS App Store', url: 'https://apps.apple.com/it/app/where-are-u/id1041845180?l=en', os: 'ios' },
      { name: 'Google Play', url: 'https://play.google.com/store/apps/details?id=it.areu.whereareu', os: 'android' }
    ],
    localServices: [
      { name: 'Polizia di Stato', subtitle: 'State Police', number: '113', type: 'police' },
      { name: 'Vigili del Fuoco', subtitle: 'Fire Brigade', number: '115', type: 'fire' },
      { name: 'Emergenza Sanitaria', subtitle: 'Medical / Ambulance', number: '118', type: 'medical' }
    ]
  },
  france: {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    generalSos: '112',
    embassyName: 'US Embassy in Paris',
    embassyPhone: '+33 1 43 12 22 22',
    embassyPhoneCleaned: '+33143122222',
    embassyAddress: '2 Avenue Gabriel, 75008 Paris, France',
    embassyLink: 'https://fr.usembassy.gov/services/',
    digitalCallingText: '112 Emergency Location Support',
    localServices: [
      { name: 'Police Nationale', subtitle: 'National Police', number: '17', type: 'police' },
      { name: 'Sapeurs-Pompiers', subtitle: 'Fire Dept (Sapeurs-Pompiers)', number: '18', type: 'fire' },
      { name: 'SAMU (Urgences)', subtitle: 'Medical Emergency (SAMU)', number: '15', type: 'medical' }
    ]
  },
  spain: {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    generalSos: '112',
    embassyName: 'US Embassy in Madrid',
    embassyPhone: '+34 91 587 2200',
    embassyPhoneCleaned: '+34915872200',
    embassyAddress: 'Calle de Serrano, 75, 28006 Madrid, Spain',
    embassyLink: 'https://es.usembassy.gov/u-s-citizen-services/',
    digitalCallingText: 'My112 (Official 112 Spain App)',
    digitalCallingApps: [
      { name: 'iOS App Store', url: 'https://apps.apple.com/es/app/my112/id855112108', os: 'ios' },
      { name: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.telefonica.my112', os: 'android' }
    ],
    localServices: [
      { name: 'Policía Nacional', subtitle: 'National Police', number: '091', type: 'police' },
      { name: 'Bomberos', subtitle: 'Fire Brigade (Bomberos)', number: '080', type: 'fire' },
      { name: 'Urgencias Médicas', subtitle: 'Medical Emergency', number: '061', type: 'medical' }
    ]
  }
};

export function EmergencyTab() {
  const [selectedCountryKey, setSelectedCountryKey] = useState<'italy' | 'france' | 'spain'>('italy');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const currentCountry = EMERGENCY_DATA[selectedCountryKey];

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

  return (
    <div className="flex flex-col gap-5">
      {/* Country Selector Tabs */}
      <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl gap-1">
        {(['italy', 'france', 'spain'] as const).map((countryId) => {
          const config = EMERGENCY_DATA[countryId];
          const isActive = selectedCountryKey === countryId;
          return (
            <button
              key={countryId}
              onClick={() => setSelectedCountryKey(countryId)}
              className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all text-xs font-black uppercase tracking-wider cursor-pointer ${
                isActive 
                  ? 'bg-slate-800 text-white border border-slate-755 shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850 border border-transparent'
              }`}
            >
              <span className="text-sm">{config.flag}</span>
              <span>{config.name}</span>
            </button>
          );
        })}
      </div>

      {/* Primary Emergency Section */}
      <div className="glass-panel p-5 sm:p-6 bg-red-950/20 border-red-500/30">
        <h3 className="text-red-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
          <Phone className="w-4 h-4 text-red-400 animate-pulse" />
          Immediate Assistance ({currentCountry.name})
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* EU Emergency 112 Card */}
          <div className="flex flex-col gap-3 p-4 bg-red-950/30 border border-red-900/50 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span className="text-[10px] font-black text-red-200 uppercase tracking-widest">EU Emergency in {currentCountry.name}</span>
              </div>
              <button
                onClick={() => handleCopy(currentCountry.generalSos, 'eu')}
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
              href={`tel:${currentCountry.generalSos}`} 
              className="group flex items-center justify-between p-3.5 bg-red-900/40 hover:bg-red-800/50 border border-red-700/40 rounded-xl transition-all font-sans"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-2xl sm:text-3xl font-black text-white group-hover:scale-102 origin-left transition-transform leading-none tracking-tight font-mono">
                  {currentCountry.generalSos}
                </span>
                <span className="text-[10px] font-bold text-red-350 uppercase tracking-wider font-sans">
                  Universal Toll-Free Call
                </span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-full bg-red-500/25 text-red-200 group-hover:bg-red-500/35 transition-all">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-200" />
              </div>
            </a>

            {/* Render digital location support shortcut */}
            {currentCountry.digitalCallingApps ? (
              <div className="bg-slate-950/40 px-3 py-2 rounded-lg border border-slate-900/40 flex flex-col gap-1.5 text-[10.5px] text-slate-400">
                <div className="flex items-center gap-1.5 font-bold text-slate-300">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{currentCountry.digitalCallingText}</span>
                </div>
                <div className="flex items-center justify-between bg-slate-950/60 p-1.5 px-2 rounded border border-slate-900">
                  <span className="text-[10px] text-slate-500">Transmits location to responders:</span>
                  <div className="flex items-center gap-1.5">
                    {currentCountry.digitalCallingApps.map((app, idx) => (
                      <a 
                        key={idx}
                        href={app.url} 
                        target="_blank" 
                        referrerPolicy="no-referrer" 
                        className={`font-black hover:underline inline-flex items-center gap-0.5 text-[10px] ${app.os === 'ios' ? 'text-indigo-400' : 'text-emerald-400'}`}
                      >
                        {app.os === 'ios' ? 'iOS' : 'Android'} <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950/30 px-3 py-2.5 rounded-lg border border-slate-900/40 text-[10.5px] text-slate-400 leading-normal">
                <div className="flex items-center gap-1.5 font-bold text-slate-350 mb-1">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>AML (Advanced Mobile Location)</span>
                </div>
                In France, calling 112 automatically transmits your exact GPS location securely to local dispatchers directly from any modern iPhone or Android handset.
              </div>
            )}
          </div>

          {/* US Embassy Card */}
          <div className="flex flex-col gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">{currentCountry.embassyName}</span>
              </div>
              <button
                onClick={() => handleCopy(currentCountry.embassyPhone, 'us')}
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
              href={`tel:${currentCountry.embassyPhoneCleaned}`} 
              className="group flex items-center justify-between p-3.5 bg-slate-950/30 hover:bg-slate-855/60 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all font-sans"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xl sm:text-2xl font-black text-white group-hover:scale-102 origin-left transition-transform leading-none tracking-tight font-mono">
                  {currentCountry.embassyPhone}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                  Tap to Dial Embassy
                </span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-750 font-mono">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
              </div>
            </a>

            {/* Embassy Address */}
            <div className="bg-slate-950/30 p-2.5 rounded-lg border border-slate-900/60 flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-extrabold text-slate-550 uppercase tracking-widest font-mono">Embassy Address</span>
                <p className="text-[11px] text-slate-300 leading-normal font-sans font-semibold">
                  {currentCountry.embassyAddress}
                </p>
              </div>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-900 flex flex-col gap-1">
              <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest font-mono flex items-center gap-1">
                <Globe className="w-3 h-3" /> Digital Contact Option:
              </span>
              <p className="text-[10px] text-slate-400 leading-normal">
                Submit emergency citizen requests online 24/7 or access official support pages for citizens: <a href={currentCountry.embassyLink} target="_blank" referrerPolicy="no-referrer" className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-0.5">Embassy ACS Gateway <ExternalLink className="w-2.5 h-2.5" /></a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Local Services Section */}
      <div className="glass-panel p-5 sm:p-6">
        <h3 className="text-slate-300 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-1.5">
          <Siren className="w-4 h-4 text-indigo-400 animate-pulse" />
          Local Emergency Services (Selected Country)
        </h3>
        <p className="text-[11px] text-slate-400 leading-relaxed mb-4 border-b border-slate-800/80 pb-3 font-sans">
          Note: Local emergency dialing services are unified through the Single Emergency Service <strong className="text-white font-semibold font-sans">112</strong>, which routes directly to state police, fire departments, or health centers. Hand-dialing direct numbers can optionally connect you faster to local dispatches.
        </p>

        <div className="grid grid-cols-1 gap-3.5">
          {currentCountry.localServices.map((service, index) => (
            <ServiceRow 
              key={index}
              name={service.name} 
              subtitle={service.subtitle} 
              number={service.number} 
              type={service.type}
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ServiceRowProps {
  key?: React.Key;
  name: string;
  subtitle: string;
  number: string;
  type: 'police' | 'fire' | 'medical';
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}

function ServiceRow({ name, subtitle, number, type, copiedKey, onCopy }: ServiceRowProps) {
  const cKey = `srv-${number}`;
  const isCopied = copiedKey === cKey;

  const getIcon = (t: 'police' | 'fire' | 'medical') => {
    switch (t) {
      case 'police': return <Siren className="w-4 h-4 text-blue-400" />;
      case 'fire': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'medical': return <Ambulance className="w-4 h-4 text-rose-400" />;
      default: return <ShieldAlert className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3 sm:p-4 bg-slate-900/50 rounded-lg border border-slate-800/60 hover:border-slate-750 transition-all">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {getIcon(type)}
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
    </div>
  );
}
