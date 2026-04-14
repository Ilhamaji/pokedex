import React, { useEffect, useState } from "react";
import axios from "axios";
import { getDeckRecommendation } from "../data/metaDecks";

export default function DeckRecommendation({ pokemonName, color, dark = false }) {
  const meta = getDeckRecommendation(pokemonName);
  const [partnerImages, setPartnerImages] = useState({});

  useEffect(() => {
    if (!meta) return;
    async function fetchPartnerImages() {
      const newImages = {};
      for (const partner of meta.partners) {
        if (partner.includes("(Trainer)")) {
          newImages[partner] = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
          continue;
        }
        const cleanName = partner.toLowerCase().replace(" ex", "").replace(" vmax", "").replace(" v", "").trim();
        try {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${cleanName}`);
          newImages[partner] = res.data.sprites.front_default || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
        } catch {
          newImages[partner] = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
        }
      }
      setPartnerImages(newImages);
    }
    fetchPartnerImages();
  }, [meta]);

  if (!meta) return null;

  return (
    <div className={`mt-8 backdrop-blur-xl rounded-3xl p-8 shadow-xl border w-full relative overflow-hidden transition-colors duration-300 ${dark ? "bg-white/5 border-white/10" : "bg-white/80 border-rose-500/30"}`}>
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-400/20 to-transparent blur-3xl -z-10 rounded-full" />

      <div className="flex items-center gap-3 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
        <h3 className={`text-2xl font-black ${dark ? "text-white" : "text-slate-800"}`}>TCG Pocket Meta Deck</h3>
      </div>

      <div className={`p-6 rounded-2xl border shadow-sm transition-colors duration-300 ${dark ? "bg-white/5 border-white/10" : "bg-white/60 border-white/80"}`}>
        <h4 className="text-xl font-bold mb-2 tracking-tight" style={{ color }}>{meta.name}</h4>
        <p className={`leading-relaxed font-medium mb-6 ${dark ? "text-slate-300" : "text-slate-700"}`}>
          {meta.description}
        </p>

        <p className={`font-bold uppercase tracking-wider text-xs mb-3 ${dark ? "text-slate-400" : "text-slate-500"}`}>
          Rekomendasi Partner Tim
        </p>
        <div className="flex flex-wrap gap-4">
          {meta.partners.map((partner, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl shadow-sm border min-w-[100px] hover:-translate-y-1 hover:shadow-md transition-all duration-300 ${dark ? "bg-white/10 border-white/20" : "bg-white border-slate-200/60"}`}
            >
              {partnerImages[partner] ? (
                <img
                  src={partnerImages[partner]}
                  alt={partner}
                  className="w-16 h-16 object-contain drop-shadow-md mb-2"
                  loading="lazy"
                />
              ) : (
                <div className="w-16 h-16 mb-2 rounded-full border-2 border-slate-100 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-slate-200 border-t-rose-400" />
                </div>
              )}
              <span className={`text-xs font-bold text-center ${dark ? "text-white" : "text-slate-800"}`}>{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
