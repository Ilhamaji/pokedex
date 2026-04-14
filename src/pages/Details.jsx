import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getTypeColor, getBgColor } from "../utils/colors";
import TcgCards from "../components/TcgCards";
import DeckRecommendation from "../components/DeckRecommendation";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { translateText } from "../utils/translate";

const REGION_MAP = {
  "generation-i": "Kanto",
  "generation-ii": "Johto",
  "generation-iii": "Hoenn",
  "generation-iv": "Sinnoh",
  "generation-v": "Unova",
  "generation-vi": "Kalos",
  "generation-vii": "Alola",
  "generation-viii": "Galar",
  "generation-ix": "Paldea",
};

export default function Details() {
  const { t } = useTranslation();
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [translatedDescription, setTranslatedDescription] = useState("");
  const { i18n } = useTranslation();
  const { dark } = useTheme();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const pRes = await axios.get(
          `${import.meta.env.VITE_POKEAPI_BASE_URL}/pokemon/${name}`,
        );
        setData(pRes.data);

        const sRes = await axios.get(pRes.data.species.url);
        setSpecies(sRes.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetchData();
  }, [name]);

  // Get English description
  const enDescription = species?.flavor_text_entries
    ?.find((e) => e.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ");

  useEffect(() => {
    if (enDescription) {
      if (i18n.language === "id") {
        translateText(enDescription, "id").then(setTranslatedDescription);
      } else {
        setTranslatedDescription(enDescription);
      }
    }
  }, [enDescription, i18n.language]);

  if (loading || !data) {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${dark ? "bg-gray-950" : "bg-slate-50"}`}>
        <Nav />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-rose-500"></div>
        </div>
      </div>
    );
  }

  const mainType = data.types[0].type.name;
  const bgColor = getBgColor(mainType);
  const color = getTypeColor(mainType);
  const sprite =
    data.sprites.other["official-artwork"].front_default ||
    data.sprites.front_default ||
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

  const description = translatedDescription || enDescription;

  const region = species?.generation?.name ? REGION_MAP[species.generation.name] || species.generation.name : "";

  const maxStat = 255;

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-500"
      style={{ backgroundColor: dark ? "#0f0f1a" : `${bgColor}EE` }}
    >
      <Nav />
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12 relative w-full flex-1">
        {/* Back button */}
        <Link
          to="/"
          className={`inline-flex items-center mb-8 group transition-all duration-300 px-5 py-2.5 rounded-2xl shadow-sm hover:shadow-lg backdrop-blur-md border ${
            dark 
              ? "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-rose-500/50" 
              : "bg-white/40 border-white/80 text-slate-800 hover:bg-white/60 hover:border-rose-400/50"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 mr-3 transform group-hover:-translate-x-1.5 transition-transform duration-300 ${
              dark ? "text-rose-400" : "text-rose-600"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-bold tracking-tight">
            {t("details.back_to_pokedex")}
          </span>
        </Link>

        {/* Header Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-12">
          <div className="w-full md:w-1/2 flex justify-center relative">
            <div className="absolute inset-0 bg-white/40 rounded-full blur-3xl -z-10 w-72 h-72 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <img
              src={sprite}
              alt={data.name}
              className="w-72 h-72 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <p
              className="text-2xl font-black opacity-40 mb-1"
              style={{ color: color }}
            >
              #{String(data.id).padStart(3, "0")}
            </p>
            <h1 className={`text-5xl md:text-6xl font-black capitalize drop-shadow-sm mb-4 tracking-tight ${dark ? "text-white" : "text-slate-800"}`}>
              {data.name.replace("-", " ")}
            </h1>

            <div className="flex gap-2 mb-6">
              {data.types.map((t) => (
                <span
                  key={t.type.name}
                  className="px-5 py-1.5 rounded-full text-white capitalize font-bold shadow-md text-sm tracking-wide"
                  style={{ backgroundColor: getTypeColor(t.type.name) }}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            {description && (
              <p className={`text-lg leading-relaxed mb-6 p-5 rounded-2xl backdrop-blur-md border shadow-sm font-medium ${dark ? "text-slate-300 bg-white/10 border-white/20" : "text-slate-800 bg-white/50 border-white/60"}`}>
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Stats and Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Base Stats */}
          <div className={`backdrop-blur-xl rounded-3xl p-8 shadow-xl border transition-colors duration-300 ${dark ? "bg-white/5 border-white/10" : "bg-white/80 border-white/60"}`}>
            <h3 className="text-2xl font-black mb-6" style={{ color: color }}>
              {t("details.base_stats")}
            </h3>
            <div className="flex flex-col gap-4">
              {data.stats.map((stat) => {
                let statName = stat.stat.name;
                if (statName === "hp") statName = t("details.stats.hp");
                if (statName === "attack") statName = t("details.stats.atk");
                if (statName === "defense") statName = t("details.stats.def");
                if (statName === "special-attack") statName = t("details.stats.sp_atk");
                if (statName === "special-defense") statName = t("details.stats.sp_def");
                if (statName === "speed") statName = t("details.stats.spd");

                return (
                  <div key={stat.stat.name} className="flex items-center gap-4">
                    <span className={`w-20 text-sm font-bold uppercase ${dark ? "text-slate-400" : "text-slate-500"}`}>
                      {statName}
                    </span>
                    <span className={`w-8 text-right font-black ${dark ? "text-white" : "text-slate-800"}`}>
                      {stat.base_stat}
                    </span>
                    <div className="flex-1 h-3 bg-slate-200/50 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${Math.min((stat.base_stat / maxStat) * 100, 100)}%`,
                          backgroundColor: color,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              <div className="flex items-center gap-4 mt-2 pt-4 border-t border-slate-200/60">
                <span className="w-20 text-sm font-black uppercase text-slate-700">
                  {t("details.total")}
                </span>
                <span className={`w-8 text-right font-black ${dark ? "text-white" : "text-slate-800"}`}>
                  {data.stats.reduce((acc, curr) => acc + curr.base_stat, 0)}
                </span>
                <div className="flex-1"></div>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className={`backdrop-blur-xl rounded-3xl p-8 shadow-xl border transition-colors duration-300 ${dark ? "bg-white/5 border-white/10" : "bg-white/80 border-white/60"}`}>
            <h3 className="text-2xl font-black mb-6" style={{ color: color }}>
              {t("details.profile")}
            </h3>
            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              <div>
                <p className={`font-bold uppercase tracking-wider text-xs mb-2 ${dark ? "text-slate-400" : "text-slate-500"}`}>{t("details.region")}</p>
                <p className={`font-black text-lg rounded-xl shadow-sm border px-4 py-2 inline-block capitalize ${dark ? "bg-white/10 border-white/20 text-white" : "bg-white/60 border-white/60 text-slate-800"}`}>
                  {region.replace(/-/g, " ")}
                </p>
              </div>
              <div>
                <p className={`font-bold uppercase tracking-wider text-xs mb-2 ${dark ? "text-slate-400" : "text-slate-500"}`}>{t("details.height")}</p>
                <p className={`font-black text-lg rounded-xl shadow-sm border px-4 py-2 inline-block ${dark ? "bg-white/10 border-white/20 text-white" : "bg-white/60 border-white/60 text-slate-800"}`}>
                  {(data.height / 10).toFixed(1)} m
                </p>
              </div>
              <div>
                <p className={`font-bold uppercase tracking-wider text-xs mb-2 ${dark ? "text-slate-400" : "text-slate-500"}`}>{t("details.weight")}</p>
                <p className={`font-black text-lg rounded-xl shadow-sm border px-4 py-2 inline-block ${dark ? "bg-white/10 border-white/20 text-white" : "bg-white/60 border-white/60 text-slate-800"}`}>
                  {(data.weight / 10).toFixed(1)} kg
                </p>
              </div>
              <div className="col-span-2">
                <p className={`font-bold uppercase tracking-wider text-xs mb-3 ${dark ? "text-slate-400" : "text-slate-500"}`}>{t("details.abilities")}</p>
                <div className="flex flex-wrap gap-2">
                  {data.abilities.map((a) => (
                    <span
                      key={a.ability.name}
                      className={`px-4 py-2 rounded-xl text-sm font-bold capitalize shadow-sm border ${
                        dark
                          ? a.is_hidden ? "bg-white/5 border-white/10 text-slate-400" : "bg-white/10 border-white/20 text-white"
                          : a.is_hidden ? "bg-slate-200/50 border-white/60 text-slate-600" : "bg-white border-white/60 text-slate-800"
                      }`}
                    >
                      {a.ability.name.replace("-", " ")}{" "}
                      {a.is_hidden && (
                        <span className="text-xs font-semibold opacity-60 ml-1">({t("details.hidden")})</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations & TCG Cards Section */}
        <DeckRecommendation pokemonName={data.name} color={color} dark={dark} />
        <TcgCards pokemonName={data.name} color={color} dark={dark} />
      </div>
      <Footer />
    </div>
  );
}
