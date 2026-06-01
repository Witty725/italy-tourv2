import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Volume2, 
  Sparkles, 
  MapPin, 
  ShoppingBag, 
  UtensilsCrossed, 
  Heart, 
  HelpCircle,
  Bookmark,
  Search,
  X,
  Activity
} from 'lucide-react';

interface Phrase {
  it: string;
  en: string;
  pronunciation?: string;
  category: 'Greetings' | 'Courtesies' | 'Ordering Food' | 'Shopping' | 'Directions & Help' | 'Medical & Pharmacy';
}

const phrasesData: Phrase[] = [
  // Greetings
  { it: 'Buongiorno', en: 'Good morning / Hello', pronunciation: 'bwon-joor-no', category: 'Greetings' },
  { it: 'Buon pomeriggio', en: 'Good afternoon', pronunciation: 'bwon po-meh-reed-jo', category: 'Greetings' },
  { it: 'Buonasera', en: 'Good evening', pronunciation: 'bwo-nah-seh-rah', category: 'Greetings' },
  { it: 'Ciao', en: 'Hello / Bye', pronunciation: 'chow', category: 'Greetings' },
  { it: 'Arrivederci', en: 'Goodbye (formal)', pronunciation: 'ah-ree-veh-dehr-chee', category: 'Greetings' },
  { it: 'Ci vediamo!', en: 'See you!', pronunciation: 'chee veh-dyah-mo', category: 'Greetings' },
  { it: 'Come sta?', en: 'How are you? (formal)', pronunciation: 'ko-meh stah', category: 'Greetings' },
  { it: 'Piacere di conoscerti', en: 'Nice to meet you', pronunciation: 'pyah-cheh-reh dee ko-no-shehr-tee', category: 'Greetings' },
  { it: 'Tutto bene?', en: 'All good?', pronunciation: 'toot-to beh-neh', category: 'Greetings' },
  { it: 'Buon viaggio!', en: 'Have a good trip!', pronunciation: 'bwon vyad-jo', category: 'Greetings' },

  // Courtesies
  { it: 'Per favore', en: 'Please', pronunciation: 'pehr fah-vo-reh', category: 'Courtesies' },
  { it: 'Grazie mille', en: 'Thank you very much', pronunciation: 'grah-tsyeh meel-leh', category: 'Courtesies' },
  { it: 'Prego', en: 'You\'re welcome', pronunciation: 'preh-go', category: 'Courtesies' },
  { it: 'Mi dispiace', en: 'I am sorry', pronunciation: 'mee dees-pyah-cheh', category: 'Courtesies' },
  { it: 'Permesso', en: 'Excuse me (passing through)', pronunciation: 'pehr-mehs-so', category: 'Courtesies' },
  { it: 'Scusi', en: 'Excuse me (get attention - formal)', pronunciation: 'skoo-zee', category: 'Courtesies' },
  { it: 'Va bene', en: 'Okay / Understood', pronunciation: 'vah beh-neh', category: 'Courtesies' },
  { it: 'Non c\'è di che', en: 'Don\'t mention it / Not at all', pronunciation: 'non cheh dee keh', category: 'Courtesies' },
  { it: 'Buona giornata!', en: 'Have a nice day!', pronunciation: 'bwo-nah jor-nah-tah', category: 'Courtesies' },
  { it: 'Ottimo!', en: 'Excellent!', pronunciation: 'ot-tee-mo', category: 'Courtesies' },

  // Ordering Food
  { it: 'Il conto, per favore', en: 'The check, please', pronunciation: 'eel kon-to pehr fah-vo-reh', category: 'Ordering Food' },
  { it: 'Un caffè, per favore', en: 'A coffee, please', pronunciation: 'oon kahf-feh pehr fah-vo-reh', category: 'Ordering Food' },
  { it: 'Un tavolo per due', en: 'A table for two', pronunciation: 'oon tah-vo-lo pehr doo-eh', category: 'Ordering Food' },
  { it: 'Vorrei un tavolo all\'aperto', en: 'I would like an outdoor table', pronunciation: 'vor-ray oon tah-vo-lo al-lah-pehr-to', category: 'Ordering Food' },
  { it: 'Vorrei ordinare...', en: 'I would like to order...', pronunciation: 'vor-ray or-dee-nah-reh', category: 'Ordering Food' },
  { it: 'Vorrei un gelato piccolo con due gusti', en: 'I\'d like a small gelato with two flavors', pronunciation: 'vor-ray oon jeh-lah-to peek-ko-lo kon doo-eh goos-tee', category: 'Ordering Food' },
  { it: 'Vino rosso / bianco', en: 'Red / white wine', pronunciation: 'vee-no ros-so / byahn-ko', category: 'Ordering Food' },
  { it: 'Un bicchiere di vino della casa', en: 'A glass of house wine', pronunciation: 'oon beek-kyeh-reh dee vee-no del-lah kah-zah', category: 'Ordering Food' },
  { it: 'Acqua naturale / frizzante', en: 'Still / sparkling water', pronunciation: 'ah-kwah nah-too-rah-leh / freets-tsahn-teh', category: 'Ordering Food' },
  { it: 'Senza glutine', en: 'Gluten-free', pronunciation: 'sen-tsah gloo-tee-neh', category: 'Ordering Food' },
  { it: 'Senza lattosio', en: 'Lactose-free', pronunciation: 'sen-tsah lat-to-zyo', category: 'Ordering Food' },
  { it: 'Buon appetito!', en: 'Enjoy your meal!', pronunciation: 'bwon ap-peh-tee-to', category: 'Ordering Food' },
  { it: 'È delizioso!', en: 'It is delicious!', pronunciation: 'eh deh-lee-tsyoh-zo', category: 'Ordering Food' },

  // Shopping
  { it: 'Quanto costa?', en: 'How much does this cost?', pronunciation: 'kwan-to kos-tah', category: 'Shopping' },
  { it: 'Posso pagare con la carta?', en: 'Can I pay with card?', pronunciation: 'pos-so pah-gah-reh kon lah kahr-tah', category: 'Shopping' },
  { it: 'Accettate contactless?', en: 'Do you accept contactless pay?', pronunciation: 'at-tshet-tah-teh kon-takt-les', category: 'Shopping' },
  { it: 'Sto solo guardando, grazie', en: 'I\'m just looking, thank you', pronunciation: 'sto soh-lo gwahr-dahn-do grah-tsyeh', category: 'Shopping' },
  { it: 'Avete una taglia più grande?', en: 'Do you have a bigger size?', pronunciation: 'ah-veh-teh oo-nah tahl-yah pyoo grahn-deh', category: 'Shopping' },
  { it: 'Vorrei comprare questo', en: 'I would like to buy this', pronunciation: 'vor-ray kom-prah-reh kwehs-to', category: 'Shopping' },
  { it: 'È troppo caro!', en: 'It is too expensive!', pronunciation: 'eh trop-po kah-ro', category: 'Shopping' },
  { it: 'Dov\'è la cassa?', en: 'Where is the cashier/checkout?', pronunciation: 'do-veh lah kas-sah', category: 'Shopping' },
  { it: 'Avete dei souvenir locali?', en: 'Do you have local souvenirs?', pronunciation: 'ah-veh-teh dey soo-veh-neer lo-kah-lee', category: 'Shopping' },
  { it: 'Scontrino, per favore', en: 'Receipt, please', pronunciation: 'skon-tree-no pehr fah-vo-reh', category: 'Shopping' },

  // Directions & Help
  { it: 'Dov\'è il bagno?', en: 'Where is the bathroom?', pronunciation: 'do-veh eel bahn-yo', category: 'Directions & Help' },
  { it: 'Parla inglese?', en: 'Do you speak English?', pronunciation: 'pahr-lah een-gleh-zeh', category: 'Directions & Help' },
  { it: 'Non capisco', en: 'I don\'t understand', pronunciation: 'non kah-pees-ko', category: 'Directions & Help' },
  { it: 'Può aiutarmi?', en: 'Can you help me?', pronunciation: 'pwoh eye-oo-tahr-mee', category: 'Directions & Help' },
  { it: 'Dove siamo?', en: 'Where are we?', pronunciation: 'do-veh syah-mo', category: 'Directions & Help' },
  { it: 'Un biglietto per..., per favore', en: 'One ticket to..., please', pronunciation: 'oon beel-yet-to pehr... pehr fah-vo-reh', category: 'Directions & Help' },
  { it: 'Dov\'è la fermata dell\'autobus?', en: 'Where is the bus stop?', pronunciation: 'do-veh lah fehr-mah-tah del-low-to-boos', category: 'Directions & Help' },
  { it: 'Dov\'è la stazione?', en: 'Where is the station?', pronunciation: 'do-veh lah stah-tsyoh-neh', category: 'Directions & Help' },
  { it: 'Dov\'è la farmacia più vicina?', en: 'Where is the nearest pharmacy?', pronunciation: 'do-veh lah fahr-mah-chee-ah pyoo vee-chee-nah', category: 'Directions & Help' },
  { it: 'Mi sono perso', en: 'I am lost', pronunciation: 'mee so-no pehr-so', category: 'Directions & Help' },
  { it: 'Può ripetere lentamente?', en: 'Could you repeat slowly?', pronunciation: 'pwoh ree-peh-teh-reh len-tah-men-teh', category: 'Directions & Help' },
  { it: 'C\'è il Wi-Fi gratuito qui?', en: 'Is there free Wi-Fi here?', pronunciation: 'cheh eel wee-fee grah-too-ee-to kwee', category: 'Directions & Help' },

  // Medical & Pharmacy
  { it: 'Dov\'è la farmacia di turno più vicina?', en: 'Where is the nearest open shift pharmacy?', pronunciation: 'do-veh lah fahr-mah-chee-ah dee toor-no pyoo vee-chee-nah', category: 'Medical & Pharmacy' },
  { it: 'Ho bisogno di un medico', en: 'I need a doctor', pronunciation: 'oh bee-zohn-yo dee oon meh-dee-ko', category: 'Medical & Pharmacy' },
  { it: 'Dov\'è il pronto soccorso?', en: 'Where is the emergency room?', pronunciation: 'do-veh eel pron-to sok-kor-so', category: 'Medical & Pharmacy' },
  { it: 'Mi fa male qui', en: 'It hurts here', pronunciation: 'mee fah mah-leh kwee', category: 'Medical & Pharmacy' },
  { it: 'Ho la febbre', en: 'I have a fever', pronunciation: 'oh lah fehb-breh', category: 'Medical & Pharmacy' },
  { it: 'Sono allergico a...', en: 'I am allergic to...', pronunciation: 'so-no al-lehr-zee-ko ah...', category: 'Medical & Pharmacy' },
  { it: 'Avete qualcosa per il mal di stomaco?', en: 'Do you have something for stomach aches?', pronunciation: 'ah-veh-teh kwal-ko-zah pehr eel mahl dee sto-mah-ko', category: 'Medical & Pharmacy' },
  { it: 'Posso avere un antidolorifico?', en: 'Can I have a painkiller?', pronunciation: 'pos-so ah-veh-reh oon ahn-tee-do-lo-ree-fee-ko', category: 'Medical & Pharmacy' },
  { it: 'Ho bisogno di una ricetta per questo?', en: 'Do I need a prescription for this?', pronunciation: 'oh bee-zohn-yo dee oo-nah ree-tshet-tah pehr kwehs-to', category: 'Medical & Pharmacy' },
  { it: 'Chiamate un\'ambulanza!', en: 'Call an ambulance!', pronunciation: 'kyah-mah-teh oon-ahm-boo-lahn-tsah', category: 'Medical & Pharmacy' },
];

const categories = ['All', 'Greetings', 'Courtesies', 'Ordering Food', 'Shopping', 'Directions & Help', 'Medical & Pharmacy'] as const;

export function PhrasesTab() {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSpeak = (itText: string, idx: number) => {
    if ('speechSynthesis' in window) {
      // Cancel previous speak runs
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(itText);
      utterance.lang = 'it-IT';
      utterance.rate = 0.85; // slightly slower for optimal learning
      
      utterance.onstart = () => setSpeakingIdx(idx);
      utterance.onend = () => setSpeakingIdx(null);
      utterance.onerror = () => setSpeakingIdx(null);
      
      window.speechSynthesis.speak(utterance);
    } else {
      // Small fallback notification or visual spike
      setSpeakingIdx(idx);
      setTimeout(() => setSpeakingIdx(null), 1000);
    }
  };

  const filteredPhrases = phrasesData
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => {
      if (!searchQuery) return true;
      const lowerQuery = searchQuery.toLowerCase();
      return p.it.toLowerCase().includes(lowerQuery) || p.en.toLowerCase().includes(lowerQuery);
    });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Greetings':
        return <Bookmark className="w-3.5 h-3.5" />;
      case 'Courtesies':
        return <Heart className="w-3.5 h-3.5" />;
      case 'Ordering Food':
        return <UtensilsCrossed className="w-3.5 h-3.5" />;
      case 'Shopping':
        return <ShoppingBag className="w-3.5 h-3.5" />;
      case 'Directions & Help':
        return <MapPin className="w-3.5 h-3.5" />;
      case 'Medical & Pharmacy':
        return <Activity className="w-3.5 h-3.5" />;
      default:
        return <MessageCircle className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search Header Info */}
      <div className="glass-panel p-4 bg-indigo-950/20 border-indigo-505/20">
        <h3 className="text-emerald-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 mb-1.5 font-sans">
          <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
          Interactive Italian Phrasebook
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Tap any phrase card below to hear the <span className="font-bold text-emerald-400">audible Italian pronunciations</span> spoken out loud at a comfortable tutoring speed!
        </p>
      </div>

      {/* Real-time Translation Term Filter Search bar */}
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search phrases (e.g. coffee, water, check, thank you)..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 pl-10 text-xs sm:text-sm text-slate-100 placeholder-slate-505 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-inner"
        />
        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-2.5 w-6 h-6 flex items-center justify-center rounded-full bg-slate-850 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Clear Search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Chips Bar */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none shrink-0 -mx-1 px-1">
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border leading-none ${
                isActive 
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-md shadow-rose-500/5 font-extrabold' 
                  : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              {getCategoryIcon(cat)}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Emergency GPS Maps Button Helpers for Medical & Pharmacy */}
      {activeCategory === 'Medical & Pharmacy' && (
        <div className="bg-emerald-950/20 border border-emerald-500/25 p-4 rounded-xl flex flex-col gap-3">
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

      {/* Grid or List displays filtered phrases */}
      <div className={activeCategory === 'Medical & Pharmacy' 
        ? "flex flex-col gap-2 border-slate-700/50 max-w-full" 
        : "grid grid-cols-1 sm:grid-cols-2 gap-3 border-slate-700/50"
      }>
        <AnimatePresence mode="popLayout">
          {filteredPhrases.map((phrase, idx) => {
            const isSpeaking = speakingIdx === idx;
            const isMedicalList = activeCategory === 'Medical & Pharmacy';
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                key={phrase.it}
                onClick={() => handleSpeak(phrase.it, idx)}
                className={`flex justify-between items-center border transition-all group cursor-pointer shadow-sm select-none ${
                  isMedicalList 
                    ? `p-3 rounded-xl ${isSpeaking ? 'border-emerald-500 bg-emerald-950/20 shadow-md shadow-emerald-950/10' : 'border-slate-800 bg-slate-900/30 hover:bg-slate-800/40 hover:border-slate-750'}`
                    : `p-3.5 rounded-xl ${isSpeaking ? 'border-emerald-500 bg-emerald-950/20 scale-[1.01] shadow-lg shadow-emerald-950/30' : 'border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-slate-700/50'}`
                }`}
                id={`phrase-${phrase.it.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <div className="flex flex-col gap-1 pr-2 w-full">
                  <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400 leading-none">
                    {phrase.category}
                  </span>
                  
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-extrabold text-slate-100 text-sm sm:text-base tracking-tight leading-tight">
                      {phrase.it}
                    </span>
                    {phrase.pronunciation && (
                      <span className="text-[9px] font-mono opacity-80 text-emerald-400 leading-none bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 w-fit shrink-0">
                        [{phrase.pronunciation}]
                      </span>
                    )}
                  </div>
                  
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold leading-snug">
                    {phrase.en}
                  </span>
                </div>
                
                {/* Voice Speaker Circle icon */}
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors border shrink-0 ${
                  isSpeaking
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 animate-bounce'
                    : 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 border-indigo-500/20'
                }`}>
                  <Volume2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredPhrases.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center p-8 bg-slate-900/20 border border-slate-900 rounded-2xl gap-2 mt-4"
        >
          <HelpCircle className="w-8 h-8 text-slate-500 animate-pulse" />
          <h4 className="text-slate-300 font-bold text-sm">No phrases found</h4>
          <p className="text-slate-500 text-xs max-w-xs leading-relaxed">
            We couldn't find matches for "{searchQuery}" under "{activeCategory}". Try exploring other categories or reset search terms.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="mt-2 px-4 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-400 text-xs font-bold rounded-lg transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
