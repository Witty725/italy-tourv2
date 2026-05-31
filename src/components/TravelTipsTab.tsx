import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Utensils, Coffee, CircleDollarSign, Train, Users, CreditCard, Ship, Lightbulb } from 'lucide-react';

const travelTips = [
  {
    id: 'dining',
    title: 'Dining & Restaurant Culture',
    icon: <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />,
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
    icon: <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />,
    items: [
      { title: 'The Dual Pricing System', content: 'This is crucial. If you sit at a table (al tavolo), you pay a premium for the service. If you stand at the bar (al banco), an espresso is usually around €1.20–€1.50.' },
      { title: 'The Workflow', content: 'Look at what the locals are doing when you walk in. In busy city centers or train stations, you must pay at the register first, then take your receipt (scontrino) to the barista to order. In smaller towns, you often drink first and pay at the register on your way out.' },
      { title: 'Just "Un Caffè"', content: 'If you ask for "a coffee," you will get a single shot of espresso. If you want what Americans call "regular coffee," order a Caffè Americano (espresso diluted with hot water).' }
    ]
  },
  {
    id: 'tipping',
    title: 'The 2026 Tipping Truths',
    icon: <CircleDollarSign className="w-4 h-4 sm:w-5 sm:h-5" />,
    items: [
      { title: 'The 15–20% Rule is Forbidden', content: 'Seriously, do not do it. It disrupts the local economy and makes things harder for locals.' },
      { title: '"Coperto" vs. "Servizio"', content: 'Look closely at your menu. Coperto: A standard per-person cover charge (usually €1–€3) that covers the tablecloth, bread, and setting the table. It is legally required to be printed on the menu. Servizio: A service charge (usually 10–15%) typically applied only to large groups or in highly touristy areas.' },
      { title: 'How to Actually Tip', content: 'If service was exceptional and there is no servizio on the bill, leave €1 to €2 per person in cash on the table. If paying by card, there is rarely a line to add a tip, so always keep small euro coins on hand for this.' }
    ]
  },
  {
    id: 'transit',
    title: 'Trains, Taxis, & Transit',
    icon: <Train className="w-4 h-4 sm:w-5 sm:h-5" />,
    items: [
      { title: 'Digital vs. Paper Train Tickets', content: 'If you buy a physical paper train ticket at a station kiosk, you must validate it in the green or yellow machines on the platform before boarding. If you don\'t, the conductor will fine you on the spot, and they do not care if you are a tourist. Crucial Update: If you buy a digital ticket (regional trains) via the Trenitalia app, you must check in digitally via the app before departure to validate it.' },
      { title: 'The ZTL Trap', content: 'Historic centers have Zone a Traffico Limitato (ZTL). If you drive a rental car past these signs, cameras photograph your license plate, and you will receive a massive fine in the mail months later.' },
      { title: 'Hailing Taxis', content: 'You cannot wave down a moving taxi in Italy. You must either go to a designated taxi stand (marked with an orange sign or "TAXI" on the pavement) or call one via an app like FreeNow or ItTaxi.' }
    ]
  },
  {
    id: 'social',
    title: 'Social Etiquette & Rhythms',
    icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
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
    icon: <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />,
    items: [
      { title: 'The "Pos" Law', content: 'By Italian law, all merchants—including taxis, tobacco shops, and cafes—are required to accept credit cards for any amount. However, small businesses hate paying the transaction fees. If you try to pay for a €1.20 espresso with a Visa, expect some eye-rolling. Carry coins for the coffee bars.' },
      { title: 'Atm Traps', content: 'Avoid the standalone ATMs labeled "Euronet" found in heavy tourist areas. They charge predatory conversion fees. Only use official bank ATMs attached to an actual bank building (look for names like Intesa Sanpaolo, Unicredit, or Banco BPM).' },
      { title: 'The "Gift" Scam', content: 'In Rome, if someone hands you a rose, a bracelet, or a photo prop, do not take it into your hands. The moment you touch it, they will demand money aggressively. Keep your hands down, say a firm "No, grazie," and keep walking.' }
    ]
  },
  {
    id: 'cruise',
    title: 'MSC Splendida Reality Check',
    icon: <Ship className="w-4 h-4 sm:w-5 sm:h-5" />,
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
