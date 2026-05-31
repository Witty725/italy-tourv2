import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ExternalLink, ShoppingBag } from 'lucide-react';

type Product = {
  name: string;
  price: string;
  pros: string;
  cons: string;
  link: string;
};

type ShoppingCategory = {
  id: string;
  title: string;
  description: string;
  products: Product[];
};

const shoppingData: ShoppingCategory[] = [
  {
    id: 'power-adapter',
    title: '1. Universal Travel Power Adapter',
    description: 'Italy uses Type C/F plugs (220-230V). Most US electronics are dual-voltage, so you need an adapter, not a converter.',
    products: [
      {
        name: 'Epicka Universal Travel Adapter',
        price: '~$25',
        pros: '4 USB ports + AC outlets, works in 150+ countries including Italy, compact.',
        cons: 'Slightly bulkier than ultra-minimal options.',
        link: 'https://amazon.com/s?k=Epicka+Universal+Travel+Adapter'
      },
      {
        name: 'Anker Nano Travel Adapter',
        price: '~$30–$40',
        pros: 'Smallest universal option, 2 USB-C + 2 USB-A, fits most outlets easily.',
        cons: 'Fewer AC prongs than some.',
        link: 'https://amazon.com/s?k=Anker+Nano+Travel+Adapter'
      },
      {
        name: 'TESSAN Universal Travel Adapter 28W',
        price: '~$20–$25',
        pros: '3 USB-C + 2 USB-A, fast charging, great Italy-specific models available.',
        cons: 'Can feel warm under heavy load.',
        link: 'https://amazon.com/s?k=TESSAN+Universal+Travel+Adapter'
      },
      {
        name: 'Ceptics World Travel Adapter Kit',
        price: '~$35',
        pros: 'Individual plugs + pouch for easy swapping, very reliable.',
        cons: 'Not all-in-one (you swap pieces).',
        link: 'https://amazon.com/s?k=Ceptics+World+Travel+Adapter+Kit'
      }
    ]
  },
  {
    id: 'power-bank',
    title: '2. Portable Power Bank (TSA-approved, flight-safe)',
    description: 'Long flights + sightseeing = dead phone risk. Look for ≤100Wh (most 10,000–20,000mAh are fine).',
    products: [
      {
        name: 'UGREEN MagFlow 20000mAh Magnetic Power Bank',
        price: '~$90',
        pros: 'Qi2 25W certified wireless MagSafe charging (super fast for iPhone), 45W PD wired + built-in cable, dual-device charging, over 2.5 full iPhone charges, airline-friendly.',
        cons: 'Heavier/bulkier than slim options (~1 lb).',
        link: 'https://amazon.com/s?k=UGREEN+MagFlow+20000mAh+Magnetic+Power+Bank'
      },
      {
        name: 'Baseus Magnetic Portable Charger',
        price: '~$25–$35',
        pros: 'Extremely thin and pocketable (0.6" thick), strong magnetic hold, fast charging, lightweight for daily carry.',
        cons: 'Lower capacity than 20k mAh models.',
        link: 'https://amazon.com/s?k=Baseus+Magnetic+Portable+Charger'
      },
      {
        name: 'INIU Slimmest 10000mAh Wireless Power Bank',
        price: '~$25–$30',
        pros: 'Market’s slimmest design, Qi2 wireless + fast wired, flight-safe, compact and reliable.',
        cons: 'Lower capacity for multi-day heavy use.',
        link: 'https://amazon.com/s?k=INIU+Slimmest+10000mAh+Wireless+Power+Bank'
      },
      {
        name: 'Charmast Portable Charger with Built-in Cables',
        price: '~$23',
        pros: 'Multiple built-in cables (no extras needed), compact.',
        cons: 'Slightly heavier than minimal options.',
        link: 'https://amazon.com/s?k=Charmast+Portable+Charger'
      }
    ]
  },
  {
    id: 'money-belt',
    title: '3. RFID Money Belt (for cash, cards, passport)',
    description: 'Italy has skilled pickpockets — hide valuables under clothes.',
    products: [
      {
        name: 'StashBandz RFID Money Belt',
        price: '~$25–$30',
        pros: 'Breathable wicking fabric, multiple secure pockets, stays in place during walking/sightseeing, lightweight and comfortable for active travel.',
        cons: 'May feel minimal if you want extra organization.',
        link: 'https://amazon.com/s?k=StashBandz+RFID+Money+Belt'
      },
      {
        name: 'Eagle Creek Undercover RFID Money Belt',
        price: '~$35',
        pros: 'Soft recycled nylon, RFID blocking, two zippered pockets perfectly fit passport + cash/cards, adjustable waistband, discreet.',
        cons: 'Basic zippers (no locks).',
        link: 'https://www.eaglecreek.com/search?q=Undercover+RFID+Money+Belt'
      },
      {
        name: 'Raytix RFID Money Belt',
        price: '~$25',
        pros: 'Comfortable, multiple pockets, breathable, highly rated for concealment.',
        cons: 'Can feel warm if overpacked.',
        link: 'https://amazon.com/s?k=Raytix+RFID+Money+Belt'
      },
      {
        name: 'VENTURE 4TH Slim Money Belt',
        price: '~$20',
        pros: 'Ultra-slim/minimalist, water-resistant, excellent RFID.',
        cons: 'Fewer pockets than bulkier models.',
        link: 'https://amazon.com/s?k=VENTURE+4TH+Slim+Money+Belt'
      }
    ]
  },
  {
    id: 'carry-on',
    title: '4. Carry-On Luggage (airline-approved)',
    description: 'Avoid checked bags for speed and security on international flights.',
    products: [
      {
        name: 'Samsonite Freeform Hardside Carry-On',
        price: '~$150–$200',
        pros: 'Lightweight, durable, spinner wheels, expandable.',
        cons: 'Higher price.',
        link: 'https://amazon.com/s?k=Samsonite+Freeform+Hardside+Carry-On'
      },
      {
        name: 'Amazon Basics 21" Hardside',
        price: '~$60',
        pros: 'Budget-friendly, scratch-resistant, great value.',
        cons: 'Less premium wheels/handles.',
        link: 'https://amazon.com/s?k=Amazon+Basics+21+inch+Hardside'
      },
      {
        name: 'Travelpro Platinum Elite',
        price: '~$300+',
        pros: 'Best durability/warranty, softside flexibility.',
        cons: 'Expensive.',
        link: 'https://amazon.com/s?k=Travelpro+Platinum+Elite+Carry-On'
      },
      {
        name: 'Away The Carry-On',
        price: '~$275',
        pros: 'Stylish, built-in charger option, excellent organization.',
        cons: 'Pricey for first-timers.',
        link: 'https://www.awaytravel.com/suitcases/carry-on'
      }
    ]
  },
  {
    id: 'neck-pillow',
    title: '5. Travel Neck Pillow',
    description: 'Long transatlantic flights are tough without one.',
    products: [
      {
        name: 'Ostrichpillow Go Neck Pillow',
        price: '~$69',
        pros: 'Memory foam support, breathable, compact when packed.',
        cons: 'Higher cost.',
        link: 'https://amazon.com/s?k=Ostrichpillow+Go+Neck+Pillow'
      },
      {
        name: 'Trtl Pillow',
        price: '~$60',
        pros: 'Unique wrap-around design, very supportive for side sleepers.',
        cons: 'Looks unusual.',
        link: 'https://amazon.com/s?k=Trtl+Pillow'
      },
      {
        name: 'Travelrest Nest Ultimate Memory Foam',
        price: '~$40–$50',
        pros: 'Excellent all-around support, compressible.',
        cons: 'Bulkier to pack.',
        link: 'https://amazon.com/s?k=Travelrest+Nest'
      },
      {
        name: 'napfun Memory Foam Neck Pillow',
        price: '~$20–$25',
        pros: 'Affordable, washable cover, includes extras like mask/earplugs.',
        cons: 'Basic compared to premium.',
        link: 'https://amazon.com/s?k=napfun+Memory+Foam+Neck+Pillow'
      }
    ]
  },
  {
    id: 'packing-cubes',
    title: '6. Packing Cubes (set of 6–10)',
    description: 'Keeps suitcase organized and maximizes space.',
    products: [
      {
        name: 'Eagle Creek Pack-It Reveal Cube Set',
        price: '~$50–$100',
        pros: 'Durable, see-through mesh, lifetime warranty.',
        cons: 'Pricier.',
        link: 'https://amazon.com/s?k=Eagle+Creek+Pack-It+Reveal'
      },
      {
        name: 'BAGAIL 8-Set Packing Cubes',
        price: '~$20–$30',
        pros: 'Great value, many sizes, lightweight.',
        cons: 'Less premium fabric.',
        link: 'https://amazon.com/s?k=BAGAIL+8-Set+Packing+Cubes'
      },
      {
        name: 'BAGSMART Compression Packing Cubes',
        price: '~$20',
        pros: 'Compression feature saves space.',
        cons: 'Can be tricky to zip when full.',
        link: 'https://amazon.com/s?k=BAGSMART+Compression+Packing+Cubes'
      },
      {
        name: 'Shacke Pak 5-Set',
        price: '~$28',
        pros: 'Excellent organization, water-resistant.',
        cons: 'Fewer pieces than some sets.',
        link: 'https://amazon.com/s?k=Shacke+Pak+Packing+Cubes'
      }
    ]
  },
  {
    id: 'water-bottle',
    title: '7. Collapsible Water Bottle (TSA-friendly)',
    description: 'Italy has great tap water (fontanelle fountains everywhere) — bring a foldable bottle to stay hydrated without bulky luggage.',
    products: [
      {
        name: 'TakeToday Collapsible Silicone Water Bottle',
        price: '~$15–$20',
        pros: 'Folds flat to pocket size, lightweight, BPA-free, leakproof.',
        cons: 'Can feel floppy when empty; may need careful cleaning to avoid odors.',
        link: 'https://amazon.com/s?k=TakeToday+Collapsible+Silicone+Water+Bottle'
      },
      {
        name: 'BEAUTAIL Lightweight Leakproof Water Bottle',
        price: '~$15–$20',
        pros: 'Ultra-lightweight silicone, collapses small, durable for travel.',
        cons: 'Silicone can pick up tastes if not rinsed well; slightly less rigid when full.',
        link: 'https://amazon.com/s?k=BEAUTAIL+Collapsible+Silicone+Water+Bottle'
      },
      {
        name: 'Rotayi Silicone Water Bottle with Carabiner',
        price: '~$15–$20',
        pros: '16oz capacity, strong carabiner for clipping to bag, leak-proof.',
        cons: 'Smaller capacity than rigid bottles; carabiner may rattle if not secured.',
        link: 'https://amazon.com/s?k=Rotayi+Collapsible+Leak-Proof+Silicone+Water+Bottle'
      },
      {
        name: 'Generic 17oz+ silicone model with handle',
        price: '~$12–$18',
        pros: 'Cheapest entry, still folds flat and TSA-compliant.',
        cons: 'Varies in quality — stick to the above for reliability.',
        link: 'https://amazon.com/s?k=Collapsible+Silicone+Water+Bottle+17oz'
      }
    ]
  }
];

export function ShoppingListTab() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="p-4 flex flex-col gap-4 animate-fade-in min-h-[300px]">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-2">
        <h3 className="text-amber-400 font-black tracking-wider uppercase text-xs flex items-center gap-2 mb-2">
          <ShoppingBag className="w-4 h-4" />
          Recommended Gear
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm">
          A curated list of travel essentials. These are suggestions (not mandatory checklists) to ensure you are well-prepared for any situation during our Italy tour.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {shoppingData.map((category) => {
          const isExpanded = expandedId === category.id;

          return (
            <div 
              key={category.id} 
              className="bg-slate-950/80 rounded-xl border border-slate-800 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-900/50 transition-colors"
                id={`btn-toggle-shopping-${category.id}`}
              >
                <div>
                  <h4 className="text-slate-100 font-bold text-sm tracking-tight">{category.title}</h4>
                  <p className="text-slate-400 text-xs mt-1 max-w-[90%]">{category.description}</p>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-500 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-4 pb-4 flex flex-col gap-4 border-t border-slate-800 pt-4 bg-slate-900/30">
                      {category.products.map((product, idx) => (
                        <div key={idx} className="flex flex-col gap-2 p-3 bg-slate-950 rounded-lg border border-slate-850">
                          <div className="flex justify-between items-start gap-4">
                            <h5 className="text-emerald-400 font-bold text-sm leading-snug">
                              {product.name}
                            </h5>
                            <span className="bg-slate-800 px-2 py-1 rounded text-xs font-black text-slate-200">
                              {product.price}
                            </span>
                          </div>
                          
                          <div className="flex flex-col gap-1.5 mt-1 text-xs">
                            <div className="flex gap-2">
                              <span className="font-extrabold text-emerald-500 w-8 shrink-0">Pros:</span>
                              <span className="text-slate-300">{product.pros}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="font-extrabold text-rose-400 w-8 shrink-0">Cons:</span>
                              <span className="text-slate-400">{product.cons}</span>
                            </div>
                          </div>

                          <div className="mt-2 text-right">
                            <a 
                              href={product.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 hover:from-blue-600/30 hover:to-indigo-600/30 border border-blue-500/30 rounded-lg text-blue-400 text-xs font-extrabold uppercase tracking-wider transition-all"
                            >
                              View Product <ExternalLink className="w-3.5 h-3.5 mt-[-1px]" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
