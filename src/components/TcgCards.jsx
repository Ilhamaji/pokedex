import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function TcgCards({ pokemonName, color, dark = false }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const scrollRef = useRef(null);

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
    <div className={`mt-10 backdrop-blur-xl rounded-3xl shadow-xl border w-full relative overflow-hidden transition-all duration-300 ${dark ? "bg-white/5 border-white/10" : "bg-white/80 border-white/60"}`}>
      {/* Top Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-rose-400 to-rose-600"></div>

      {/* Content Padding */}
      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`text-2xl font-black tracking-tight ${dark ? "text-white" : "text-slate-800"}`}>
              TCG Gallery
            </h3>
          </div>
          <p className={`font-medium text-sm flex items-center gap-2 ${dark ? "text-slate-400" : "text-slate-500"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Scroll horizontal untuk menjelajahi kartu koleksi {pokemonName}.
          </p>
        </div>

        {/* Gallery Area */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-6 pt-2 px-2 snap-x snap-mandatory scroll-smooth custom-scrollbar"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {cards.map(card => (
              <div
                key={card.id}
                className="w-32 md:w-44 snap-center shrink-0 group perspective cursor-pointer"
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
            ))}
          </div>

          {/* Fade Hints */}
          <div className={`pointer-events-none absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-black/0 to-transparent z-10`} />
          <div className={`pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-black/0 to-transparent z-10`} />
        </div>
      </div>
    </div>
  );
}
