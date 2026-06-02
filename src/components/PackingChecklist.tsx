import React, { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { packingList } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { LaundryStrategy } from './LaundryStrategy';
import { ShoppingListTab } from './ShoppingListTab';
import { Droplets, Lightbulb, X, Briefcase, Shield, Smartphone, Anchor, Info, CheckCircle2, Shirt, ShoppingBag, Printer, Plus, Trash2 } from 'lucide-react';

const CATEGORIES = ['Documents & Finance', 'Packing Essentials', 'Electronics & Gear'];

const CATEGORY_META: Record<string, { icon: React.ComponentType<any>; color: string }> = {
  'Documents & Finance': { icon: Briefcase, color: 'text-[#10b981]' },
  'Packing Essentials': { icon: Shirt, color: 'text-amber-400' },
  'Electronics & Gear': { icon: Smartphone, color: 'text-sky-450' }
};

export function PackingChecklist() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const [checkedItems, setCheckedItems] = useLocalStorage<Record<string, boolean>>('packingProgress', {});
  const [customItems, setCustomItems] = useLocalStorage<typeof packingList>('customPackingItems', []);
  const [newItemText, setNewItemText] = useState('');
  const [newItemSubtext, setNewItemSubtext] = useState('');
  
  const [showLaundryModal, setShowLaundryModal] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [showShoppingModal, setShowShoppingModal] = useState(false);

  const combinedPackingList = useMemo(() => {
    return [...packingList, ...customItems];
  }, [customItems]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAllPacked = () => {
    const totalCount = combinedPackingList.length;
    const completedCount = Object.values(checkedItems).filter(Boolean).length;
    
    if (completedCount === totalCount) {
      setCheckedItems({});
    } else {
      const allPacked: Record<string, boolean> = {};
      combinedPackingList.forEach(item => {
        allPacked[item.id] = true;
      });
      setCheckedItems(allPacked);
    }
  };

  const progress = useMemo(() => {
    const total = combinedPackingList.length;
    const completed = Object.keys(checkedItems).filter(key => checkedItems[key]).length;
    return {
      total,
      completed,
      percentage: total === 0 ? 0 : Math.round((completed / total) * 100)
    };
  }, [combinedPackingList, checkedItems]);

  const currentCategoryItems = useMemo(() => {
    return combinedPackingList.filter(item => item.category === activeTab);
  }, [combinedPackingList, activeTab]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    
    const newItem = {
      id: `custom-${Date.now()}`,
      category: activeTab,
      text: newItemText.trim(),
      subText: newItemSubtext.trim() || undefined
    };
    
    setCustomItems(prev => [...prev, newItem]);
    setNewItemText('');
    setNewItemSubtext('');
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomItems(prev => prev.filter(item => item.id !== id));
    setCheckedItems(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handlePrintPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const docs = combinedPackingList.filter(item => item.category === 'Documents & Finance');
    const essentials = combinedPackingList.filter(item => item.category === 'Packing Essentials');
    const electronics = combinedPackingList.filter(item => item.category === 'Electronics & Gear');

    const renderPrintSection = (title: string, items: typeof packingList) => {
      let html = '';
      html += '<div class="category-section" style="margin-bottom: 24px; page-break-inside: avoid;">';
      html += '  <h2 class="category-header" style="font-size: 14px; margin: 0 0 10px 0; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 800;">' + title + '</h2>';
      html += '  <table class="items-table" style="width: 100%; border-collapse: collapse;">';
      html += '    <tbody>';
      
      items.forEach(item => {
        const isChecked = !!checkedItems[item.id];
        html += '      <tr class="item-row" style="border-bottom: 1px solid #f1f5f9;">';
        html += '        <td class="checkbox-cell" style="width: 28px; padding: 6px 0; vertical-align: top;">';
        html += '          <div class="checkbox-box" style="width: 15px; height: 15px; border: 1.5px solid ' + (isChecked ? '#10b981' : '#64748b') + '; background-color: ' + (isChecked ? '#10b981' : 'transparent') + '; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; color: ' + (isChecked ? '#ffffff' : 'transparent') + ';">';
        html += '            ✓';
        html += '          </div>';
        html += '        </td>';
        html += '        <td class="text-cell" style="padding: 6px 8px; vertical-align: top;">';
        html += '          <span class="item-text" style="font-size: 12.5px; font-weight: 600; color: ' + (isChecked ? '#94a3b8' : '#0f172a') + '; ' + (isChecked ? 'text-decoration: line-through;' : '') + '">' + item.text + '</span>';
        if (item.subText) {
          html += '          <div class="item-subtext" style="font-size: 10.5px; color: #64748b; margin-top: 2px;">' + item.subText + '</div>';
        }
        html += '        </td>';
        html += '      </tr>';
      });

      html += '    </tbody>';
      html += '  </table>';
      html += '</div>';
      return html;
    };

    const docItemsHtml = renderPrintSection('Documents & Finance', docs);
    const essentialItemsHtml = renderPrintSection('Packing Essentials', essentials);
    const electronicItemsHtml = renderPrintSection('Electronics & Gear', electronics);

    const todayDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    let fullHtml = '';
    fullHtml += '<!DOCTYPE html>';
    fullHtml += '<html>';
    fullHtml += '  <head>';
    fullHtml += '    <title>Italy Tour 2026 - Packing Checklist</title>';
    fullHtml += '    <style>';
    fullHtml += '      body {';
    fullHtml += '        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;';
    fullHtml += '        color: #0f172a;';
    fullHtml += '        background-color: #ffffff;';
    fullHtml += '        line-height: 1.4;';
    fullHtml += '        margin: 0;';
    fullHtml += '        padding: 40px;';
    fullHtml += '      }';
    fullHtml += '      .header {';
    fullHtml += '        border-bottom: 2.5px solid #0f172a;';
    fullHtml += '        padding-bottom: 16px;';
    fullHtml += '        margin-bottom: 30px;';
    fullHtml += '      }';
    fullHtml += '      .headline {';
    fullHtml += '        font-size: 22px;';
    fullHtml += '        font-weight: 900;';
    fullHtml += '        letter-spacing: -0.02em;';
    fullHtml += '        text-transform: uppercase;';
    fullHtml += '        margin: 0 0 6px 0;';
    fullHtml += '      }';
    fullHtml += '      .subtitle {';
    fullHtml += '        font-size: 13px;';
    fullHtml += '        color: #475569;';
    fullHtml += '        margin: 0;';
    fullHtml += '        font-weight: 600;';
    fullHtml += '      }';
    fullHtml += '      .stats {';
    fullHtml += '        display: flex;';
    fullHtml += '        justify-content: space-between;';
    fullHtml += '        font-size: 11px;';
    fullHtml += '        color: #64748b;';
    fullHtml += '        margin-top: 14px;';
    fullHtml += '        font-weight: bold;';
    fullHtml += '        text-transform: uppercase;';
    fullHtml += '        letter-spacing: 0.05em;';
    fullHtml += '      }';
    fullHtml += '      .footer-note {';
    fullHtml += '        margin-top: 40px;';
    fullHtml += '        text-align: center;';
    fullHtml += '        font-size: 10px;';
    fullHtml += '        color: #94a3b8;';
    fullHtml += '        border-top: 1px solid #e2e8f0;';
    fullHtml += '        padding-top: 12px;';
    fullHtml += '        font-weight: 500;';
    fullHtml += '      }';
    fullHtml += '      @media print {';
    fullHtml += '        body {';
    fullHtml += '          padding: 10px;';
    fullHtml += '        }';
    fullHtml += '      }';
    fullHtml += '    </style>';
    fullHtml += '  </head>';
    fullHtml += '  <body>';
    fullHtml += '    <div class="header">';
    fullHtml += '      <h1 class="headline">🇮🇹 Italy Tour 2026 — Packing List</h1>';
    fullHtml += '      <p class="subtitle">Comprehensive Checklist & Companion Tracking Guide</p>';
    fullHtml += '      <div class="stats">';
    fullHtml += '        <span>Progress: ' + progress.completed + ' of ' + progress.total + ' packed (' + progress.percentage + '%)</span>';
    fullHtml += '        <span>Date: ' + todayDate + '</span>';
    fullHtml += '      </div>';
    fullHtml += '    </div>';
    fullHtml += docItemsHtml;
    fullHtml += essentialItemsHtml;
    fullHtml += electronicItemsHtml;
    fullHtml += '    <div class="footer-note">';
    fullHtml += '      Generated via Italy Tour 2026 Travel Companion App';
    fullHtml += '    </div>';
    fullHtml += '    <script>';
    fullHtml += '      window.onload = function() {';
    fullHtml += '        window.print();';
    fullHtml += '      };';
    fullHtml += '    </script>';
    fullHtml += '  </body>';
    fullHtml += '</html>';

    printWindow.document.write(fullHtml);
    printWindow.document.close();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Quick Action Helpers Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
        {/* Laundry Strategy Button */}
        <button
          onClick={() => setShowLaundryModal(true)}
          className="py-3 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 font-extrabold text-xs uppercase tracking-wider rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          id="btn-laundry-toggle"
          title="Laundry Strategy"
        >
          <Droplets className="w-4.5 h-4.5 text-indigo-400 animate-pulse" />
          <span>Laundry Guide</span>
        </button>

        {/* Creative Packing Tips Button */}
        <button
          onClick={() => setShowTipsModal(true)}
          className="py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 font-extrabold text-xs uppercase tracking-wider rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          id="btn-packing-tips-toggle"
          title="Pro Packing Tips"
        >
          <Lightbulb className="w-4.5 h-4.5 text-amber-400" />
          <span>Packing Tips</span>
        </button>

        {/* Recommended Gear Shopping List Button */}
        <button
          onClick={() => setShowShoppingModal(true)}
          className="py-3 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 hover:text-pink-300 font-extrabold text-xs uppercase tracking-wider rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          id="btn-shopping-list-toggle"
          title="Recommended Travel Gear"
        >
          <ShoppingBag className="w-4.5 h-4.5 text-pink-400 animate-pulse" />
          <span>Shopping List</span>
        </button>

        {/* I'm All Packed Toggle Button */}
        <button
          onClick={toggleAllPacked}
          className={`py-3 font-extrabold text-xs uppercase tracking-wider rounded-xl border transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
            progress.completed === progress.total
              ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-450 hover:text-rose-300 border-rose-500/20 hover:border-rose-500/40'
              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border-emerald-500/20 hover:border-emerald-500/40'
          }`}
          id="btn-all-packed"
          title={progress.completed === progress.total ? "Unpack All" : "Mark All Packed"}
        >
          <CheckCircle2 className={`w-4.5 h-4.5 ${progress.completed === progress.total ? 'text-rose-400' : 'text-emerald-400'}`} />
          <span>{progress.completed === progress.total ? "Clear All!" : "I'm All Packed!"}</span>
        </button>
      </div>

      {/* Progress Panel */}
      <div className="glass-panel p-4 flex flex-col gap-3">
        <div className="flex flex-col">
          <div className="flex justify-between items-end">
            <h3 className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Packing Progress</h3>
            <span className="text-emerald-400 text-lg font-black leading-none">{progress.percentage}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
            <motion.div 
              className="bg-emerald-500 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress.percentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Export Printable PDF Button */}
        <button
          onClick={handlePrintPDF}
          className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 font-black text-xs uppercase tracking-wider rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer shadow-md"
          id="btn-print-packing-list"
          title="Export Packing List to PDF"
        >
          <Printer className="w-4 h-4 text-emerald-400" />
          <span>Export Printable PDF</span>
        </button>
      </div>

      {/* Main Checklist Panel */}
      <div className="glass-panel flex-1 flex flex-col overflow-hidden" id="packing-checklist-tabs-container">
        {/* Tabs */}
        <div className="flex flex-wrap border-b border-slate-800 bg-slate-950/20">
          {CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const IconComponent = meta ? meta.icon : Briefcase;
            const iconColorClass = meta ? meta.color : 'text-slate-400';
            const isSelected = activeTab === cat;
            
            const tabLabel = cat === 'Documents & Finance' ? 'DOCUMENTS' 
                           : cat === 'Packing Essentials' ? 'ESSENTIALS'
                           : 'ELECTRONICS';
            
            return (
              <button
                key={cat}
                id={`btn-tab-${cat.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`}
                onClick={() => setActiveTab(cat)}
                className={`flex-1 min-w-[110px] sm:min-w-[120px] px-2 py-3.5 text-xs font-black transition-all relative flex items-center justify-center gap-1.5 cursor-pointer ${
                  isSelected 
                    ? 'text-amber-400 bg-amber-500/5 border-b-2 border-amber-500' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border-b-2 border-transparent'
                }`}
              >
                <IconComponent className={`w-4 h-4 transition-transform group-hover:scale-110 ${isSelected ? iconColorClass : 'text-slate-500 opacity-70'}`} />
                <span className="truncate">{tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Item Add Form */}
        <form onSubmit={handleAddItem} className="p-4 bg-slate-950/40 border-b border-slate-800/70 flex flex-col sm:flex-row gap-2.5 items-stretch">
          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Add custom item (e.g. Extra Sunglasses)..."
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800/85 focus:border-amber-500 text-xs text-slate-200 outline-none placeholder:text-slate-650 transition-colors"
            />
            <input
              type="text"
              placeholder="Subtext / notes (optional)..."
              value={newItemSubtext}
              onChange={(e) => setNewItemSubtext(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800/85 focus:border-amber-500 text-xs text-slate-200 outline-none placeholder:text-slate-650 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>Add Item</span>
          </button>
        </form>

        {/* Checklist Items */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {currentCategoryItems.map((item) => {
              const isChecked = !!checkedItems[item.id];
              const isCustom = item.id.startsWith('custom-');
            
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => toggleItem(item.id)}
                  className="flex items-start gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-slate-900/60 border border-transparent hover:border-slate-850 transition-all group animate-fade-in relative"
                >
                  <div className={`w-5 h-5 flex-shrink-0 border-2 rounded mt-0.5 transition-colors ${
                    isChecked 
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-black' 
                      : 'border-slate-650 group-hover:border-slate-400'
                  }`}>
                    {isChecked && '✓'}
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1 pr-6" id={`packing-item-${item.id}`}>
                    <span 
                      className={`text-sm tracking-tight font-extrabold transition-all duration-300 ${
                        isChecked 
                          ? 'text-slate-500 line-through opacity-50' 
                          : 'text-slate-200 group-hover:text-amber-400'
                      }`}
                    >
                      {item.text}
                    </span>
                    {item.subText && (
                      <span className={`text-[11px] leading-snug transition-all duration-300 ${
                        isChecked ? 'text-slate-600 line-through opacity-40' : 'text-slate-400 font-medium'
                      }`}>
                        {item.subText}
                      </span>
                    )}
                  </div>
                  {isCustom && (
                    <button
                      onClick={(e) => handleDeleteItem(item.id, e)}
                      className="p-1 px-1.5 rounded-lg bg-slate-950 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 border border-slate-850 hover:border-rose-500/30 transition-all cursor-pointer self-center"
                      title="Delete custom item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Print / Export PDF Action Row */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/30 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
              Status: {progress.completed} of {progress.total} Packed ({progress.percentage}%)
            </span>
          </div>
        </div>
      </div>

      {/* Laundry Strategy Pop-Up Modal */}
      <AnimatePresence>
        {showLaundryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowLaundryModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-805/80 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-slate-900 p-5 border-b border-slate-800 flex items-center justify-between z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center border border-indigo-500/25">
                    <Droplets className="w-4.5 h-4.5 text-indigo-400" />
                  </div>
                  <h3 className="text-white font-black text-sm uppercase tracking-wider">Laundry Strategy Guide</h3>
                </div>
                <button
                  onClick={() => setShowLaundryModal(false)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  id="close-laundry-modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <LaundryStrategy />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>      {/* Packing Tips Pop-Up Modal */}
      <AnimatePresence>
        {showTipsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowTipsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-805/80 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-slate-900 p-5 border-b border-slate-800 flex items-center justify-between z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center border border-amber-500/25">
                    <Lightbulb className="w-4.5 h-4.5 text-amber-400" />
                  </div>
                  <h3 className="text-white font-black text-sm uppercase tracking-wider">Pro Packing Strategy</h3>
                </div>
                <button
                  onClick={() => setShowTipsModal(false)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  id="close-tips-modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar flex flex-col gap-6">
                <div>
                  <h4 className="text-amber-400 font-extrabold text-[10px] uppercase tracking-widest mb-1.5">Master Plan Overview</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-justify">
                    Packing light for a diverse 16-day continental tour requires meticulous efficiency. Balancing countryside explorations (Apuane Alps, e-bikes), luxury cruise staterooms (MSC Gala evenings), and sacred sites (historic churches) is easy when you adopt the right strategy.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
                  {/* Category 1 */}
                  <div className="flex flex-col gap-2 bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[10px] font-black tracking-widest text-[#10b981] uppercase flex items-center gap-2">
                       <Briefcase className="w-4 h-4 text-[#10b981]" />
                      1. Checked-Luggage Strategy
                    </span>
                    <div className="flex flex-col gap-2.5 text-slate-300 text-xs mt-1">
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-white">Compression Packing Cubes:</strong> Separate garments by category (Excursion shorts, formal polos, dinner dresses). Rolling clothes rather than folding saves ~30% of space and minimizes wrinkles.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-white">Heavy-Bottom Distribution:</strong> Place walking sneakers, bulkier jackets, and adapters near the wheels to maintain packing balance and avoid tipping suitcases.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-white">Divided Laundry Compartment:</strong> Pack a lightweight draw-string waterproof pouch or separate cube to safely isolate dirty textiles from clean attire.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div className="flex flex-col gap-2 bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase flex items-center gap-2">
                      <Anchor className="w-4 h-4 text-indigo-500" />
                      2. Carry-On & Cabin Backpack
                    </span>
                    <div className="flex flex-col gap-2.5 text-slate-300 text-xs mt-1">
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-white">The 24-Hour Backup Outfit:</strong> Pack a fresh set of clothes, dynamic activewear, underwear, toothbrush, and medication in your flight backpack. If ground-crew or airlines delay checked bags, your first days remain completely stress-free!
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-white">High Value Tech Only:</strong> Never check in valuable electronics, portable power bank adapters, chargers, or your cruise files; always secure them inside cabin-ready storage.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-white">Quick Fluids Access:</strong> Place your TSA 3-1-1 clear toiletry bag at the very top pouch of your carry-on for swift scanning.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div className="flex flex-col gap-2 bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[10px] font-black tracking-widest text-red-400 uppercase flex items-center gap-2">
                      <Shield className="w-4 h-4 text-red-500" />
                      3. Security & Theft Prevention
                    </span>
                    <div className="flex flex-col gap-2.5 text-slate-300 text-xs mt-1">
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-white">RFID-Blocking Neck Pouch:</strong> Wear an under-clothing passport bag or cross-body sling bag particularly in dense crowds (busy train stations, cruise ports, crowded market avenues).
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-450 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-white">Digital Document Clones:</strong> Take offline screenshots and store high-resolution secure PDF files/reservations on local device systems or cloud storage (Google Drive).
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-2.5 h-2.5 text-red-400 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-white">Track Your Suite:</strong> Embed a smart tracking tag (Apple AirTag or Tile device) within checked bags to confidently follow updates at intermediate hub terminals.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category 4 */}
                  <div className="flex flex-col gap-2 bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-amber-500" />
                      4. Italy & Cruise Smart Hacks
                    </span>
                    <div className="flex flex-col gap-2.5 text-slate-300 text-xs mt-1">
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-white">Church Modesty Attire:</strong> Ensure your knees and shoulders are covered when entering historic cathedrals in Tuscany, Sicily, or Spain. Keep a lightweight shawl or cover-up setup inside your active daypack.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-white">Cruise Cabin Magnet Magic:</strong> Cabin walls are completely metallic! Pack heavy-duty magnetic hooks to attach itineraries, hats, and swimsuits to dry on the wall, saving massive table space.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-white">Travel Sheets:</strong> Carry pre-dosed paper detergent sheets and a universal flat sink stopper to hand-wash active undergarments at any countryside washstand on the go.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/70 border border-slate-850 rounded-xl flex gap-3 text-xs text-slate-300">
                  <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <span className="font-extrabold text-white">Universal Rule:</span> Wear your heaviest footwear (like walking sneakers) and bulkier layers (such as fleece, thick trousers, or cardigans) on the long transatlantic flight. This automatically reduces packing volume and avoids airlines overweight fees.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recommended Gear Shopping List Pop-Up Modal */}
      <AnimatePresence>
        {showShoppingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowShoppingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-805/80 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-slate-900 p-5 border-b border-slate-800 flex items-center justify-between z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/15 flex items-center justify-center border border-pink-500/25">
                    <ShoppingBag className="w-4.5 h-4.5 text-pink-400" />
                  </div>
                  <h3 className="text-white font-black text-sm uppercase tracking-wider">Recommended Travel Gear</h3>
                </div>
                <button
                  onClick={() => setShowShoppingModal(false)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  id="close-shopping-modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <ShoppingListTab />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}
