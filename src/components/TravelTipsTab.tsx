import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Utensils, 
  Coffee, 
  CircleDollarSign, 
  Train, 
  Users, 
  CreditCard, 
  Ship, 
  Lightbulb, 
  Heart, 
  MapPin,
  Smartphone,
  Wifi,
  Battery,
  Volume2,
  ExternalLink
} from 'lucide-react';

const travelTips = [
  {
    id: 'medical-pharmacy',
    title: 'Medical Help & Pharmacies',
    icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />,
    items: [
      { 
        title: 'Urgent Care Equivalent (Guardia Medica)', 
        content: 'For non-emergency illnesses or injuries when regular doctors are closed (nights, weekends, holidays), look for the "Guardia Medica" (now officially "Continuità Assistenziale"). You can request a home visit or walk in. For tourists, a small fee of €15–€35 usually applies depending on the region. In some popular destinations, tourist-focused "Guardia Medica Turistica" clinics are specifically established to help travelers.' 
      },
      { 
        title: 'Emergency Rooms (Pronto Soccorso) & 112', 
        content: 'For absolute medical emergencies, call 112—the universal European emergency number (free of charge). For immediate care, go to the nearest hospital\'s "Pronto Soccorso" (ER). Italian public healthcare is world-class, and critical emergency procedures are provided regardless of nationality, often entirely free or for a trivial co-pay fee. Always bring your passport and travel insurance details.' 
      },
      { 
        title: 'Pharmacy Hubs vs. US Drugstores', 
        content: 'In Italy, a "Farmacia" (marked by a glowing neon green cross) is not a massive convenience store selling cosmetics, snacks, and groceries. It is a highly professional healthcare shop. Pharmacists ("farmacisti") can check blood pressure, administer rapid tests, recommend effective over-the-counter remedies for specific symptoms, and help locate english-speaking physicians.' 
      },
      { 
        title: 'Shift Pharmacies (Farmacia di Turno)', 
        content: 'By law, every municipality must guarantee round-the-clock pharmacy coverage, even on Sundays, holidays, or overnight. This is organized via "Farmacia di Turno" (Shift Pharmacies) rotation. When nearby shops are closed, look at the luminous bulletin board ("bacheca") near any pharmacy door; it is legally required to display the name, location, and phone number of the nearest open shift pharmacy. You can also search online on "farmaciediturno.it".' 
      },
      { 
        title: 'Bringing Prescriptions from Home', 
        content: 'Avoid using broad brand names (like "Tylenol" or "Motrin") when questioning pharmacists—instead, specify the generic substance names ("paracetamolo" for Tylenol/Acetaminophen, "ibuprofene" for Motrin/Advil). Carry your original home prescriptions and keep pills in their original labeled bottles.' 
      }
    ]
  },
  {
    id: 'phone-service',
    title: 'Cell Phone & WiFi Abroad',
    icon: <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />,
    items: [
      {
        title: '1. Hotel Napoleon Free Wi-Fi',
        content: '• Free Wi-Fi: Hotel Napoleon offers free wireless connection to all guests.\n• Zero-Cost Base: Secure WiFi key at check-in. Use as your free starting base to look up daily maps, chat, and download files.'
      },
      {
        title: '2. Carrier Plans & Cruise Satellite Danger',
        isCarrierTrap: true,
        content: '• Satellite Trap: Standard cellular passes do NOT cover at-sea networks (e.g. "Cellular at Sea").\n• Cost Danger: Cruises charge astronomical satellite data rates. Turn roaming OFF or toggle Airplane Mode.'
      },
      {
        title: '3. Stop iPhone Background Data',
        device: 'iphone',
        content: '• Low Data Mode: Settings → Cellular → Cellular Data Options → Turn ON (pauses automatic updates).\n• App Refresh: Settings → General → Background App Refresh → Toggle OFF.\n• iCloud Sync: Settings → [Your Name] → iCloud → Photos → Toggle mobile syncing tool to OFF.'
      },
      {
        title: '3. Stop Android Background Data',
        device: 'android',
        content: '• Data Saver: Settings → Network & internet → Data Saver → Toggle ON.\n• App Updates: Play Store app → Profile → Settings → Set Network Preferences to Don\'t auto-update.\n• Restrict Apps: Settings → Apps → Select Photos/Drive → Battery → Choose Restricted.'
      },
      {
        title: '4. Public Wi-Fi Courtesies',
        isInteractivePhrases: true,
        content: '• Hotspots: Common at central squares. Order a small coffee before asking for Wi-Fi codes.\n• Safety Rules: Avoid logging into sensitive bank cards or passwords over public unsecured hotspots.'
      },
      {
        title: '5. Countryside Signal Sparking',
        content: '• Town Reception: Fast 4G/5G coverage around Pontremoli center on partner grids.\n• Rural Valleys: Spotty reception drains battery fast. Lock your device to 4G/LTE mode to prolong battery life.'
      },
      {
        title: '6. Force 4G/LTE (iPhone)',
        device: 'iphone',
        content: '• Toggle LTE: Settings → Cellular → Cellular Data Options → Voice & Data → Select LTE.'
      },
      {
        title: '6. Force 4G/LTE (Android)',
        device: 'android',
        content: '• Samsung: Settings → Connections → Mobile networks → Network mode → Select LTE/3G/2G.\n• Pixel: Settings → Network & internet → SIMs → Preferred network type → Select LTE.'
      },
      {
        title: '7. Free Calls & Messages',
        content: '• Wi-Fi Calling: Enable under phone settings BEFORE departing USA to make free texts/calls home.\n• FaceTime: Apple iMessage/FaceTime are 100% free over Wi-Fi.\n• WhatsApp: Ideal for international calls. Set up with your US number before you leave.'
      }
    ]
  },
  {
    id: 'phone-battery',
    title: 'Cell Phone Battery Maximization Tips',
    icon: <Battery className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />,
    items: [
      {
        title: '1. Save Battery (iPhone)',
        device: 'iphone',
        content: '• Low Power Mode: Settings → Battery → Turn ON (add as custom slider in Control Center).\n• Auto Lock: Settings → Display & Brightness → Set screen Sleep automatic timeout to 30 Seconds.\n• Dark Mode: Settings → Display & Brightness → Enable Dark Mode (conserves OLED pixel energy).\n• Location Guard: Settings → Privacy & Security → Location Services → set apps to "While Using" only.'
      },
      {
        title: '1. Save Battery (Android)',
        device: 'android',
        content: '• Power Saver: Toggle ON Battery Saver or Power Saving Mode in Quick Settings tiles.\n• Sync Guard: Settings → Battery → Under power options, toggle Adaptive Battery to ON.\n• Auto Lock: Settings → Display → Screen Timeout → Select 15 or 30 seconds delay.\n• Dark Theme: Toggle system-wide Dark Theme to conserve pixel power on OLED models.'
      },
      {
        title: '2. Battery Field Tactics',
        content: '• Offline Maps: Pre-download maps on Wi-Fi. Offline GPS uses zero cellular searching energy.\n• Airplane Mode: Toggle ON in weak coverage areas (high speed trains, tunnels, deep valleys).\n• Portable Pack: Always pack a compact backup power bank to secure top-ups during long excursions.'
      }
    ]
  },
  {
    id: 'dining',
    title: 'Dining & Restaurant Culture',
    icon: <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />,
    items: [
      { title: 'The Tap Water Myth', content: 'Do not ask for tap water (acqua dal rubinetto). While technically safe, restaurants despise this request, and many will flat-out refuse or tell you they only serve bottled. Water is treated like wine—ordered by the bottle as either frizzante (sparkling) or naturale (still). Expect to pay €2–€4 for it.' },
      { title: 'The Bread Mistake', content: 'The bread served at the start of the meal is not an appetizer. It is meant to accompany your main courses or be used for fare la scarpetta (mopping up the leftover sauce on your plate). Furthermore, do not ask for butter or a side dish of olive oil and balsamic vinegar for dipping—that is an American invention.' },
      { title: 'No Parmesan on Seafood', content: 'This is a culinary commandment. Do not ask for parmigiano if your pasta has clams, tuna, or any seafood. It overpowers the delicate flavor, and the chef will take it as an insult.' },
      { title: 'Doggy Bags are Now Okay', content: 'The idea that "doggy bags are rude" is outdated. While still less common than in the US, Italy passed laws to reduce food waste. You can absolutely ask, "Possiamo portarlo via?" (Can we take this to go?).' },
      { title: 'The Myth of the 11:00 AM Cappuccino', content: 'You can order a cappuccino at 4:00 PM if you want to. The actual rule is never order a milky coffee after a meal. Italians believe hot milk wreaks havoc on digestion. If you order a cappuccino after eating a heavy dinner, your waiter will judge you.' }
    ]
  },
  {
    id: 'coffee',
    title: 'Coffee Bar Etiquette',
    icon: <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />,
    items: [
      { title: 'The Dual Pricing System', content: 'This is crucial. If you sit at a table (al tavolo), you pay a premium for the service. If you stand at the bar (al banco), an espresso is usually around €1.20–€1.50.' },
      { title: 'The Workflow', content: 'Look at what the locals are doing when you walk in. In busy city centers or train stations, you must pay at the register first, then take your receipt (scontrino) to the barista to order. In smaller towns, you often drink first and pay at the register on your way out.' },
      { title: 'Just "Un Caffè"', content: 'If you ask for "a coffee," you will get a single shot of espresso. If you want what Americans call "regular coffee," order a Caffè Americano (espresso diluted with hot water).' }
    ]
  },
  {
    id: 'tipping',
    title: 'The 2026 Tipping Truths',
    icon: <CircleDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />,
    items: [
      { title: 'The 15–20% Rule is Forbidden', content: 'Seriously, do not do it. It disrupts the local economy and makes things harder for locals.' },
      { title: '"Coperto" vs. "Servizio"', content: 'Look closely at your menu. Coperto: A standard per-person cover charge (usually €1–€3) that covers the tablecloth, bread, and setting the table. It is legally required to be printed on the menu. Servizio: A service charge (usually 10–15%) typically applied only to large groups or in highly touristy areas.' },
      { title: 'How to Actually Tip', content: 'If service was exceptional and there is no servizio on the bill, leave €1 to €2 per person in cash on the table. If paying by card, there is rarely a line to add a tip, so always keep small euro coins on hand for this.' }
    ]
  },
  {
    id: 'transit',
    title: 'Trains, Taxis, & Transit',
    icon: <Train className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />,
    items: [
      { title: 'Digital vs. Paper Train Tickets', content: 'If you buy a physical paper train ticket at a station kiosk, you must validate it in the green or yellow machines on the platform before boarding. If you don\'t, the conductor will fine you on the spot, and they do not care if you are a tourist. Crucial Update: If you buy a digital ticket (regional trains) via the Trenitalia app, you must check in digitally via the app before departure to validate it.' },
      { title: 'The ZTL Trap', content: 'Historic centers have Zone a Traffico Limitato (ZTL). If you drive a rental car past these signs, cameras photograph your license plate, and you will receive a massive fine in the mail months later.' },
      { title: 'Hailing Taxis', content: 'You cannot wave down a moving taxi in Italy. You must either go to a designated taxi stand (marked with an orange sign or "TAXI" on the pavement) or call one via an app like FreeNow or ItTaxi.' }
    ]
  },
  {
    id: 'social',
    title: 'Social Etiquette & Rhythms',
    icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />,
    items: [
      { title: 'The Crucial Shift to Buonasera', content: 'The moment lunch ends (around 3:00 PM or 4:00 PM), switch to Buonasera.' },
      { title: 'The Power of "Permesso"', content: 'If you need to squeeze past someone on a crowded bus, train, or street, do not say scusa. Say "Permesso" (Permission). It is the most polite way to clear a path.' },
      { title: 'The Afternoon Riposo', content: 'In smaller towns like Pontremoli, shops, churches, and family businesses completely shut down between 1:30 PM and 4:30 PM. Do not expect to run errands during this time. Plan your day around it.' },
      { title: 'Dress Code is About Respect', content: 'Italians practice bella figura (presenting yourself well). Entering a church with bare shoulders or knees isn’t just breaking a rule—it\'s viewed as deeply disrespectful to the locals\' culture and religion. Keep a light scarf in your bag to throw over your shoulders.' }
    ]
  },
  {
    id: 'money',
    title: 'Cash, Cards, & Scams',
    icon: <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />,
    items: [
      { title: 'The "Pos" Law', content: 'By Italian law, all merchants—including taxis, tobacco shops, and cafes—are required to accept credit cards for any amount. However, small businesses hate paying the transaction fees. If you try to pay for a €1.20 espresso with a Visa, expect some eye-rolling. Carry coins for the coffee bars.' },
      { title: 'Atm Traps', content: 'Avoid the standalone ATMs labeled "Euronet" found in heavy tourist areas. They charge predatory conversion fees. Only use official bank ATMs attached to an actual bank building (look for names like Intesa Sanpaolo, Unicredit, or Banco BPM).' },
      { title: 'The "Gift" Scam', content: 'In busy Italian piazzas and tourist hubs, if someone hands you a rose, a bracelet, or a photo prop, do not take it into your hands. The moment you touch it, they will demand money aggressively. Keep your hands down, say a firm "No, grazie," and keep walking.' }
    ]
  },
  {
    id: 'cruise',
    title: 'MSC Splendida Vibe',
    icon: <Ship className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />,
    items: [
      { title: 'A Very European Experience', content: 'Unlike American lines (Carnival, Royal Caribbean) where crew members are trained to be hyper-bubbly and conversational, MSC features a more formal, direct, and reserved European style of service. It isn\'t rude; it\'s just a different cultural standard of professionalism.' },
      { title: 'Announcements', content: 'Announcements are made in 5+ languages (Italian, English, French, German, Spanish). Be patient; it takes time to get through them all.' },
      { title: 'Dinner is an Event', content: 'Main dining room dinners on European ships are long, multi-course affairs meant to be savored over two hours. If you want a quick 45-minute meal, stick to the buffet.' }
    ]
  }
];

function renderFormattedContent(content: string) {
  const lines = content.split('\n');
  return (
    <span className="space-y-1 block">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('•') && trimmed.includes(':')) {
          const bulletIndex = line.indexOf('•');
          const colonIndex = line.indexOf(':');
          if (colonIndex > bulletIndex) {
            const beforeColon = line.substring(bulletIndex + 1, colonIndex).trim();
            const afterColon = line.substring(colonIndex + 1);
            return (
              <span key={i} className="block leading-relaxed">
                • <strong className="underline text-slate-200">{beforeColon}</strong>: {afterColon}
              </span>
            );
          }
        }
        return (
          <span key={i} className="block leading-relaxed">
            {line}
          </span>
        );
      })}
    </span>
  );
}

export function TravelTipsTab() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [phoneType, setPhoneType] = useState<'iphone' | 'android'>('iphone');
  const [selectedCarrier, setSelectedCarrier] = useState<'att' | 'verizon' | 'tmobile'>('att');
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setActiveCategory(activeCategory === id ? null : id);
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'it-IT';
      utterance.rate = 0.85;
      utterance.onstart = () => setSpeakingText(text);
      utterance.onend = () => setSpeakingText(null);
      utterance.onerror = () => setSpeakingText(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setSpeakingText(text);
      setTimeout(() => setSpeakingText(null), 1000);
    }
  };

  return (
    <div className="glass-panel p-4 flex flex-col gap-4">
      <h3 className="text-teal-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
        <Lightbulb className="w-4 h-4" />
        Essential Italy Travel Tips
      </h3>
      
      <div className="flex flex-col gap-3">
        {travelTips.map((category) => (
          <div 
            key={category.id} 
            className="border border-slate-700/60 bg-slate-900/40 rounded-xl overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-800/60 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-teal-500/20 text-teal-400' 
                    : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                }`}>
                  {category.icon}
                </div>
                <span className={`font-bold text-sm sm:text-base transition-colors ${
                  activeCategory === category.id ? 'text-teal-400' : 'text-slate-200'
                }`}>
                  {category.title}
                </span>
              </div>
              <ChevronDown 
                className={`w-5 h-5 transition-transform duration-300 ${
                  activeCategory === category.id ? 'rotate-180 text-teal-400' : 'text-slate-500 group-hover:text-slate-400'
                }`} 
              />
            </button>
            
            <AnimatePresence>
              {activeCategory === category.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 space-y-4 border-t border-slate-700/50 mt-1">
                    {category.id === 'medical-pharmacy' && (
                      <div className="bg-emerald-950/20 border border-emerald-500/25 p-4 rounded-xl flex flex-col gap-3 mt-3.5">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-black uppercase text-emerald-300 tracking-wider">
                            Emergency Map Locators (Italy / Cruise Ports)
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Quickly locate medical care in Pontremoli or your cruise ports. Tapping any button below opens Google Maps results for the nearest services:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                          <a 
                            href="https://www.google.com/maps/search/?api=1&query=farmacia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/25 active:bg-emerald-500/30 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-300 hover:text-emerald-200 text-xs font-black uppercase tracking-wider rounded-lg transition-all text-center shadow-sm"
                            title="Locate nearest pharmacy with green cross"
                          >
                            Nearest Pharmacy
                          </a>
                          <a 
                            href="https://www.google.com/maps/search/?api=1&query=guardia+medica"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/25 active:bg-rose-500/30 border border-rose-500/30 hover:border-rose-500/60 text-rose-300 hover:text-rose-200 text-xs font-black uppercase tracking-wider rounded-lg transition-all text-center shadow-sm"
                            title="Locate nearest walk-in urgent care"
                          >
                            Nearest Urgent Care
                          </a>
                          <a 
                            href="https://www.google.com/maps/search/?api=1&query=pronto+soccorso"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-500/25 active:bg-red-500/30 border border-red-500/30 hover:border-red-500/60 text-red-300 hover:text-red-200 text-xs font-black uppercase tracking-wider rounded-lg transition-all text-center shadow-sm"
                            title="Locate nearest hospital ER"
                          >
                            Nearest ER
                          </a>
                        </div>
                      </div>
                    )}

                    {['phone-service', 'phone-battery'].includes(category.id) && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-950/60 p-3 rounded-xl mt-3 border border-indigo-500/10 gap-3">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-indigo-400 shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-[11px] font-black uppercase text-indigo-300 tracking-wider leading-none mb-0.5">Device Customization</span>
                            <span className="text-[10px] text-slate-400 leading-none">Filter steps specifically for your mobile platform</span>
                          </div>
                        </div>
                        <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800 w-full sm:w-auto">
                          <button 
                            onClick={() => setPhoneType('iphone')}
                            className={`flex-1 sm:flex-initial px-3.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                              phoneType === 'iphone'
                                ? 'bg-indigo-650 text-white shadow-md font-extrabold'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            iPhone
                          </button>
                          <button 
                            onClick={() => setPhoneType('android')}
                            className={`flex-1 sm:flex-initial px-3.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                              phoneType === 'android'
                                ? 'bg-indigo-650 text-white shadow-md font-extrabold'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            Android
                          </button>
                        </div>
                      </div>
                    )}

                    {category.items
                      .filter((item: any) => !item.device || item.device === phoneType)
                      .map((item, idx) => {
                        // Custom Interactive Phrasing Box for Public WiFi etiquette
                        if (item.isInteractivePhrases) {
                          return (
                            <div key={idx} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 space-y-3.5">
                              <div>
                                <h4 className="text-teal-300 font-bold text-[13px] sm:text-sm mb-1.5">{item.title}</h4>
                                <div className="text-slate-400 text-xs sm:text-[13px] leading-relaxed">
                                  {renderFormattedContent(item.content)}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1.5">
                                <div className="bg-slate-900 border border-indigo-500/10 p-3.5 rounded-xl flex flex-col justify-between hover:border-indigo-500/25 transition-all">
                                  <div>
                                    <div className="flex justify-between items-start gap-2 mb-1.5">
                                      <span className="text-emerald-400 font-black text-xs sm:text-[13px] leading-tight">
                                        "Scusi, avete il WiFi gratuito?"
                                      </span>
                                      <button 
                                        onClick={() => playAudio("Scusi, avete il WiFi gratuito?")}
                                        className={`p-1.5 rounded-full border transition-all cursor-pointer flex items-center justify-center shrink-0 shadow ${
                                          speakingText === "Scusi, avete il WiFi gratuito?"
                                            ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400 animate-pulse'
                                            : 'bg-slate-800 hover:bg-emerald-500/15 text-emerald-400 border-slate-700/60'
                                        }`}
                                        title="Play audible Italian pronunciation"
                                      >
                                        <Volume2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-medium italic leading-none mb-1">
                                      skoo-zee, ah-veh-teh eel wee-fee grah-too-ee-to
                                    </p>
                                  </div>
                                  <p className="text-[11px] text-slate-300 font-medium pt-2 border-t border-slate-800/60 mt-1">
                                    Excuse me, do you have free WiFi?
                                  </p>
                                </div>

                                <div className="bg-slate-900 border border-indigo-500/10 p-3.5 rounded-xl flex flex-col justify-between hover:border-indigo-500/25 transition-all">
                                  <div>
                                    <div className="flex justify-between items-start gap-2 mb-1.5">
                                      <span className="text-emerald-400 font-black text-xs sm:text-[13px] leading-tight">
                                        "Posso avere la password del WiFi, per favore?"
                                      </span>
                                      <button 
                                        onClick={() => playAudio("Posso avere la password del WiFi, per favore?")}
                                        className={`p-1.5 rounded-full border transition-all cursor-pointer flex items-center justify-center shrink-0 shadow ${
                                          speakingText === "Posso avere la password del WiFi, per favore?"
                                            ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400 animate-pulse'
                                            : 'bg-slate-800 hover:bg-emerald-500/15 text-emerald-400 border-slate-700/60'
                                        }`}
                                        title="Play audible Italian pronunciation"
                                      >
                                        <Volume2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-medium italic leading-none mb-1">
                                      pos-so ah-veh-reh lah pahs-word del wee-fee, pehr fah-vo-reh
                                    </p>
                                  </div>
                                  <p className="text-[11px] text-slate-300 font-medium pt-2 border-t border-slate-800/60 mt-1">
                                    May I have the WiFi password, please?
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }

                        // Custom Interactive Carrier Profile selector block to prevent word walls
                        if (item.isCarrierTrap) {
                          return (
                            <div key={idx} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 space-y-4">
                              <div>
                                <h4 className="text-teal-300 font-bold text-[13px] sm:text-sm mb-2">{item.title}</h4>
                              </div>

                              {/* Interactive Carrier Selector */}
                              <div className="bg-slate-900 border border-indigo-500/10 p-3 sm:p-3.5 rounded-xl space-y-3">
                                <div className="flex flex-col gap-2 border-b border-slate-800/80 pb-2.5">
                                  <span className="text-[11px] font-black uppercase text-indigo-400 tracking-wider">
                                    Select Your Domestic Carrier:
                                  </span>
                                  <div className="grid grid-cols-3 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full gap-1">
                                    <button 
                                      onClick={() => setSelectedCarrier('att')}
                                      className={`py-1.5 px-1 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer text-center truncate ${
                                        selectedCarrier === 'att'
                                          ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                                          : 'text-slate-400 hover:text-slate-200'
                                      }`}
                                    >
                                      AT&T
                                    </button>
                                    <button 
                                      onClick={() => setSelectedCarrier('verizon')}
                                      className={`py-1.5 px-1 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer text-center truncate ${
                                        selectedCarrier === 'verizon'
                                          ? 'bg-rose-600 text-white font-extrabold shadow-sm'
                                          : 'text-slate-400 hover:text-slate-200'
                                      }`}
                                    >
                                      Verizon
                                    </button>
                                    <button 
                                      onClick={() => setSelectedCarrier('tmobile')}
                                      className={`py-1.5 px-1 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer text-center truncate ${
                                        selectedCarrier === 'tmobile'
                                          ? 'bg-pink-600 text-white font-extrabold shadow-sm'
                                          : 'text-slate-400 hover:text-slate-200'
                                      }`}
                                    >
                                      T-Mobile
                                    </button>
                                  </div>
                                </div>

                                {selectedCarrier === 'att' && (
                                  <div className="space-y-2 text-xs">
                                    <div className="flex justify-between items-start gap-2">
                                      <span className="text-amber-400 font-bold text-xs">AT&T Cruise Pass</span>
                                      <span className="text-[9px] bg-amber-400/10 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 uppercase font-black tracking-wider text-center shrink-0">
                                        $20/Day
                                      </span>
                                    </div>
                                    <div className="text-slate-300 leading-relaxed text-[11px] sm:text-xs space-y-1">
                                      <p>• <b><u>Day Pass</u></b>: Flat <strong className="font-extrabold text-amber-400">$20/day per line</strong> on select vessels.</p>
                                      <p>• <b><u>Data Limits</u></b>: Unlimited talk/text with <b>500MB</b> daily high-speed data, then throttled.</p>
                                      <p>• <b><u>Crucial Note</u></b>: Land plans (like IDP) do <b>NOT</b> cover open water networks.</p>
                                    </div>
                                    <div className="pt-1.5 border-t border-slate-800 mt-1">
                                      <a
                                        href="https://www.att.com/international"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 hover:text-amber-300 font-extrabold uppercase tracking-wider group/link"
                                      >
                                        Verify Cruise Coverage
                                        <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                      </a>
                                    </div>
                                  </div>
                                )}

                                {selectedCarrier === 'verizon' && (
                                  <div className="space-y-2 text-xs">
                                    <div className="flex justify-between items-start gap-2">
                                      <span className="text-red-400 font-bold text-xs">Verizon Cruise Daily Pass</span>
                                      <span className="text-[9px] bg-red-400/10 text-red-300 px-1.5 py-0.5 rounded border border-red-500/30 uppercase font-black tracking-wider text-center shrink-0">
                                        $20/Day
                                      </span>
                                    </div>
                                    <div className="text-slate-300 leading-relaxed text-[11px] sm:text-xs space-y-1">
                                      <p>• <b><u>Day Pass</u></b>: Flat <strong className="font-extrabold text-red-450">$20/day per line</strong> (separate from standard land TravelPass).</p>
                                      <p>• <b><u>Data Limits</u></b>: Unlimited talk/text with <b>0.5GB (500MB)</b> high-speed data, then 3G speeds.</p>
                                    </div>
                                    <div className="pt-1.5 border-t border-slate-800 mt-1">
                                      <a
                                        href="https://www.verizon.com/plans/international"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-[11px] text-red-400 hover:text-red-300 font-extrabold uppercase tracking-wider group/link"
                                      >
                                        Inspect Verizon Cruise Rules
                                        <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                      </a>
                                    </div>
                                  </div>
                                )}

                                {selectedCarrier === 'tmobile' && (
                                  <div className="space-y-2 text-xs">
                                    <div className="flex justify-between items-start gap-2">
                                      <span className="text-pink-400 font-bold text-xs">T-Mobile Cruise Roaming</span>
                                      <span className="text-[9px] bg-pink-400/10 text-pink-300 px-1.5 py-0.5 rounded border border-pink-500/30 uppercase font-black tracking-wider text-center shrink-0">
                                        Add-on Req.
                                      </span>
                                    </div>
                                    <div className="text-slate-300 leading-relaxed text-[11px] sm:text-xs space-y-1">
                                      <p>• <b><u>Exclusion</u></b>: Standalone land free-roaming (Go5G tier) is <b>not active at sea</b>.</p>
                                      <p>• <b><u>Safety Guard</u></b>: Purchase specific cruise add-ons, or keep data roaming <b>disabled</b> to prevent overage.</p>
                                    </div>
                                    <div className="pt-1.5 border-t border-slate-800 mt-1">
                                      <a
                                        href="https://www.t-mobile.com/support/plans-features/international-roaming"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-[11px] text-pink-400 hover:text-pink-300 font-extrabold uppercase tracking-wider group/link"
                                      >
                                        Check T-Mobile Limits
                                        <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                      </a>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Remaining Satellite details placed seamlessly underneath */}
                              <div className="pt-2 border-t border-slate-800/60 mt-1">
                                <span className="text-[10px] font-black uppercase text-indigo-300 tracking-wider block mb-1.5">
                                  At-Sea Maritime Warning:
                                </span>
                                <div className="text-slate-400 text-xs sm:text-[13px] leading-relaxed">
                                  {renderFormattedContent(item.content)}
                                </div>
                              </div>
                            </div>
                          );
                        }

                        // Default styled tip item
                        return (
                          <div key={idx} className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
                            <h4 className="text-teal-300 font-bold text-[13px] sm:text-sm mb-1.5">{item.title}</h4>
                            <div className="text-slate-400 text-xs sm:text-[13px] leading-relaxed">
                              {renderFormattedContent(item.content)}
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
