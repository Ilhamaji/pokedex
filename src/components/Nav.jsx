import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Nav({ inputValue, setInputValue, handleSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = scrolled || !isHome;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: navBg
          ? dark ? "rgba(15,15,25,0.92)" : "rgba(255,255,255,0.88)"
          : "transparent",
        backdropFilter: navBg ? "blur(20px)" : "none",
        borderBottom: navBg
          ? dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)"
          : "none",
        boxShadow: navBg ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-3.5 flex items-center justify-between gap-4">

        {/* Logo — left */}
        <Link
          to="/"
          onClick={() => setInputValue && setInputValue("")}
          className="flex items-center gap-2.5 group flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <svg className="w-5 h-5 text-white" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28.3 90 10.6 72.8 10 51.5h27.8c1.5 5.2 6.3 9 12.2 9 5.9 0 10.7-3.8 12.2-9H90c-.6 21.3-18.3 38.5-40 38.5zm0-23.5c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15zm40-18H62.2C60.7 43.3 55.9 39.5 50 39.5c-5.9 0-10.7 3.8-12.2 9H10c.6-21.3 18.3-38.5 40-38.5s39.4 17.2 40 38.5z"/>
            </svg>
          </div>
          <span className={`text-xl font-black tracking-tight ${dark ? "text-white" : "text-slate-800"}`}>
            Poke<span className="text-rose-500">Dex</span>
          </span>
        </Link>

        {/* Right group */}
        <div className="flex items-center gap-3">

          {/* Search — only on home */}
          {handleSearch && (
            <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  className={`w-64 md:w-80 pl-10 pr-4 py-2.5 border rounded-2xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent shadow-sm ${
                    dark
                      ? "bg-white/10 border-white/20 text-white placeholder-white/40"
                      : "bg-white border-slate-200 text-slate-800 placeholder-slate-400"
                  }`}
                  placeholder="Cari Pokémon..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white text-sm font-bold rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0"
              >
                Cari
              </button>
            </form>
          )}

          {/* Back button — only on detail pages */}
          {!handleSearch && (
            <Link
              to="/"
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm transition-colors duration-200 ${
                dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              PokéDex
            </Link>
          )}

          {/* Dark / Light toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0 ${
              dark
                ? "bg-white/10 text-yellow-300 hover:bg-white/20"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {dark ? (
              /* Sun icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
              </svg>
            ) : (
              /* Moon icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
            )}
          </button>

        </div>
      </div>
    </nav>
  );
}
