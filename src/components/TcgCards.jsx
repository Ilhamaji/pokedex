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
      <div className="flex justify-center items-center h-48 mt-12 w-full bg-white/40 backdrop-blur-md rounded-3xl animate-pulse">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-white" style={{ borderTopColor: color }}></div>
      </div>
    );
  }

  if (error || cards.length === 0) return null;

  return (
    <div className={`mt-12 backdrop-blur-xl rounded-3xl p-8 shadow-xl border transition-colors duration-300 ${dark ? "bg-white/5 border-white/10" : "bg-white/80 border-white/60"}`}>
      <h3 className="text-2xl font-black mb-2" style={{ color: color }}>TCG Gallery</h3>
      <p className="text-slate-500 font-medium text-sm mb-5 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block opacity-60" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        Arahkan kursor &amp; scroll untuk menjelajahi kartu {pokemonName}.
      </p>

      {/* Scroll track indicator */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-5 pb-5 pt-2 px-2 snap-x snap-mandatory scroll-smooth custom-scrollbar"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {cards.map(card => (
            <div
              key={card.id}
              className="w-28 md:w-40 snap-center shrink-0 group perspective cursor-pointer"
            >
              <a href={card.tcgplayer?.url} target="_blank" rel="noopener noreferrer">
                <div className="relative overflow-visible">
                  <img
                    src={card.images.large}
                    alt={card.name}
                    loading="lazy"
                    className="w-full rounded-2xl drop-shadow-lg transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-[1.05] group-hover:drop-shadow-2xl group-hover:rotate-1"
                  />
                  {/* Glass overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <div className="text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs font-bold text-slate-700 tracking-tight truncate">{card.set.name}</p>
                  <p className="text-xs font-semibold text-rose-500">{card.rarity || 'Common'}</p>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Scroll fade hints on left and right */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-white/60 to-transparent rounded-l-xl" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white/60 to-transparent rounded-r-xl" />
      </div>
    </div>
  );
}
