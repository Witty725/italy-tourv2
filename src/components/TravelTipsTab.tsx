import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Utensils, Coffee, CircleDollarSign, Train, Users, CreditCard, Ship, Lightbulb, Heart, MapPin } from 'lucide-react';

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

  const toggleCategory = (id: string) => {
    setActiveCategory(activeCategory === id ? null : id);
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
                    {category.items.map((item, idx) => (
                      <div key={idx} className="bg-slate-950/50 p-3 rounded-lg border border-slate-800/80">
                        <h4 className="text-teal-300 font-bold text-[13px] sm:text-sm mb-1.5">{item.title}</h4>
                        <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed">{item.content}</p>
                      </div>
                    ))}
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
