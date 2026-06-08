import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Search, 
  Users, 
  Heart, 
  Globe, 
  Sparkles, 
  Bookmark,
  Compass,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface Participant {
  name: string;
  region: 'Italy' | 'Brazil' | 'USA';
  notes: string;
  relationshipBadge?: string;
}

const PARTICIPANTS_DATA: Participant[] = [
  // FROM ITALY
  { name: 'Don Lorenzo Piagneri', region: 'Italy', notes: 'Upper Toplecca Cousin and Pastor of Chiesa di Santissima Annunziata in Pontremoli', relationshipBadge: 'Cousin & Pastor' },
  { name: 'Giorgio Bardi', region: 'Italy', notes: 'Assistant to Pastor Don Lorenzo' },
  { name: 'Paolo Bissoli', region: 'Italy', notes: 'Historian, Researcher and Author' },
  { name: 'Caterina Rapetti', region: 'Italy', notes: 'Historian, Researcher and Author' },
  { name: 'Anna Rapetti', region: 'Italy', notes: 'Sister of Caterina Rapetti' },
  { name: 'Palmiro Magnani', region: 'Italy', notes: 'Grandson of Vittoria Piagnieri', relationshipBadge: 'Grandson of Vittoria' },
  { name: 'Giuliana Arditi', region: 'Italy', notes: 'Wife of Palmiro Magnani and English translator' },
  { name: 'Maria Pia Serati', region: 'Italy', notes: 'Granddaughter of Vittoria Piagneri of Upper Toplecca', relationshipBadge: 'Granddaughter of Vittoria' },
  { name: 'Gianluca Cavalieri', region: 'Italy', notes: 'Eldest son of Maria Pia Serati', relationshipBadge: 'Great-grandson of Vittoria' },
  { name: 'Giulia Bucchioni', region: 'Italy', notes: 'Wife of Gianluca Cavalieri' },
  { name: 'Elisa Cavalieri', region: 'Italy', notes: 'Daughter of Gianluca and Giulia' },
  { name: 'Anna Cavalieri', region: 'Italy', notes: 'Daughter of Gianluca and Giulia' },
  { name: 'Matteo Cavalieri', region: 'Italy', notes: 'Son of Gianluca and Giulia' },
  { name: 'Paolo Cavalieri', region: 'Italy', notes: 'Son of Maria Pia Serati', relationshipBadge: 'Great-grandson of Vittoria' },
  { name: 'Stefania Bernardini', region: 'Italy', notes: 'Wife of Paolo Cavalieri' },
  { name: 'Matilde Cavalieri', region: 'Italy', notes: 'Daughter of Paolo and Stefania' },
  { name: 'Beatrice Cavalieri', region: 'Italy', notes: 'Daughter of Paolo and Stefania' },
  { name: 'Edda Bertolini', region: 'Italy', notes: "Wife of deceased Luigi Bellengi (nephew of Frank Varoli, son of Emilia Piagneri of Toplecca)", relationshipBadge: 'Family Relative' },
  { name: 'Tania Bellengi', region: 'Italy', notes: "Edda Bertolini's daughter" },
  { name: 'Lorenzo Bellini', region: 'Italy', notes: "Tania Bellengi's companion" },
  { name: 'Simone Bellengi', region: 'Italy', notes: "Edda Bertolini's son" },
  { name: 'Elisa Stecconi', region: 'Italy', notes: "Simone Bellengi's companion" },
  { name: 'Anna Pedretti', region: 'Italy', notes: 'Took care of Alice Pedretti in their Noceto home. Daughter of Nello Pedretti of Cargalla.', relationshipBadge: 'Noceto Family Host' },
  { name: 'Eleonora Grossi', region: 'Italy', notes: "Anna Pedretti's daughter" },
  { name: 'Elisa Grossi', region: 'Italy', notes: "Anna Pedretti's daughter" },
  { name: 'Gregorio Milioli', region: 'Italy', notes: "Son of Silvana, another of Anna Pedretti's daughters" },
  { name: 'Vincenzo Pedretti', region: 'Italy', notes: 'Son of deceased Ilmo Pedretti of Cargalla', relationshipBadge: 'Cargalla Relative' },
  { name: 'Giovanna Porieli', region: 'Italy', notes: 'Wife of Vincenzo Pedretti' },
  { name: 'Iacopo Pedretti', region: 'Italy', notes: 'Son of Vincenzo and Giovanna' },
  { name: 'Bianca Pinotti', region: 'Italy', notes: 'Daughter of deceased Mariuccia Pedretti of Cargalla', relationshipBadge: 'Cargalla Relative' },
  { name: 'Giusseppe Agnetti', region: 'Italy', notes: 'Husband of Bianca Pinotti' },
  { name: 'Marco Agnetti', region: 'Italy', notes: 'Son of Bianca and Giuseppe' },
  { name: 'Elisa Lucchetti', region: 'Italy', notes: "Marco Agnetti's wife" },
  { name: 'Sofia Agnetti', region: 'Italy', notes: 'Daughter of Marco and Elisa' },
  { name: 'Maria Rosa Bertolini', region: 'Italy', notes: "Elisa Lucchetti's mother" },
  { name: 'Andrea Tamagna', region: 'Italy', notes: 'Husband of deceased Lucia Pinotti (sister of Bianca)', relationshipBadge: 'Family Relative' },
  { name: 'Massimiliano Tamagna', region: 'Italy', notes: 'Son of Andrea Tamagna' },
  { name: 'Taty Pagani', region: 'Italy', notes: "Massimiliano Tamagna's wife" },
  { name: 'Cristian Tamagna', region: 'Italy', notes: 'Son of Massimiliano and Taty' },
  { name: 'Andrea Tamagna', region: 'Italy', notes: 'Son of Massimiliano and Taty' },
  { name: 'Iva Angella', region: 'Italy', notes: 'Sister of Anna Caffoni, widow of Nello Caffoni, who was the son of Vittoria Piagneri of Toplecca', relationshipBadge: 'Toplecca Relative' },
  { name: 'Roberta Fugacci', region: 'Italy', notes: "Daughter of Iva Angella" },
  { name: 'Marco De Mattei', region: 'Italy', notes: "Husband of Roberta Fugacci" },
  { name: 'Graziano Fugacci', region: 'Italy', notes: "Son of Iva Angella" },
  { name: 'Tecla Lenzi', region: 'Italy', notes: "Graziano Fugacci's wife" },
  { name: 'Mauro Angella', region: 'Italy', notes: 'Brother of Anna Caffoni and Iva Angella', relationshipBadge: 'Family Relative' },
  { name: 'Silvana Andreani', region: 'Italy', notes: 'Wife of Mauro Angella' },
  { name: 'Aurelio Pascutti', region: 'Italy', notes: 'Rome neighbor and close friend of Gianpiero Forcina', relationshipBadge: 'Family Friend' },
  { name: 'Simona Di Prima', region: 'Italy', notes: 'Wife of Aurelio Pascutti' },
  { name: 'Carlo Bardotti', region: 'Italy', notes: 'Friend of Gianpiero Forcina and local guide to Pontremoli', relationshipBadge: 'Family Friend' },

  // FROM BRAZIL
  { name: 'Luiz Pedretti', region: 'Brazil', notes: 'Related to Alfonso Pedretti of Cargalla', relationshipBadge: 'Cargalla Descendant' },
  { name: 'Taiz Pedretti', region: 'Brazil', notes: 'Daughter of Luiz Pedretti', relationshipBadge: 'Cargalla Descendant' },

  // FROM THE USA
  { name: 'Elsie Bergamini', region: 'USA', notes: 'Daughter of Alfonso Pedretti of Cargalla and Assunta Piagneri of Toplecca', relationshipBadge: 'Matriarch / Coordinator' },
  { name: 'Alan Bergamini', region: 'USA', notes: 'Descendant of Pedretti-Piagneri branch' },
  { name: 'Rita O’Donnell', region: 'USA', notes: 'Descendant of Pedretti-Piagneri branch' },
  { name: 'Michael Anthony Bergamini', region: 'USA', notes: 'Descendant/Family Member' },
  { name: 'Stephanie Salter', region: 'USA', notes: 'Partner of Michael Anthony Bergamini' },
  { name: 'John Bergamini', region: 'USA', notes: 'Descendant/Family Member' },
  { name: 'James Bergamini', region: 'USA', notes: 'Descendant/Family Member' },
  { name: 'Thomas Bergamini', region: 'USA', notes: 'Descendant/Family Member' },
  { name: 'Emily Venanzi', region: 'USA', notes: 'Partner of Thomas Bergamini' },
  { name: 'Ann Marie Bergamini', region: 'USA', notes: 'Descendant/Family Member' },
  { name: 'Eman Mossadeghi', region: 'USA', notes: 'Partner of Ann Marie Bergamini' },
  { name: 'Leo Mossadeghi', region: 'USA', notes: 'Son of Ann Marie and Eman' },
  { name: 'Luca Mossadeghi', region: 'USA', notes: 'Son of Ann Marie and Eman' },
  { name: 'Peter Bergamini', region: 'USA', notes: 'Descendant/Family Member' },
  { name: 'Carolyn Hodges Bergamini', region: 'USA', notes: 'Wife of Peter Bergamini' },
  { name: 'Christine Bergamini', region: 'USA', notes: 'Descendant/Family Member' },
  { name: 'Paul Bergamini', region: 'USA', notes: 'Descendant/Family Member' },
  { name: 'Teresa Forcina', region: 'USA', notes: 'USA Relative (Co-coordinator and Organizer of Trip)', relationshipBadge: 'Organizer / Relative' },
  { name: 'Gianpiero Forcina', region: 'USA', notes: 'USA Relative (Co-coordinator and Organizer of Trip)', relationshipBadge: 'Organizer / Relative' },
  { name: 'Andrea Carter', region: 'USA', notes: 'Descendant of family branch in USA' },
  { name: 'Aaron Carter', region: 'USA', notes: 'Descendant of family branch in USA' },
  { name: 'Selena Scarnati', region: 'USA', notes: 'Descendant of family branch in USA' },
  { name: 'Kash Carter', region: 'USA', notes: 'Descendant of family branch in USA' },
  { name: 'Kane Carter', region: 'USA', notes: 'Descendant of family branch in USA' },
  { name: 'Nancy Bergamini', region: 'USA', notes: 'USA Relative / Descendant' },
  { name: 'Paula Bergamini', region: 'USA', notes: 'USA Relative / Descendant' },
  { name: 'Michael Joseph Bergamini', region: 'USA', notes: 'USA Relative / Descendant' },
  { name: 'Tamar Nordenberg', region: 'USA', notes: 'USA Relative / Descendant' },
  { name: 'Jean Pinotti', region: 'USA', notes: 'Granddaughter of Maria Piagneri of Toplecca and related to Pinotti families of Cargalla', relationshipBadge: 'Granddaughter of Maria' },
  { name: 'John Romei', region: 'USA', notes: 'Grandson of Joseph Serati and Concetta Piagneri of Toplecca', relationshipBadge: 'Grandson of Concetta' },
  { name: 'Karen Gersen', region: 'USA', notes: 'Partner of John Romei' },
  { name: 'Lois Romei Schlowsky', region: 'USA', notes: 'Granddaughter of Joseph Serati of Toplecca and Concetta Piagneri of Toplecca', relationshipBadge: 'Granddaughter of Concetta' },
  { name: 'Robert Schlowsky', region: 'USA', notes: 'Husband of Lois Romei Schlowsky' },
  { name: 'Charles Martinelli', region: 'USA', notes: 'Son of Mary and Armand Martinelli, grandson of Alfonso Pedretti of Cargalla', relationshipBadge: 'Grandson of Alfonso' },
  { name: 'Antoinette Martinelli', region: 'USA', notes: 'Wife of Charles Martinelli' },
  { name: 'Christopher Martinelli', region: 'USA', notes: 'Son of Charles and Antoinette' },
  { name: 'Steven Martinelli', region: 'USA', notes: 'Son of Charles and Antoinette' },
  { name: 'Jeannine Pagels-Evans', region: 'USA', notes: 'Daughter of deceased Linda Martinelli and granddaughter of Mary Martinelli', relationshipBadge: 'Granddaughter of Mary' },
  { name: 'Anthony Evans', region: 'USA', notes: 'Husband of Jeannine Pagels-Evans' },
  { name: 'Alyssa Campbell', region: 'USA', notes: 'Daughter of deceased Linda Martinelli and granddaughter of Mary Martinelli', relationshipBadge: 'Granddaughter of Mary' },
  { name: 'Ramone Campbell', region: 'USA', notes: 'Husband of Alyssa Campbell' },
  { name: 'Giovanni Bowley', region: 'USA', notes: 'Child of Alyssa Campbell, descendant of Mary Martinelli' },
  { name: 'Alexis Campbell', region: 'USA', notes: 'Daughter of Alyssa Campbell' },
  { name: 'Alianna Campbell', region: 'USA', notes: 'Daughter of Alyssa Campbell' },
  { name: 'Alaya Campbell', region: 'USA', notes: 'Daughter of Alyssa Campbell' }
];

interface FamilyRosterModalProps {
  onClose: () => void;
}

export function FamilyRosterModal({ onClose }: FamilyRosterModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'Italy' | 'Brazil' | 'USA'>('All');
  const [expandedRegions, setExpandedRegions] = useState<Record<'Italy' | 'Brazil' | 'USA', boolean>>({
    Italy: false,
    Brazil: false,
    USA: false,
  });

  // Track if user manually toggled. If not and they are searching, we auto-expand
  const [hasManuallyToggled, setHasManuallyToggled] = useState<Record<'Italy' | 'Brazil' | 'USA', boolean>>({
    Italy: false,
    Brazil: false,
    USA: false,
  });

  const filteredParticipants = PARTICIPANTS_DATA.filter(p => {
    const matchesRegion = selectedRegion === 'All' || p.region === selectedRegion;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.relationshipBadge && p.relationshipBadge.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  const handleTabClick = (region: 'All' | 'Italy' | 'Brazil' | 'USA') => {
    triggerHaptic('light');
    setSelectedRegion(region);
  };

  const toggleRegionExpanded = (region: 'Italy' | 'Brazil' | 'USA') => {
    triggerHaptic('light');
    setExpandedRegions(prev => ({ ...prev, [region]: !prev[region] }));
    setHasManuallyToggled(prev => ({ ...prev, [region]: true }));
  };

  const isRegionExpanded = (region: 'Italy' | 'Brazil' | 'USA') => {
    if (searchQuery.trim() !== '' && !hasManuallyToggled[region]) {
      return true; // Auto expand when searching
    }
    return expandedRegions[region];
  };

  const regionKeys: ('Italy' | 'Brazil' | 'USA')[] = 
    selectedRegion === 'All' ? ['Italy', 'Brazil', 'USA'] : [selectedRegion];

  const getRegionFlag = (region: 'Italy' | 'Brazil' | 'USA') => {
    switch (region) {
      case 'Italy': return '🇮🇹';
      case 'Brazil': return '🇧🇷';
      case 'USA': return '🇺🇸';
    }
  };

  const getRegionColor = (region: 'Italy' | 'Brazil' | 'USA') => {
    switch (region) {
      case 'Italy': return 'border-emerald-500/30 text-emerald-300 bg-emerald-500/5';
      case 'Brazil': return 'border-yellow-500/30 text-yellow-300 bg-yellow-500/5';
      case 'USA': return 'border-blue-500/30 text-blue-300 bg-blue-500/5';
    }
  };

  const counts = {
    All: PARTICIPANTS_DATA.length,
    Italy: PARTICIPANTS_DATA.filter(p => p.region === 'Italy').length,
    Brazil: PARTICIPANTS_DATA.filter(p => p.region === 'Brazil').length,
    USA: PARTICIPANTS_DATA.filter(p => p.region === 'USA').length,
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md cursor-pointer"
      onClick={() => {
        triggerHaptic('medium');
        onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl h-[90vh] sm:h-[85vh] flex flex-col shadow-2xl relative overflow-hidden text-left cursor-default"
        id="family-roster-modal"
      >
        {/* Top Header Background Glow */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />

        {/* Header Close Trigger */}
        <button
          onClick={() => {
            triggerHaptic('medium');
            onClose();
          }}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-xl bg-slate-950/50 hover:bg-slate-850 border border-slate-800/80 text-slate-400 hover:text-slate-100 transition-all cursor-pointer z-30"
          id="close-roster-modal"
        >
          <X className="w-4 h-4 sm:w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-800/80 relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center text-indigo-400 font-extrabold shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <Users className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-none">
                Family Roster & Participants
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider font-mono">
                Pontremoli Reunion • {PARTICIPANTS_DATA.length} Registered Members
              </p>
            </div>
          </div>

          {/* Dynamic Search Controller */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search family member, region, relations or notes..."
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-550 text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-xl focus:border-indigo-505 focus:outline-none transition-all placeholder:font-medium text-ellipsis"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  triggerHaptic('light');
                  setSearchQuery('');
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
              >
                <X className="w-4 h-4 bg-slate-800/80 hover:bg-slate-700/80 p-0.5 rounded-full" />
              </button>
            )}
          </div>

          {/* Region Tabs switcher */}
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none snap-x h-8.5">
            {([
              { key: 'All', label: 'All Regions 🌍' },
              { key: 'Italy', label: 'Italy 🇮🇹' },
              { key: 'Brazil', label: 'Brazil 🇧🇷' },
              { key: 'USA', label: 'United States 🇺🇸' }
            ] as const).map((tab) => {
              const isActive = selectedRegion === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(tab.key)}
                  className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold leading-none cursor-pointer transition-all border whitespace-nowrap snap-center flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-indigo-650 text-white border-indigo-500 shadow-md shadow-indigo-600/10'
                      : 'bg-slate-950 text-slate-400 border-slate-800/80 hover:bg-slate-850 hover:text-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[9px] font-mono px-1 rounded-md leading-relaxed ${
                    isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-900 text-slate-500'
                  }`}>
                    {counts[tab.key]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-5 scrollbar-thin scrollbar-thumb-slate-800 relative z-10">
          
          {/* Historical Lunigiana Family Tree Quote Highlight */}
          <div className="relative bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-4 sm:p-4.5 shadow-[0_0_15px_rgba(99,102,241,0.04)] ring-1 ring-indigo-500/5 text-left flex flex-col gap-2.5">
            <div className="absolute top-2 right-4 text-3xl font-serif text-indigo-500/15 select-none leading-none">“</div>
            <div className="flex items-center gap-1.5 text-indigo-400 font-extrabold text-[10px] uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Our Lunigiana Roots & Sacred Sacrifice</span>
            </div>
            
            <p className="text-[11px] sm:text-xs leading-relaxed font-sans italic text-slate-200">
              "...she was loyal to her church and to her family. She displayed courage, intelligence, independence, honesty, loyalty and a willingness to work and to seek opportunity."
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 border-t border-indigo-500/15 pt-2.5 text-[9.5px] sm:text-[10.5px]">
              <span className="font-bold text-slate-400 font-sans">
                — Joe Pinotti’s History of Our Families of the Lunigiana <span className="font-mono text-indigo-300">(Page 520)</span>
              </span>
              <span className="text-indigo-400 font-semibold italic bg-indigo-400/10 px-2 py-0.5 rounded-full w-fit">
                Dedicated to Our Families
              </span>
            </div>
          </div>

          {/* Members list view */}
          <div className="flex flex-col gap-3.5">
            {filteredParticipants.length > 0 ? (
              regionKeys.map((region) => {
                const regionMembers = filteredParticipants.filter(p => p.region === region);
                if (regionMembers.length === 0) return null;

                const expanded = isRegionExpanded(region);
                const regionTitle = region === 'Italy' ? 'From Italy' : region === 'Brazil' ? 'From Brazil' : 'From the USA';
                const flag = getRegionFlag(region);

                return (
                  <div key={region} className="border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-950/20">
                    {/* Collapsible Header Accordion Bar */}
                    <button
                      onClick={() => toggleRegionExpanded(region)}
                      className="w-full flex items-center justify-between p-3.5 sm:p-4 bg-slate-900/60 hover:bg-slate-900/90 transition-all text-left cursor-pointer border-b border-slate-800/65"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl sm:text-2xl leading-none select-none">{flag}</span>
                        <div>
                          <span className="font-bold text-[13px] sm:text-sm text-slate-100 uppercase tracking-wide">
                            {regionTitle}
                          </span>
                          <span className="ml-2 text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded-md border border-indigo-500/15">
                            {regionMembers.length} {regionMembers.length === 1 ? 'member' : 'members'}
                          </span>
                        </div>
                      </div>
                      <div className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-lg bg-slate-950/40 border border-slate-800/50">
                        {expanded ? (
                          <ChevronUp className="w-4 h-4 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 shrink-0" />
                        )}
                      </div>
                    </button>

                    {/* Accordion Content Panel */}
                    {expanded && (
                      <div className="p-3 sm:p-4 bg-slate-950/30 flex flex-col gap-2.5">
                        <div className="grid grid-cols-1 gap-2.5">
                          {regionMembers.map((member, idx) => (
                            <motion.div
                              key={`${member.name}-${idx}`}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: Math.min(idx * 0.015, 0.2) }}
                              className="p-3 sm:p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 hover:border-slate-750 transition-all flex items-start justify-between gap-3 relative group text-left"
                            >
                              <div className="flex flex-col gap-1 pr-6 text-left">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-extrabold text-xs sm:text-sm text-white group-hover:text-indigo-300 transition-colors leading-tight">
                                    {member.name}
                                  </span>
                                  
                                  {member.relationshipBadge && (
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-550/10 px-2 py-0.5 rounded-md border border-indigo-500/15 font-mono">
                                      {member.relationshipBadge}
                                    </span>
                                  )}
                                </div>
                                
                                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed max-w-full font-medium">
                                  {member.notes}
                                </p>
                              </div>

                              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[9px] sm:text-[10px] font-black tracking-wider uppercase font-mono shrink-0 select-none align-middle ${getRegionColor(member.region)}`}>
                                <span>{getRegionFlag(member.region)}</span>
                                <span className="hidden sm:inline">{member.region}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 px-4 bg-slate-950/35 border border-slate-900 rounded-2xl flex flex-col items-center justify-center gap-2.5 text-slate-500">
                <Users className="w-8 h-8 text-slate-600 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-xs italic">No family members match your current filters.</span>
                  <span className="text-[10px]">Try searching a different name, keyword or clearing search queries.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal footer information */}
        <div className="p-4 bg-slate-950 border-t border-slate-850 relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-slate-600" />
            <span>Sharing the blessings of the family tree across borders • 🇮🇹 & 🇧🇷 & 🇺🇸</span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-wider bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            Fruit of Sacrifices
          </div>
        </div>
      </motion.div>
    </div>
  );
}
