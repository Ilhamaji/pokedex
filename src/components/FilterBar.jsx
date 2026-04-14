import React from 'react';
import { useTranslation } from 'react-i18next';
import { getTypeColor } from '../utils/colors';

const POKEMON_TYPES = [
  "All", "normal", "fire", "water", "grass", "electric", "ice", "fighting",
  "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
  "dragon", "dark", "steel", "fairy"
];

const GENERATIONS = [
  { id: "All", label: "All Gens" },
  { id: "generation-i", label: "Gen 1" },
  { id: "generation-ii", label: "Gen 2" },
  { id: "generation-iii", label: "Gen 3" },
  { id: "generation-iv", label: "Gen 4" },
  { id: "generation-v", label: "Gen 5" },
  { id: "generation-vi", label: "Gen 6" },
  { id: "generation-vii", label: "Gen 7" },
  { id: "generation-viii", label: "Gen 8" },
  { id: "generation-ix", label: "Gen 9" }
];

export default function FilterBar({ filterType, setFilterType, filterGen, setFilterGen, filterMetaOnly, setFilterMetaOnly, dark }) {
  const { t } = useTranslation();

  return (
    <div className={`w-full sm:w-auto sm:max-w-fit px-5 sm:px-6 py-5 sm:py-4 rounded-[2rem] sm:rounded-full flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-8 items-stretch sm:items-center justify-center shadow-md backdrop-blur-xl border ${dark ? "bg-white/5 border-white/10 shadow-black/20" : "bg-white/80 border-white/60 shadow-slate-200/50"}`}>
      {/* Container upgraded to floating glassmorphism pill */}
        
        {/* Type Filter */}
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <span className={`text-xs font-bold uppercase tracking-wider ${dark ? "text-slate-400" : "text-slate-500"}`}>
            {t("filter.element", { defaultValue: "Element:" })}
          </span>
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`appearance-none text-sm font-bold rounded-xl pl-4 pr-10 py-2 border outline-none cursor-pointer transition-colors ${
                dark 
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {POKEMON_TYPES.map(type => (
                <option key={type} value={type} className="text-slate-800 capitalize">
                  {type === "All" ? t("filter.all", { defaultValue: "All Elements" }) : type}
                </option>
              ))}
            </select>
            {/* Custom arrow */}
            <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${dark ? "text-slate-300" : "text-slate-500"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Color Indicator */}
            {filterType !== 'All' && (
              <span className="absolute -left-1.5 -top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: getTypeColor(filterType) }}></span>
            )}
          </div>
        </div>

        {/* Generation Filter */}
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <span className={`text-xs font-bold uppercase tracking-wider ${dark ? "text-slate-400" : "text-slate-500"}`}>
            {t("filter.generation", { defaultValue: "Generation:" })}
          </span>
          <div className="relative">
            <select
              value={filterGen}
              onChange={(e) => setFilterGen(e.target.value)}
              className={`appearance-none text-sm font-bold rounded-xl pl-4 pr-10 py-2 border outline-none cursor-pointer transition-colors ${
                dark 
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {GENERATIONS.map(gen => (
                <option key={gen.id} value={gen.id}  className="text-slate-800">
                  {gen.label}
                </option>
              ))}
            </select>
            {/* Custom arrow */}
            <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${dark ? "text-slate-300" : "text-slate-500"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Vertical Divider Replacement for Meta Toggle */}
        <div className={`hidden sm:block h-6 w-px ${dark ? "bg-white/20" : "bg-slate-300"}`}></div>

        {/* Meta Deck Toggle */}
        <div className="flex items-center justify-center sm:justify-start mt-2 sm:mt-0">
          <button
            onClick={() => setFilterMetaOnly(!filterMetaOnly)}
            className={`relative w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 overflow-hidden ${
              filterMetaOnly 
                ? (dark ? "text-white shadow-rose-500/20 shadow-lg scale-100 sm:scale-105" : "text-white shadow-rose-400/30 shadow-lg scale-100 sm:scale-105") 
                : (dark ? "text-slate-400 hover:text-slate-200 bg-white/5 hover:bg-white/10" : "text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200")
            }`}
          >
            {filterMetaOnly && (
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-600 rounded-full" />
            )}
            <span className="relative z-10 flex items-center gap-1.5 drop-shadow-sm">
              <span className={`text-base leading-none ${filterMetaOnly ? "animate-pulse" : "opacity-70 grayscale"}`}>🌟</span>
              Meta Deck
            </span>
          </button>
        </div>

      </div>
  );
}
