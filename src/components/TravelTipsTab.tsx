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
        title: '1. Hotel Napoleon (Pontremoli) — Essential First Tip',
        content: '• This hotel offers free Wi-Fi for all guests.\n• Ask for connection information at check-in and use as a zero-cost base for maps, emails, and video calls.'
      },
      {
        title: '2. Carrier International Plans & The Cruise Ship Satellite Trap',
        isCarrierTrap: true,
        content: '• At-Sea Satellite: Standard land-based global travel passes do not cover at-sea maritime satellite cellular networks (such as "Cellular at Sea"). Connecting here without specific cruise passes leads to extremely expensive pay-as-you-go billing rates.\n• Basic Guard: Keep cellular data roaming disabled or stay in Airplane Mode entirely while sailing.'
      },
      {
        title: '3. Critical Safeguard: Preventing Hidden Background Data Triggers',
        device: 'iphone',
        content: '• Airplane Mode State: Keep active as your baseline. Manually enable just WiFi when needed.\n• Low Data Mode: Navigate to Settings → Cellular → Cellular Data Options and toggle Low Data Mode to ON to disable background tasks.\n• Background Refresh: Disable entirely via Settings → General → Background App Refresh → OFF.\n• System Pause: Turn off automated iCloud Photo backup under Settings → [Your Name] → iCloud → Photos and click Pause Mobile Syncing.'
      },
      {
        title: '3. Critical Safeguard: Preventing Hidden Background Data Triggers',
        device: 'android',
        content: '• Airplane Mode State: Keep active as your baseline. Turn on WiFi separately when in range.\n• Data Saver Mode: Navigate to Settings → Network & internet → Data Saver and toggle ON.\n• Stop Auto-Updates: Open Google Play Store -> tap profile -> Settings -> Network Preferences -> Auto-update apps -> Choose "Don\'t auto-update".\n• Restrict Bad Apps: Go to Settings -> Apps -> select problematic app (like Photos/Drive) -> Battery -> Choose "Restricted".'
      },
      {
        title: '4. Local Public WiFi Etiquette & Access Phrases',
        isInteractivePhrases: true,
        content: '• Accessible Hotspots: Common wireless networks can routinely be found at central piazzas, local cafes, bars, and traditional trattorias.\n• Order First: It is standard courtesy to purchase a small item (such as an espresso) before requesting credentials.'
      },
      {
        title: '5. Cellular Signal Dynamics: Pontremoli & The Surrounding Hills',
        content: '• Town Center: Strong coverage inside Pontremoli. Your US model will automatically roam onto primary Italian networks (TIM, Vodafone, or WindTre) for stable 4G LTE/5G.\n• Tuscan Countryside: Signals in rural hills are highly sparse and weak. Searching for 5G forces your internal radio to run at maximum wattage, draining your cell battery instantly. Stick to 4G/LTE manually for maximum battery savings.'
      },
      {
        title: '6. How to Manually Force 4G LTE (Instead of 5G)',
        device: 'iphone',
        content: '• iPhone Steps: Navigate to Settings → Cellular → Cellular Data Options → Voice & Data, and select LTE.'
      },
      {
        title: '6. How to Manually Force 4G LTE (Instead of 5G)',
        device: 'android',
        content: '• Galaxy/Samsung: Navigate to Settings → Connections → Mobile networks → Network mode, and choose LTE/3G/2G.\n• Stock Android/Pixel: Navigate to Settings → Network & "internet" → SIMs → Preferred network type, and choose LTE or 4G.'
      },
      {
        title: '7. WiFi Calling, Messaging & Video Apps Abroad',
        content: '• Wi-Fi Calling: Toggle "Wi-Fi Calling" to ON under Settings → Phone (or Connections) BEFORE setting foot outside the US. This allows you to make/receive free calls and texts back to US numbers over any stable Wi-Fi network.\n• iMessage & FaceTime: Communication between Apple devices is entirely free of charge over standard Wi-Fi.\n• WhatsApp Messenger: The undisputed communication king in Europe. Widely used by guides, hotels, and locals. Ensure it is integrated with your US number for free calling/texting over Wi-Fi.\n• Zoom Personal Calls: Zoom video and audio sessions are 100% free of charge on standard personal accounts over Wi-Fi connection. They do not consume cell carrier plan roaming data/minutes.'
      }
    ]
  },
  {
    id: 'phone-battery',
    title: 'Cell Phone Battery Maximization Tips',
    icon: <Battery className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />,
    items: [
      {
        title: '1. System Optimization for iPhone',
        device: 'iphone',
        content: '• Low Power Mode: Keep this permanently active. Engage via Settings → Battery or add to your Control Center swipes.\n• Display Auto-Lock: Drop your standby screen timeout duration down to 30 Seconds under Settings → Display & Brightness.\n• Screen Modalities: Enable system-wide Dark Mode. Turn off Always-On display or Raise to Wake.\n• Location Privacy: Audit Settings → Privacy & Security → Location Services to run only "While Using the App" instead of background.'
      },
      {
        title: '1. System Optimization for Android',
        device: 'android',
        content: '• Power Saving Profile: Toggle "Battery Saver" / "Power Saving Mode" ON under your Quick Settings panel.\n• Adaptive Batterying: Go to Settings → Battery and ensure "Adaptive Battery" or "Adaptive Power Saving" is turned ON.\n• Standby Timers: Set screen standby duration down to 15 or 30 seconds under Display options.\n• Dark Color Prefs: Toggle system-wide Dark Theme to minimize active pixel power drain.'
      },
      {
        title: '2. Practical Field Tactics for Excursion Days',
        content: '• Offline Mapping: Download the complete upcoming local map zones (Tuscany, Rome, or specific cruise ports) directly inside Google Maps or Apple Maps before departing your accommodation\'s Wi-Fi. Passive GPS tracking will pinpoint your position on these maps without triggering battery-hungry mobile cell radio adapters.\n• Network Search Overload: When traversing mountain trails or deep valleys with poor service, your device boosts its radio signal to the absolute limit trying to find a tower, instantly killing your battery. Put your phone in Airplane Mode until you reach reliable coverage.\n• Bring a High-Yield Power Bank: Keep a reliable backup battery in your day bag. Snapping continuous photos, capturing high-def videos, pulling up translation sheets, and tracking directions will quickly deplete your smartphone before late afternoon.'
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
      { title: 'The "Gift" Scam', content: 'In Rome, if someone hands you a rose, a bracelet, or a photo prop, do not take it into your hands. The moment you touch it, they will demand money aggressively. Keep your hands down, say a firm "No, grazie," and keep walking.' }
    ]
  },
  {
    id: 'cruise',
    title: 'MSC Splendida Reality Check',
    icon: <Ship className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />,
    items: [
      { title: 'A Very European Experience', content: 'Unlike American lines (Carnival, Royal Caribbean) where crew members are trained to be hyper-bubbly and conversational, MSC features a more formal, direct, and reserved European style of service. It isn\'t rude; it\'s just a different cultural standard of professionalism.' },
      { title: 'Announcements', content: 'Announcements are made in 5+ languages (Italian, English, French, German, Spanish). Be patient; it takes time to get through them all.' },
      { title: 'Dinner is an Event', content: 'Main dining room dinners on European ships are long, multi-course affairs meant to be savored over two hours. If you want a quick 45-minute meal, stick to the buffet.' }
    ]
  }
];

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
                          Quickly locate medical care in Pontremoli, Rome, or your cruise ports. Tapping any button below opens Google Maps results for the nearest services:
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
                                <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed whitespace-pre-line">{item.content}</p>
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

                              {/* Interactive Carrier Selector is now the FIRST element inside the card */}
                              <div className="bg-slate-900 border border-indigo-500/10 p-3 sm:p-3.5 rounded-xl space-y-3.5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-3 gap-2.5">
                                  <span className="text-[11px] font-black uppercase text-indigo-400 tracking-wider">
                                    Select Your Domestic Carrier:
                                  </span>
                                  <div className="grid grid-cols-3 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto gap-1">
                                    <button 
                                      onClick={() => setSelectedCarrier('att')}
                                      className={`py-1.5 px-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer text-center ${
                                        selectedCarrier === 'att'
                                          ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                                          : 'text-slate-450 hover:text-slate-200'
                                      }`}
                                    >
                                      AT&T
                                    </button>
                                    <button 
                                      onClick={() => setSelectedCarrier('verizon')}
                                      className={`py-1.5 px-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer text-center ${
                                        selectedCarrier === 'verizon'
                                          ? 'bg-rose-600 text-white font-extrabold shadow-sm'
                                          : 'text-slate-455 hover:text-slate-200'
                                      }`}
                                    >
                                      Verizon
                                    </button>
                                    <button 
                                      onClick={() => setSelectedCarrier('tmobile')}
                                      className={`py-1.5 px-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer text-center ${
                                        selectedCarrier === 'tmobile'
                                          ? 'bg-pink-600 text-white font-extrabold shadow-sm'
                                          : 'text-slate-455 hover:text-slate-200'
                                      }`}
                                    >
                                      T-Mobile
                                    </button>
                                  </div>
                                </div>

                                {selectedCarrier === 'att' && (
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-start gap-2">
                                      <span className="text-amber-400 font-bold text-xs sm:text-[13px]">AT&T International/Cruise Pass</span>
                                      <span className="text-[9px] bg-amber-400/10 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 uppercase font-black tracking-wider text-center shrink-0">
                                        $20/Day
                                      </span>
                                    </div>
                                    <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed">
                                      At-sea usage on over 400 participating cruise ships runs at a flat <span className="text-amber-300 font-bold">$20/day per device</span>. This gives you unlimited talk and text, but high-speed cellular data is capped at <span className="text-amber-300 font-bold">500MB per day</span>, after which speeds are reduced. Note that land-based global passes (like IDP) do not cover at-sea cellular connections.
                                    </p>
                                    <div className="pt-2 border-t border-slate-800 mt-1">
                                      <a
                                        href="https://www.att.com/international"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-black uppercase tracking-wider group/link"
                                      >
                                        Verify Cruise Ship Coverage
                                        <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                                      </a>
                                    </div>
                                  </div>
                                )}

                                {selectedCarrier === 'verizon' && (
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-start gap-2">
                                      <span className="text-red-400 font-bold text-xs sm:text-[13px]">Verizon Cruise Daily Pass</span>
                                      <span className="text-[9px] bg-red-400/10 text-red-300 px-1.5 py-0.5 rounded border border-red-500/30 uppercase font-black tracking-wider text-center shrink-0">
                                        $20/Day
                                      </span>
                                    </div>
                                    <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed">
                                      At-sea connectivity is handled via a dedicated <span className="text-red-300 font-bold">Verizon Cruise Pass for $20 per line per day</span> (which operates separately from land-based Verizon TravelPass options). It provides unlimited calling/texting with <span className="text-red-300 font-bold">0.5GB (500MB) of high-speed data</span> daily before throttling down to 3G.
                                    </p>
                                    <div className="pt-2 border-t border-slate-800 mt-1">
                                      <a
                                        href="https://www.verizon.com/plans/international"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-black uppercase tracking-wider group/link"
                                      >
                                        Inspect Verizon Cruise Rules
                                        <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                                      </a>
                                    </div>
                                  </div>
                                )}

                                {selectedCarrier === 'tmobile' && (
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-start gap-2">
                                      <span className="text-pink-400 font-bold text-xs sm:text-[13px]">T-Mobile Cruise Roaming</span>
                                      <span className="text-[9px] bg-pink-400/10 text-pink-300 px-1.5 py-0.5 rounded border border-pink-500/30 uppercase font-black tracking-wider text-center shrink-0">
                                        Add-on Req.
                                      </span>
                                    </div>
                                    <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed">
                                      While standard land data roaming is normally free depending on your Go5G tier, <span className="text-pink-300 font-bold">at-sea maritime vessel connections are excluded</span>. You must buy custom T-Mobile ship packages or disable data roaming completely while the ship is in open waters to avoid extreme charges.
                                    </p>
                                    <div className="pt-2 border-t border-slate-800 mt-1">
                                      <a
                                        href="https://www.t-mobile.com/support/plans-features/international-roaming"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs text-pink-400 hover:text-pink-300 font-black uppercase tracking-wider group/link"
                                      >
                                        Check T-Mobile Limits
                                        <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
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
                                <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed whitespace-pre-line">{item.content}</p>
                              </div>
                            </div>
                          );
                        }

                        // Default styled tip item
                        return (
                          <div key={idx} className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
                            <h4 className="text-teal-300 font-bold text-[13px] sm:text-sm mb-1.5">{item.title}</h4>
                            <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed whitespace-pre-line">{item.content}</p>
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
