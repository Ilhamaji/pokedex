import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

const TECH = [
  { name: "React 18", icon: "⚛️", desc: "UI Framework" },
  { name: "Vite", icon: "⚡", desc: "Build Tool" },
  { name: "Tailwind CSS", icon: "🎨", desc: "Styling" },
  { name: "PokéAPI", icon: "🔴", desc: "Pokémon Data" },
  { name: "TCG API", icon: "🃏", desc: "Card Gallery" },
  { name: "Axios", icon: "📡", desc: "HTTP Client" },
];

const FEATURES = [
  {
    icon: "🔍",
    title: "Pokédex Lengkap",
    desc: "Data lengkap 1,025+ Pokémon dari semua generasi — stats, tipe, kemampuan, dan deskripsi.",
  },
  {
    icon: "🎴",
    title: "TCG Card Gallery",
    desc: "Galeri kartu Trading Card Game resmi berdasarkan Pokémon yang sedang dilihat, dengan scroll horizontal interaktif.",
  },
  {
    icon: "⚡",
    title: "Meta Deck TCG Pocket",
    desc: "Rekomendasi deck kompetitif untuk Pokémon TCG Pocket, lengkap dengan partner tim dan strategi.",
  },
  {
    icon: "🌙",
    title: "Dark / Light Mode",
    desc: "Toggle tema gelap atau terang — preferensi tersimpan otomatis untuk sesi berikutnya.",
  },
];

export default function About() {
  const { dark } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${dark ? "bg-gray-950" : "bg-slate-50"}`}
    >
      <Nav />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 md:px-10 pt-28 pb-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-widest mb-6 border border-rose-200">
            ✦ About This Project
          </div>
          <h1
            className={`text-5xl md:text-6xl font-black tracking-tight mb-4 ${dark ? "text-white" : "text-slate-900"}`}
          >
            Poke<span className="text-rose-500">Dex</span>
          </h1>
          <p
            className={`text-lg max-w-xl mx-auto leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}
          >
            Aplikasi web Pokédex modern yang dibangun dengan React dan berbagai
            API Pokémon, menampilkan data lengkap, galeri kartu TCG, dan
            rekomendasi deck kompetitif.
          </p>
        </div>

        {/* Developer Card */}
        <div
          className={`rounded-3xl p-8 mb-10 border transition-colors duration-300 relative overflow-hidden ${
            dark
              ? "bg-white/5 border-white/10 text-white"
              : "bg-white border-slate-200 text-slate-800"
          }`}
        >
          {/* bg blob */}
          <div
            className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #f43f5e, transparent)",
            }}
          />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-rose-400 to-violet-500 flex items-center justify-center shadow-lg text-4xl select-none">
                🧑‍💻
              </div>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left">
              <p
                className={`text-xs font-bold uppercase tracking-widest mb-1 ${dark ? "text-rose-400" : "text-rose-500"}`}
              >
                Developer
              </p>
              <p
                className={`text-sm leading-relaxed mb-4 max-w-md ${dark ? "text-slate-400" : "text-slate-600"}`}
              >
                Pengembang web yang bersemangat dengan teknologi modern. Proyek
                ini dibuat sebagai eksplorasi React, integrasi API publik, dan
                desain UI/UX yang interaktif.
              </p>
              <a
                href="https://instagram.com/ilhmsap"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #f43f5e, #ec4899, #8b5cf6)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                @ilhmsap
              </a>
            </div>
          </div>
        </div>

        {/* Features */}
        <h2
          className={`text-2xl font-black mb-6 ${dark ? "text-white" : "text-slate-900"}`}
        >
          Fitur Utama
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 ${
                dark
                  ? "bg-white/5 border-white/10 hover:bg-white/8"
                  : "bg-white border-slate-200 hover:shadow-md"
              }`}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3
                className={`font-black text-base mb-1.5 ${dark ? "text-white" : "text-slate-800"}`}
              >
                {f.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <h2
          className={`text-2xl font-black mb-6 ${dark ? "text-white" : "text-slate-900"}`}
        >
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-3 mb-12">
          {TECH.map((t) => (
            <div
              key={t.name}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                dark
                  ? "bg-white/5 border-white/10 text-white/80"
                  : "bg-white border-slate-200 text-slate-700"
              }`}
            >
              <span className="text-base">{t.icon}</span>
              <span>{t.name}</span>
              <span
                className={`text-xs ${dark ? "text-white/30" : "text-slate-400"}`}
              >
                · {t.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Back to home CTA */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Kembali ke PokéDex
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
