import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function TcgCards({ pokemonName, color, dark = false }) {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [sortBy, setSortBy] = useState("releaseDate");
  const [filterType, setFilterType] = useState("All");
  const [filterStage, setFilterStage] = useState("All");
  const scrollRef = useRef(null);

  const availableTypes = useMemo(() => {
    const types = new Set();
    cards.forEach(c => {
      if (c.types) c.types.forEach(t => types.add(t));
    });
    return ["All", ...Array.from(types).sort()];
  }, [cards]);

  const availableStages = useMemo(() => {
    const stages = new Set();
    cards.forEach(c => {
      if (c.subtypes) c.subtypes.forEach(s => stages.add(s));
    });
    return ["All", ...Array.from(stages).sort()];
  }, [cards]);

  const processedCards = useMemo(() => {
    const filtered = cards.filter(a => {
      const typeMatch = filterType === "All" || (a.types && a.types.includes(filterType));
      const stageMatch = filterStage === "All" || (a.subtypes && a.subtypes.includes(filterStage));
      return typeMatch && stageMatch;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "releaseDate") {
        return new Date(b.set.releaseDate || 0) - new Date(a.set.releaseDate || 0);
      } else if (sortBy === "element") {
        const typeA = a.types ? a.types[0] : "Z";
        const typeB = b.types ? b.types[0] : "Z";
        return typeA.localeCompare(typeB);
      } else if (sortBy === "stage") {
        const stageA = a.subtypes ? a.subtypes[0] : "Z";
        const stageB = b.subtypes ? b.subtypes[0] : "Z";
        return stageA.localeCompare(stageB);
      } else if (sortBy === "rarity") {
        const rarityA = a.rarity || "Z";
        const rarityB = b.rarity || "Z";
        return rarityA.localeCompare(rarityB);
      }
      return 0;
    });
  }, [cards, sortBy, filterType, filterStage]);

  useEffect(() => {
    async function fetchTcg() {
      if (!pokemonName) return;
      setLoading(true);
      setError(false);
      try {
        const config = {
          params: {
            q: `name:"${pokemonName.replace('-', ' ')}"`,
            pageSize: 15,
            orderBy: "-set.releaseDate"
          }
        };
        if (import.meta.env.VITE_TCG_API_KEY) {
          config.headers = { "X-Api-Key": import.meta.env.VITE_TCG_API_KEY };
        }
        const res = await axios.get("https://api.pokemontcg.io/v2/cards", config);
        setCards(res.data.data);
      } catch (err) {
        console.error("Failed to fetch TCG cards:", err);
        setError(true);
      }
      setLoading(false);
    }
    fetchTcg();
  }, [pokemonName]);

  // Convert vertical wheel scroll → horizontal scroll when hovering over the gallery
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (!isHovering) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY * 2, behavior: "smooth" });
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [isHovering]);

  if (loading) {
    return (
      <div className={`mt-10 h-64 w-full rounded-3xl animate-pulse flex items-center justify-center ${dark ? "bg-white/5" : "bg-white/40"}`}>
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-rose-400"></div>
      </div>
    );
  }

  if (error || cards.length === 0) return null;

  return (
    <div className={`mt-10 backdrop-blur-xl rounded-2xl shadow-xl border w-full relative overflow-hidden transition-all duration-300 ${dark ? "bg-white/5 border-white/10" : "bg-white/80 border-white/60"}`}>
      {/* Structural Header Accent — clipped by overflow-hidden */}
      <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-rose-400 to-rose-600"></div>

      {/* Content Padding */}
      <div className="p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`text-2xl font-black tracking-tight ${dark ? "text-white" : "text-slate-800"}`}>
                {t("tcg.title")}
              </h3>
            </div>
            <p className={`font-medium text-sm flex items-center gap-2 ${dark ? "text-slate-400" : "text-slate-500"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {t("tcg.scroll_hint", { pokemonName })}
            </p>
          </div>

          {/* Controls: Filter & Sort */}
          <div className="flex flex-wrap items-center justify-end gap-4 mt-4 md:mt-0">
            {/* Filter by Element */}
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${dark ? "text-slate-400" : "text-slate-500"}`}>
                {t("tcg.filter.element", { defaultValue: "Element:" })}
              </span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`text-sm font-bold rounded-xl px-3 py-1.5 border outline-none cursor-pointer transition-colors ${
                  dark 
                    ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {availableTypes.map(type => (
                  <option key={type} value={type} className="text-slate-800">
                    {type === "All" ? t("tcg.filter.all", { defaultValue: "All" }) : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Stage */}
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${dark ? "text-slate-400" : "text-slate-500"}`}>
                {t("tcg.filter.stage", { defaultValue: "Stage:" })}
              </span>
              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className={`text-sm font-bold rounded-xl px-3 py-1.5 border outline-none cursor-pointer transition-colors ${
                  dark 
                    ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {availableStages.map(stage => (
                  <option key={stage} value={stage} className="text-slate-800">
                    {stage === "All" ? t("tcg.filter.all", { defaultValue: "All" }) : stage}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${dark ? "text-slate-400" : "text-slate-500"}`}>
                {t("tcg.sort.label", { defaultValue: "Sort By:" })}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`text-sm font-bold rounded-xl px-3 py-1.5 border outline-none cursor-pointer transition-colors ${
                  dark 
                    ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <option value="releaseDate" className="text-slate-800">{t("tcg.sort.releaseDate", { defaultValue: "Release Date" })}</option>
                <option value="element" className="text-slate-800">{t("tcg.sort.element", { defaultValue: "Element (Type)" })}</option>
                <option value="stage" className="text-slate-800">{t("tcg.sort.stage", { defaultValue: "Stage" })}</option>
                <option value="rarity" className="text-slate-800">{t("tcg.sort.rarity", { defaultValue: "Rarity" })}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gallery Area */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-12 pt-10 px-4 snap-x snap-mandatory scroll-smooth custom-scrollbar"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {processedCards.length > 0 ? (
              processedCards.map(card => (
                <div
                  key={card.id}
                  className="w-32 md:w-44 snap-center shrink-0 group perspective cursor-pointer relative transition-all duration-300 hover:z-50"
                >
                  <a href={card.tcgplayer?.url} target="_blank" rel="noopener noreferrer">
                    <div className="relative overflow-visible">
                      <img
                        src={card.images.large}
                        alt={card.name}
                        loading="lazy"
                        className="w-full rounded-2xl drop-shadow-lg transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:scale-[1.08] group-hover:drop-shadow-[0_20px_25px_rgba(0,0,0,0.3)] group-hover:rotate-1"
                      />
                      {/* Gloss Hint overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                    <div className="text-center mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <p className={`text-[10px] font-black uppercase tracking-widest truncate ${dark ? "text-slate-300" : "text-slate-700"}`}>
                        {card.set.name}
                      </p>
                      <p className="text-[10px] font-black text-rose-500 uppercase">{card.rarity || 'Common'}</p>
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <div className="w-full py-10 flex flex-col items-center justify-center">
                 <p className={`text-sm font-bold ${dark ? "text-slate-400" : "text-slate-500"}`}>
                   {t("tcg.no_cards_match", { defaultValue: "No cards match the selected filters." })}
                 </p>
              </div>
            )}
          </div>

          {/* Fade Hints */}
          <div className={`pointer-events-none absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-black/0 to-transparent z-10`} />
          <div className={`pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-black/0 to-transparent z-10`} />
        </div>
      </div>
    </div>
  );
}
