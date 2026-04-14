import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const FEATURED = [
  { name: "Charizard", id: 6 },
  { name: "Mewtwo", id: 150 },
  { name: "Pikachu", id: 25 },
  { name: "Gengar", id: 94 },
  { name: "Eevee", id: 133 },
];

const SPRITE = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export default function HeroSection({ inputValue, setInputValue, handleSearch }) {
  const [featured, setFeatured] = useState(FEATURED[0]);
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef(null);
  const { dark } = useTheme();
  const { t } = useTranslation();

  const switchTo = (i) => {
    if (i === idx) return;
    setFading(true);
    setTimeout(() => {
      setFeatured(FEATURED[i]);
      setIdx(i);
      setFading(false);
    }, 280);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((prev) => {
          const next = (prev + 1) % FEATURED.length;
          setFeatured(FEATURED[next]);
          return next;
        });
        setFading(false);
      }, 280);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-32 px-6">
      {/* ── Background ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 -z-10 transition-all duration-500"
        style={{
          background: dark
            ? "linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 30%, #0d1b2a 70%, #0f1810 100%)"
            : "linear-gradient(135deg, #fdf4ff 0%, #fce7f3 30%, #e0f2fe 70%, #ecfdf5 100%)",
        }}
      />

      {/* Soft blobs */}
      <div className="absolute top-16 -left-24 w-96 h-96 rounded-full opacity-40 -z-10"
        style={{ background: "radial-gradient(circle, #f9a8d4, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-30 -z-10"
        style={{ background: "radial-gradient(circle, #a5f3fc, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20 -z-10"
        style={{ background: "radial-gradient(ellipse, #c4b5fd, transparent 70%)" }} />

      {/* Pokéball watermark */}
      <div className="absolute -bottom-10 -right-10 w-80 h-80 opacity-[0.06] pointer-events-none select-none -z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="#64748b">
          <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28.3 90 10.6 72.8 10 51.5h27.8c1.5 5.2 6.3 9 12.2 9 5.9 0 10.7-3.8 12.2-9H90c-.6 21.3-18.3 38.5-40 38.5zm0-23.5c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15zm40-18H62.2C60.7 43.3 55.9 39.5 50 39.5c-5.9 0-10.7 3.8-12.2 9H10c.6-21.3 18.3-38.5 40-38.5s39.4 17.2 40 38.5z"/>
        </svg>
      </div>

      {/* ── Main content ───────────────────────────────────── */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl w-full">

        {/* ── Text side ──────────────────────────────────── */}
        <div className="flex-1 text-center lg:text-left animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-widest mb-6 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            {t("hero.badge")}
          </div>

          <h1 className={`text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-6 tracking-tight ${dark ? "text-white" : "text-slate-800"}`}>
            Poke
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #f43f5e, #fb923c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Dex
            </span>
          </h1>

          <p className={`text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>
            {t("hero.tagline")}
            <span className={`font-semibold ${dark ? "text-slate-200" : "text-slate-700"}`}>{t("hero.tagline_highlight")}</span>.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 w-full max-w-lg mx-auto lg:mx-0 animate-slide-up delay-200"
          >
            <div className="relative flex-1">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t("hero.search_placeholder")}
                className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent shadow-lg text-base transition-all duration-300 ${dark ? "bg-white/10 border-white/20 text-white placeholder-white/40" : "bg-white border-slate-200 text-slate-800 placeholder-slate-400"}`}
              />
            </div>
            <button
              type="submit"
              className="px-7 py-4 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex-shrink-0 whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)" }}
            >
              {t("hero.search_button")}
            </button>
          </form>

          {/* Stats */}
          <div className="flex gap-8 mt-10 justify-center lg:justify-start animate-slide-up delay-300">
            {[["1,025+", "Pokémon"], ["18", t("hero.stats.types")], ["9", t("hero.stats.generations")]].map(([num, label]) => (
              <div key={label}>
                <p className={`text-3xl font-black ${dark ? "text-white" : "text-slate-800"}`}>{num}</p>
                <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pokémon side ───────────────────────────────── */}
        <div className="flex-shrink-0 flex flex-col items-center gap-5 animate-scale-in delay-200">
          {/* Card */}
          <div
            className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl flex items-end justify-center shadow-2xl overflow-visible"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))",
              border: "1px solid rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Glow behind pokemon */}
            <div
              className="absolute inset-6 rounded-full blur-2xl opacity-50 -z-10 transition-all duration-700"
              style={{
                background: `radial-gradient(circle, ${
                  idx === 0 ? "#fb7185" :
                  idx === 1 ? "#c084fc" :
                  idx === 2 ? "#facc15" :
                  idx === 3 ? "#818cf8" : "#86efac"
                }, transparent)`,
              }}
            />
            <img
              src={SPRITE(featured.id)}
              alt={featured.name}
              className="absolute w-full h-full object-contain drop-shadow-2xl animate-float transition-opacity duration-300"
              style={{ opacity: fading ? 0 : 1, padding: "12px" }}
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2.5">
            {FEATURED.map((p, i) => (
              <button
                key={p.id}
                onClick={() => switchTo(i)}
                className={`w-12 h-12 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  i === idx
                    ? "border-rose-500 scale-110 shadow-lg shadow-rose-200"
                    : "border-slate-200 opacity-60 hover:opacity-90 hover:border-slate-300"
                }`}
                style={{ background: "rgba(255,255,255,0.8)" }}
              >
                <img src={SPRITE(p.id)} alt={p.name} className="w-full h-full object-contain p-1" />
              </button>
            ))}
          </div>

          <p className={`font-semibold text-sm tracking-wide ${dark ? "text-slate-400" : "text-slate-500"}`}>
            #{String(featured.id).padStart(3, "0")} · {featured.name}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-80 pointer-events-none">
        <div className={`flex flex-col items-center gap-1.5 animate-bounce ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
          <p className="text-xs uppercase tracking-widest font-bold">{t("hero.scroll", { defaultValue: "Scroll to explore" })}</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
