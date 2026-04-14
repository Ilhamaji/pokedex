import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { dark } = useTheme();
  const { t } = useTranslation();

  return (
    <footer
      className={`w-full border-t transition-colors duration-300 ${
        dark
          ? "bg-gray-950 border-white/10 text-white/60"
          : "bg-white border-slate-100 text-slate-500"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo & tagline */}
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow">
              <svg className="w-4 h-4 text-white" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28.3 90 10.6 72.8 10 51.5h27.8c1.5 5.2 6.3 9 12.2 9 5.9 0 10.7-3.8 12.2-9H90c-.6 21.3-18.3 38.5-40 38.5zm0-23.5c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15zm40-18H62.2C60.7 43.3 55.9 39.5 50 39.5c-5.9 0-10.7 3.8-12.2 9H10c.6-21.3 18.3-38.5 40-38.5s39.4 17.2 40 38.5z"/>
              </svg>
            </div>
            <span className={`text-base font-black tracking-tight ${dark ? "text-white" : "text-slate-800"}`}>
              Poke<span className="text-rose-500">Dex</span>
            </span>
          </Link>
          <p className="text-xs">{t("footer.tagline")}</p>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className={`hover:text-rose-500 transition-colors duration-200 ${dark ? "text-white/60" : "text-slate-500"}`}
          >
            {t("nav.home")}
          </Link>
          <Link
            to="/about"
            className={`hover:text-rose-500 transition-colors duration-200 ${dark ? "text-white/60" : "text-slate-500"}`}
          >
            {t("nav.about")}
          </Link>
          <a
            href="https://instagram.com/ilhmsap"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-rose-500 transition-colors duration-200"
          >
            {/* Instagram icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @ilhmsap
          </a>
        </nav>

        {/* Copyright */}
        <p className="text-xs">
          © {new Date().getFullYear()} PokéDex · {t("footer.data_from")}{" "}
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-500 transition-colors font-medium"
          >
            PokéAPI
          </a>{" "}
          &amp;{" "}
          <a
            href="https://pokemontcg.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-500 transition-colors font-medium"
          >
            TCG API
          </a>
        </p>

      </div>
    </footer>
  );
}
