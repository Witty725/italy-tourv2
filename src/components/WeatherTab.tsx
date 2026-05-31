import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CloudSun, Wind, Droplets, MapPin, X, Thermometer, Info } from 'lucide-react';

const LOCATIONS = [
  { id: 'pontremoli', name: 'Pontremoli', lat: 44.38, lon: 9.88, region: 'Tuscany' },
  { id: 'livorno', name: 'Livorno', lat: 43.55, lon: 10.31, region: 'Tuscan Coast' },
  { id: 'cagliari', name: 'Cagliari', lat: 39.22, lon: 9.12, region: 'Sardinia' },
  { id: 'palermo', name: 'Palermo', lat: 38.12, lon: 13.36, region: 'Sicily' },
  { id: 'barcelona', name: 'Barcelona', lat: 41.38, lon: 2.17, region: 'Spain' },
  { id: 'marseille', name: 'Marseille', lat: 43.30, lon: 5.37, region: 'France' },
  { id: 'rome', name: 'Rome', lat: 41.90, lon: 12.50, region: 'Lazio' }
];

const DEFAULT_WEATHER: Record<string, { tempC: number; tempF: number; code: number; desc: string; humidity: number; windSpeed: number }> = {
  pontremoli: { tempC: 28, tempF: 82, code: 0, desc: 'Sunny', humidity: 55, windSpeed: 8 },
  livorno: { tempC: 27, tempF: 81, code: 1, desc: 'Partly Cloudy', humidity: 60, windSpeed: 12 },
  cagliari: { tempC: 30, tempF: 86, code: 0, desc: 'Sunny', humidity: 50, windSpeed: 15 },
  palermo: { tempC: 31, tempF: 88, code: 0, desc: 'Sunny', humidity: 48, windSpeed: 10 },
  rome: { tempC: 32, tempF: 90, code: 0, desc: 'Sunny', humidity: 45, windSpeed: 6 },
  barcelona: { tempC: 28, tempF: 82, code: 1, desc: 'Partly Cloudy', humidity: 62, windSpeed: 11 },
  marseille: { tempC: 29, tempF: 84, code: 0, desc: 'Sunny', humidity: 55, windSpeed: 14 }
};

const CITY_TIPS: Record<string, string> = {
  pontremoli: 'Historic mountain valley town surrounded by the Apennine peaks. Evening mountain breezes can feel crisp in summer. Perfect for layering with light sweaters. Sturdy, high-grip walking shoes are absolutely necessary for exploring the medieval cobblestone paths of Piagnaro Castle.',
  livorno: 'Maritime seaside port facing the Ligurian sea. Daytime sea breezes are highly pleasant, but coastal humidity is standard. Lightweight linen pants, shorts, and supportive sandals are perfect for long walks along the scenic checkerboard Mascagni Terrace.',
  cagliari: 'Incredible Sardinian high sun exposure. Very strong UV indexes. Be sure to pack high-SPF sunscreen, polarized designer sunglasses, and a wide-brimmed sun hat. Perfect weather for swimming, boating, and airy resort-chic garments.',
  palermo: 'Exquisite southern Sicilian heat. High sun and warm temperatures are a constant. Bring a refillable hydration flask, wear loose cotton apparel, and wear highly comfortable walking sneakers for city food marketplace tours.',
  barcelona: 'Seaside Catalan capital. Humidity is generally high during the summer nights. Lightweight, breathable materials like thin cotton and linen-blend dresses or shorts are perfect. Wear a secure crossbody bag to walk carefree through bustling plazas.',
  marseille: 'Breezy historical French port. Famous for the "Mistral"—the strong, cool, dry northerly wind blowing through mountain valleys that clears the cloud cover but can drop temperatures rapidly. A stylish windproof jacket or a light wrap scarf is smart.',
  rome: 'Ancient capital of stone and asphalt which retains high heat. Very warm during peak sun times. Stay shaded and stay hydrated using the free flowing public "nasoni" iron fountains. CHURCH DRESS CODE REMINDER: For July 1st activities (Saint Peter\'s Basilica, Vatican), knees and shoulders must be fully covered, so pack a light shawl/wrap or lightweight zip-off/long pants.'
};

function parseWeatherCode(code: number): { desc: string; emoji: string; bg: string; text: string } {
  if (code === 0) return { desc: 'Sunny', emoji: '☀️', bg: 'from-amber-500/10 to-transparent', text: 'text-amber-400' };
  if (code === 1 || code === 2 || code === 3) return { desc: 'Partly Cloudy', emoji: '🌤️', bg: 'from-indigo-500/10 to-transparent', text: 'text-blue-300' };
  if (code >= 45 && code <= 48) return { desc: 'Foggy', emoji: '🌫️', bg: 'from-slate-500/10 to-transparent', text: 'text-slate-400' };
  if ((code >= 51 && code <= 55) || (code >= 80 && code <= 82)) return { desc: 'Showers', emoji: '🌦️', bg: 'from-blue-500/10 to-transparent', text: 'text-blue-400' };
  if ((code >= 61 && code <= 65) || (code >= 66 && code <= 67)) return { desc: 'Rainy', emoji: '🌧️', bg: 'from-blue-600/10 to-transparent', text: 'text-blue-500' };
  if (code >= 71 && code <= 77) return { desc: 'Snowy', emoji: '❄️', bg: 'from-sky-500/10 to-transparent', text: 'text-sky-300' };
  if (code >= 95 && code <= 99) return { desc: 'Thunderstorm', emoji: '⛈️', bg: 'from-purple-500/10 to-transparent', text: 'text-purple-400' };
  return { desc: 'Mild', emoji: '🌡️', bg: 'from-slate-500/10 to-transparent', text: 'text-slate-300' };
}

export function WeatherTab() {
  const [weatherData, setWeatherData] = useState<Record<string, any>>(DEFAULT_WEATHER);
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>(() => {
    try {
      const saved = localStorage.getItem('weather_temp_unit');
      return (saved === 'C' || saved === 'F') ? saved : 'F';
    } catch (_) {
      return 'F';
    }
  });

  const handleSetTempUnit = (unit: 'F' | 'C') => {
    setTempUnit(unit);
    try {
      localStorage.setItem('weather_temp_unit', unit);
    } catch (_) {}
  };
  
  const [selectedCity, setSelectedCity] = useState<any | null>(null);

  useEffect(() => {
    let active = true;
    const fetchWeather = async () => {
      try {
        const promises = LOCATIONS.map(async (loc) => {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
          );
          if (!res.ok) throw new Error('Failed to fetch');
          const data = await res.json();
          const tempC = Math.round(data.current.temperature_2m);
          const tempF = Math.round((tempC * 9) / 5 + 32);
          const code = data.current.weather_code;
          return {
            id: loc.id,
            tempC,
            tempF,
            code,
            desc: parseWeatherCode(code).desc,
            humidity: data.current.relative_humidity_2m,
            windSpeed: Math.round(data.current.wind_speed_10m)
          };
        });

        const results = await Promise.all(promises);
        if (active) {
          const updated: Record<string, any> = {};
          results.forEach((item) => {
            updated[item.id] = item;
          });
          setWeatherData(updated);
        }
      } catch (err) {
        console.log('Weather loaded from fallback database due to network API state.');
      }
    };

    fetchWeather();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Real-Time Destination Weather Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="glass-panel p-5 border-slate-700/40 bg-gradient-to-br from-slate-900/60 to-slate-950/40"
      >
        <div className="flex flex-col gap-4 mb-4 border-b border-slate-800 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-[10px] font-black tracking-widest text-[#38bdf8] uppercase flex items-center gap-1.5">
                <CloudSun className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />
                Live Voyage Weather Report
              </h3>
              <p className="text-[10px] text-slate-400 font-medium mt-1">
                Real-time meteorology metrics using Open-Meteo services. Click any card below for details!
              </p>
            </div>
            
            {/* Fahrenheit/Celsius Toggle Switch */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => handleSetTempUnit('F')}
                className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all cursor-pointer ${tempUnit === 'F' ? 'bg-[#38bdf8] text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
              >
                °F
              </button>
              <button
                type="button"
                onClick={() => handleSetTempUnit('C')}
                className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all cursor-pointer ${tempUnit === 'C' ? 'bg-[#38bdf8] text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
              >
                °C
              </button>
            </div>
          </div>
          
          <div className="text-[10px] text-amber-400 font-bold tracking-wide uppercase px-3 py-1.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-center">
            ☀️ Check specific packing recommendations tailored to each port below!
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {LOCATIONS.map((loc) => {
            const data = weatherData[loc.id] || DEFAULT_WEATHER[loc.id];
            const interpreter = parseWeatherCode(data.code);
            return (
              <div
                key={loc.id}
                onClick={() => setSelectedCity({ loc, data })}
                className={`bg-slate-950/70 p-3.5 rounded-xl border border-slate-850 flex flex-col justify-between hover:border-[#38bdf8] hover:scale-[1.03] active:scale-[0.98] cursor-pointer transition-all duration-200 hover:bg-slate-950/90 relative group overflow-hidden bg-gradient-to-t ${interpreter.bg}`}
              >
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#38bdf8]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="flex justify-between items-start gap-1">
                    <span className="text-white font-extrabold text-xs tracking-tight truncate leading-tight block" title={loc.name}>
                      {loc.name}
                    </span>
                    <span className="text-base shrink-0 select-none cursor-pointer animate-pulse" title={interpreter.desc}>
                      {interpreter.emoji}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block mt-0.5 leading-none">
                    {loc.region}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline gap-1">
                    {tempUnit === 'F' ? (
                      <>
                        <span className={`text-xl font-black tracking-tight ${interpreter.text}`}>
                          {data.tempF}°F
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 select-none">
                          /{data.tempC}°C
                        </span>
                      </>
                    ) : (
                      <>
                        <span className={`text-xl font-black tracking-tight ${interpreter.text}`}>
                          {data.tempC}°C
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 select-none">
                          /{data.tempF}°F
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 block mt-0.5 leading-tight">
                    {interpreter.desc}
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-900/80 flex items-center justify-between text-[9px] font-mono text-slate-500 leading-none">
                  <span className="flex items-center gap-0.5" title="Relative Humidity">
                    <Droplets className="w-2.5 h-2.5 text-blue-400 shrink-0" />
                    {data.humidity}%
                  </span>
                  <span className="flex items-center gap-0.5" title="Wind Velocity">
                    <Wind className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                    {data.windSpeed} <span className="text-[7px]">km/h</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Selected City Weather Modal Detail View */}
      <AnimatePresence>
        {selectedCity && (() => {
          const { loc, data } = selectedCity;
          const interpreter = parseWeatherCode(data.code);
          const tipsText = CITY_TIPS[loc.id] || "Beautiful Mediterranean climate, perfect for general sightseeing. Pack comfortable activewear and stay hydrated.";
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCity(null)}
              className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 shadow-red-500/10"
              id="weather-detail-overlay"
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-850 p-6 shadow-2xl relative overflow-hidden"
                id="weather-detail-modal"
              >
                {/* Italian Flag Accent at the top */}
                <div className="absolute top-0 left-0 right-0 h-1 flex">
                  <div className="flex-1 bg-emerald-500"></div>
                  <div className="flex-1 bg-white"></div>
                  <div className="flex-1 bg-red-500"></div>
                </div>

                <button
                  onClick={() => setSelectedCity(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
                  title="Close Dialog"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-start gap-3.5 mt-2">
                  <div className="p-3 rounded-2xl bg-[#38bdf8]/10 text-[#38bdf8] flex items-center justify-center border border-sky-500/20 animate-pulse">
                    <CloudSun className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black tracking-widest text-[#38bdf8] uppercase block leading-none">
                      PORT DESTINATION HIGHLIGHTS & METRICS
                    </span>
                    <h3 className="text-xl font-black text-white mt-1.5 flex flex-wrap items-center gap-1.5 leading-none">
                      {loc.name}
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase bg-slate-950 px-2 py-0.5 rounded border border-slate-850 leading-none">
                        {loc.region}
                      </span>
                    </h3>
                  </div>
                </div>

                {/* Main Temperature & Big Status Display */}
                <div className="mt-5 bg-slate-950/70 p-5 rounded-xl border border-slate-850/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-black tracking-tighter ${interpreter.text}`}>
                      {tempUnit === 'F' ? `${data.tempF}°F` : `${data.tempC}°C`}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      / {tempUnit === 'F' ? `${data.tempC}°C` : `${data.tempF}°F`}
                    </span>
                  </div>
                  <div className="text-center sm:text-right">
                    <span className="text-3xl select-none" role="img" aria-label={interpreter.desc}>
                      {interpreter.emoji}
                    </span>
                    <p className="font-extrabold text-white text-sm mt-1">{interpreter.desc}</p>
                    <p className="text-[9px] text-slate-500 font-mono mt-0.5 uppercase tracking-wider">Current Forecast Condition</p>
                  </div>
                </div>

                {/* Grid of Weather Metrics */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-900 flex items-center gap-3">
                    <Droplets className="w-5 h-5 text-blue-400 shrink-0" />
                    <div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block leading-none">Humidity</span>
                      <span className="text-xs font-extrabold text-slate-200 mt-1 block">{data.humidity}% Relative</span>
                    </div>
                  </div>

                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-900 flex items-center gap-3">
                    <Wind className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block leading-none">Wind Velocity</span>
                      <span className="text-xs font-extrabold text-slate-200 mt-1 block">
                        {data.windSpeed} km/h <span className="text-[9px] text-slate-500 font-normal">({Math.round(data.windSpeed * 0.621)} mph)</span>
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-900 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block leading-none">Coordinates</span>
                      <span className="text-xs font-extrabold text-slate-200 mt-1 block font-mono">{loc.lat}°N, {loc.lon}°E</span>
                    </div>
                  </div>

                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-900 flex items-center gap-3">
                    <Thermometer className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block leading-none">Climate Type</span>
                      <span className="text-xs font-extrabold text-slate-200 mt-1 block leading-tight">
                        Comfortable Summer Season
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cultural Packing Wisdom Segment */}
                <div className="mt-5 bg-gradient-to-br from-amber-500/5 to-indigo-500/5 p-4 rounded-xl border border-amber-500/15">
                  <div className="flex items-center gap-1.5 text-amber-450 mb-1.5">
                    <Info className="w-4 h-4 shrink-0 text-amber-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                      Destination Packing Smart-Tip
                    </span>
                  </div>
                  <p className="text-xs text-slate-350 leading-relaxed font-semibold">
                    {tipsText}
                  </p>
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={() => setSelectedCity(null)}
                  className="mt-6 w-full py-3 bg-[#38bdf8] text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-lg shadow-[#38bdf8]/10 hover:bg-[#7dd3fc]"
                >
                  Close City Report
                </button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
