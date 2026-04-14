import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector({ dark }) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'id', name: 'Bahasa', flag: '🇮🇩' },
  ];

  const currentLanguage = languages.find((l) => l.code === i18n.language.split('-')[0]) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${
          dark
            ? 'bg-white/10 text-white hover:bg-white/20'
            : 'bg-white text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50'
        }`}
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <span className="hidden sm:inline lowercase opacity-80">{currentLanguage.code.toUpperCase()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-32 rounded-2xl p-1.5 shadow-xl border z-50 animate-scale-in origin-top-right backdrop-blur-xl ${
            dark
              ? 'bg-gray-905/90 border-white/10'
              : 'bg-white/90 border-slate-100'
          }`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                i18n.language === lang.code
                  ? 'bg-rose-500 text-white'
                  : dark
                  ? 'text-white/80 hover:bg-white/10'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
