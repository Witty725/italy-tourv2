import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Map, 
  Briefcase, 
  CalendarDays, 
  ShieldAlert, 
  MessageCircle, 
  Lightbulb, 
  Camera, 
  X, 
  CloudSun,
  Info
} from 'lucide-react';

// Component Imports
import { LaundryStrategy } from './components/LaundryStrategy';
import { ItineraryTimeline } from './components/ItineraryTimeline';
import { PackingChecklist } from './components/PackingChecklist';
import { EmergencyTab } from './components/EmergencyTab';
import { TripCountdown } from './components/TripCountdown';
import { PhrasesTab } from './components/PhrasesTab';
import { TravelTipsTab } from './components/TravelTipsTab';
import { HomeTab } from './components/HomeTab';
import { WeatherTab } from './components/WeatherTab';
import { triggerHaptic } from './utils/haptics';

type Tab = 'Home' | 'Itinerary' | 'Packing' | 'Laundry' | 'Tips' | 'Phrases' | 'Emergency' | 'Weather';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const changeTab = (tab: Tab) => {
    if (tab === 'Emergency') {
      triggerHaptic('heavy');
    } else {
      triggerHaptic('light');
    }
    setActiveTab(tab);
  };

  // Helper navigation function passed to child components
  const handleNavigate = (tab: any) => {
    if (tab === 'Emergency') {
      triggerHaptic('heavy');
    } else {
      triggerHaptic('light');
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen font-sans bg-slate-950 text-slate-200 flex flex-col justify-between pb-24">
      
      {/* 1. TOP BAR RESTRUCTURE */}
      <header className="bg-slate-900/85 backdrop-blur border-b border-slate-800 sticky top-0 z-40 px-3 py-2.5">
        <div className="grid grid-cols-3 gap-2 max-w-2xl mx-auto w-full">
          {/* Top Left: Dedicated Weather Section Button */}
          <button 
            onClick={() => changeTab('Weather')}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-2 rounded-xl border text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer truncate ${
              activeTab === 'Weather' 
                ? 'bg-slate-800 hover:bg-slate-700 border-blue-400 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.15)]' 
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Live Weather"
          >
            <CloudSun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
            <span className="truncate">Weather</span>
          </button>

          {/* Top Center: Photos Button Symmetrical Alignment */}
          <button 
            onClick={() => {
              triggerHaptic('light');
              setShowPhotoModal(true);
            }}
            className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer truncate"
            title="Photos Gallery"
          >
            <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 shrink-0" />
            <span className="truncate">Photos</span>
          </button>

          {/* Top Right: Standardized Emergency Alert Button */}
          <button 
            onClick={() => changeTab('Emergency')}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-2 rounded-xl border text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer truncate ${
              activeTab === 'Emergency'
                ? 'bg-slate-800 hover:bg-slate-700 border-red-500 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.15)]'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-red-400 hover:text-red-450'
            }`}
            title="Emergency Info & SOS Contacts"
          >
            <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 animate-pulse shrink-0" />
            <span className="truncate">SOS</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA CONTAINER */}
      <main className="max-w-2xl mx-auto w-full px-4 pt-6 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'Home' && <HomeTab onNavigate={handleNavigate} />}
            {activeTab === 'Itinerary' && <ItineraryTimeline />}
            {activeTab === 'Packing' && <PackingChecklist />}
            {activeTab === 'Laundry' && <LaundryStrategy />}
            {activeTab === 'Tips' && <TravelTipsTab />}
            {activeTab === 'Phrases' && <PhrasesTab />}
            {activeTab === 'Emergency' && <EmergencyTab />}
            {activeTab === 'Weather' && <WeatherTab onNavigate={handleNavigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 2. FIXED BOTTOM DOCKED NAVIGATION DOCK */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur border-t border-slate-800 px-2 py-3 z-40 shadow-xl">
        <div className="max-w-md mx-auto flex justify-between items-center gap-1">
          
          {/* Order 1: Home Page */}
          <button 
            onClick={() => changeTab('Home')}
            className={`flex flex-col items-center gap-1 flex-1 py-1 rounded-xl transition-all ${activeTab === 'Home' ? 'text-indigo-400 bg-indigo-500/5' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-bold tracking-wider uppercase">Home</span>
          </button>

          {/* Order 2: Itinerary */}
          <button 
            onClick={() => changeTab('Itinerary')}
            className={`flex flex-col items-center gap-1 flex-1 py-1 rounded-xl transition-all ${activeTab === 'Itinerary' ? 'text-indigo-400 bg-indigo-500/5' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <CalendarDays className="w-5 h-5" />
            <span className="text-[10px] font-bold tracking-wider uppercase">Itinerary</span>
          </button>

          {/* Order 3: Tips */}
          <button 
            onClick={() => changeTab('Tips')}
            className={`flex flex-col items-center gap-1 flex-1 py-1 rounded-xl transition-all ${activeTab === 'Tips' ? 'text-indigo-400 bg-indigo-500/5' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Lightbulb className="w-5 h-5" />
            <span className="text-[10px] font-bold tracking-wider uppercase">Tips</span>
          </button>

          {/* Order 4: Phrases */}
          <button 
            onClick={() => changeTab('Phrases')}
            className={`flex flex-col items-center gap-1 flex-1 py-1 rounded-xl transition-all ${activeTab === 'Phrases' ? 'text-indigo-400 bg-indigo-500/5' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-[10px] font-bold tracking-wider uppercase">Phrases</span>
          </button>

          {/* Order 5: Packing */}
          <button 
            onClick={() => changeTab('Packing')}
            className={`flex flex-col items-center gap-1 flex-1 py-1 rounded-xl transition-all ${activeTab === 'Packing' ? 'text-indigo-400 bg-indigo-500/5' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-[10px] font-bold tracking-wider uppercase">Packing</span>
          </button>
          
        </div>
      </nav>

      {/* SHARED PHOTO MODAL */}
      <AnimatePresence>
        {showPhotoModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl"
            >
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                <div>
                  <h3 className="text-white font-black text-sm uppercase tracking-wider">Family Shared Album</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Google Photos • Italy 2026</p>
                </div>
                <button 
                  onClick={() => setShowPhotoModal(false)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Capture some amazing shots during our trip? Share them on our family-shared Google Photos Library so everyone on the tour can enjoy and preserve these memories!
                </p>
                
                <div className="flex flex-col gap-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-black text-amber-400 uppercase text-[10px] tracking-widest flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" /> 
                    How to Upload Your Photos
                  </h4>
                  <ol className="flex flex-col gap-3 text-xs text-slate-300">
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center bg-slate-800 text-slate-300 w-5 h-5 rounded-full text-[10px] font-bold shrink-0 shadow-sm border border-slate-700">1</span>
                      <span className="leading-relaxed">Tap the <span className="text-white font-semibold">Open Shared Album</span> button below to view the collection.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center bg-slate-800 text-slate-300 w-5 h-5 rounded-full text-[10px] font-bold shrink-0 shadow-sm border border-slate-700">2</span>
                      <span className="leading-relaxed">Tap the <span className="text-white font-semibold">"Join"</span> button at the top to enable uploading with your Google account.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center bg-slate-800 text-slate-300 w-5 h-5 rounded-full text-[10px] font-bold shrink-0 shadow-sm border border-slate-700">3</span>
                      <span className="leading-relaxed">Click the <span className="text-white font-semibold">Add photos symbol</span> (the picture icon with a +) at the top of the album.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center bg-slate-800 text-slate-300 w-5 h-5 rounded-full text-[10px] font-bold shrink-0 shadow-sm border border-slate-700">4</span>
                      <span className="leading-relaxed">Select your favorite vacation memories and click <span className="text-white font-semibold">"Done" / "Add"</span> to publish them immediately so the whole family can see them!</span>
                    </li>
                  </ol>
                </div>

                <a 
                  href="https://photos.app.goo.gl/4KZkoSxz4qcSHMXJ7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl text-center shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                >
                  <Camera className="w-4.5 h-4.5" />
                  <span>Open Shared Album</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}