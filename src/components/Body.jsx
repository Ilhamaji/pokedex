import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Body({ searchTerm }) {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(
    `${import.meta.env.VITE_POKEAPI_BASE_URL}/pokemon?limit=24`
  );
  const [loading, setLoading] = useState(false);
  const { dark } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchInitial() {
      setLoading(true);
      try {
        if (searchTerm) {
          const res = await axios.get(
            `${import.meta.env.VITE_POKEAPI_BASE_URL}/pokemon/${searchTerm.toLowerCase()}`
          );
          setPokemons([
            {
              name: res.data.name,
              url: `${import.meta.env.VITE_POKEAPI_BASE_URL}/pokemon/${res.data.name}`,
            },
          ]);
          setNextUrl(null);
        } else {
          const res = await axios.get(
            `${import.meta.env.VITE_POKEAPI_BASE_URL}/pokemon?limit=24`
          );
          setPokemons(res.data.results);
          setNextUrl(res.data.next);
        }
      } catch {
        if (searchTerm) setPokemons([]);
      }
      setLoading(false);
    }
    fetchInitial();
  }, [searchTerm]);

  const loadMore = async () => {
    if (!nextUrl || loading) return;
    setLoading(true);
    try {
      const res = await axios.get(nextUrl);
      setPokemons((prev) => {
        const existingNames = new Set(prev.map((p) => p.name));
        return [...prev, ...res.data.results.filter((p) => !existingNames.has(p.name))];
      });
      setNextUrl(res.data.next);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <section className={`relative px-6 md:px-10 pt-16 pb-20 min-h-screen transition-colors duration-300 ${dark ? "bg-gray-950" : "bg-slate-50"}`}>
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-rose-500 font-bold uppercase tracking-widest text-xs mb-2">
            {searchTerm ? t("body.search_results") : t("body.pokedex_national")}
          </p>
          <h2 className={`text-4xl font-black leading-tight ${dark ? "text-white" : "text-slate-900"}`}>
            {searchTerm ? (
              <>{t("body.showing")}<span className="text-rose-500 capitalize">{searchTerm}</span></>
            ) : (
              <>{t("body.all")}<span className="text-rose-500">{t("body.pokemon")}</span></>
            )}
          </h2>
        </div>
        <p className={`text-sm font-medium ${dark ? "text-slate-400" : "text-slate-500"}`}>
          {pokemons.length} {t("body.count")}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 w-full max-w-7xl mx-auto">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
        {loading && [...Array(12)].map((_, i) => (
          <div key={`sk-${i}`} className="shimmer rounded-2xl" style={{ height: "200px" }} />
        ))}
      </div>

      {/* Empty State */}
      {pokemons.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-6xl mb-4">😕</div>
          <p className={`text-2xl font-black mb-2 ${dark ? "text-white" : "text-slate-700"}`}>{t("body.not_found")}</p>
          <p className={dark ? "text-slate-400" : "text-slate-500"}>
            {t("body.not_found_desc", { searchTerm })}
          </p>
        </div>
      )}

      {/* Load More */}
      {!searchTerm && nextUrl && !loading && (
        <div className="flex justify-center mt-16">
          <button
            onClick={loadMore}
            className="group relative px-10 py-4 font-bold text-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            style={{ background: "linear-gradient(135deg, #e11d48, #be123c)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {t("body.load_more")}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      )}
    </section>
  );
}
