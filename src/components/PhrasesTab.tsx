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
  X
} from 'lucide-react';

interface Phrase {
  it: string;
  en: string;
  pronunciation?: string;
  category: 'Greetings' | 'Courtesies' | 'Ordering Food' | 'Shopping' | 'Directions & Help';
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
];

const categories = ['All', 'Greetings', 'Courtesies', 'Ordering Food', 'Shopping', 'Directions & Help'] as const;

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

      {/* Grid displays filtered phrases */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-slate-700/50">
        <AnimatePresence mode="popLayout">
          {filteredPhrases.map((phrase, idx) => {
            const isSpeaking = speakingIdx === idx;
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                key={phrase.it}
                onClick={() => handleSpeak(phrase.it, idx)}
                className={`flex justify-between items-center p-3.5 rounded-xl border transition-all group cursor-pointer shadow-sm select-none ${
                  isSpeaking
                    ? 'border-emerald-500 bg-emerald-950/20 scale-[1.01] shadow-lg shadow-emerald-950/30'
                    : 'border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-slate-700/50'
                }`}
                id={`phrase-${phrase.it.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <div className="flex flex-col gap-1 pr-2">
                  <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400 leading-none">
                    {phrase.category}
                  </span>
                  <span className="font-extrabold text-slate-100 text-sm sm:text-base tracking-tight leading-tight">
                    {phrase.it}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold leading-snug">
                    {phrase.en}
                  </span>
                  {phrase.pronunciation && (
                    <span className="text-[9px] font-mono opacity-80 text-emerald-400 mt-0.5 leading-none bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 w-fit">
                      [{phrase.pronunciation}]
                    </span>
                  )}
                </div>
                
                {/* Voice Speaker Circle icon */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors border shrink-0 ${
                  isSpeaking
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 animate-bounce'
                    : 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 border-indigo-500/20'
                }`}>
                  <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
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
