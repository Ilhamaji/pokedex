import React, { useEffect, useState } from "react";
import axios from "axios";
import { getDeckRecommendation } from "../data/metaDecks";
import { useTranslation } from "react-i18next";

export default function DeckRecommendation({ pokemonName, color, dark = false }) {
  const { t } = useTranslation();
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
    <div className={`mt-10 backdrop-blur-xl rounded-2xl shadow-xl border w-full relative overflow-hidden transition-all duration-300 ${dark ? "bg-white/5 border-white/10" : "bg-white/80 border-white/60"}`}>
      {/* Structural Header Accent — clipped by overflow-hidden */}
      <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-rose-400 to-rose-600"></div>

      {/* Content Padding */}
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-xl ${dark ? "bg-rose-500/20" : "bg-rose-50"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className={`text-2xl font-black tracking-tight ${dark ? "text-white" : "text-slate-800"}`}>
            {t("tcg.meta_title")}
          </h3>
        </div>

        {/* Deck Info Area */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-bold mb-2 tracking-tight flex items-center gap-2" style={{ color }}>
              <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: color }}></span>
              {t(`decks.${pokemonName.toLowerCase()}.name`, { defaultValue: meta.name })}
            </h4>
            <p className={`leading-relaxed font-medium ${dark ? "text-slate-300" : "text-slate-700"}`}>
              {t(`decks.${pokemonName.toLowerCase()}.description`, { defaultValue: meta.description })}
            </p>
          </div>

          <div className={`pt-6 border-t ${dark ? "border-white/10" : "border-slate-100"}`}>
            <p className={`font-bold uppercase tracking-wider text-xs mb-4 ${dark ? "text-slate-400" : "text-slate-500"}`}>
              {t("tcg.partners")}
            </p>
            <div className="flex flex-wrap gap-4 pt-4 pb-2">
              {meta.partners.map((partner, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl shadow-sm border min-w-[110px] hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 relative hover:z-50 ${dark ? "bg-white/10 border-white/20" : "bg-white border-slate-200/60"}`}
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
                  <span className={`text-[11px] font-black text-center leading-tight uppercase tracking-tight ${dark ? "text-slate-200" : "text-slate-800"}`}>
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
