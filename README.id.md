<div align="center">

# Pokédex

Ensiklopedia Pokémon interaktif — **1.025+ Pokémon dari 9 generasi**, lengkap dengan galeri kartu TCG dan rekomendasi deck meta Pokémon TCG Pocket.

[![Status](https://img.shields.io/badge/status-complete-brightgreen?style=flat-square)](#)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

**Demo:** [pokemondexs.netlify.app](https://pokemondexs.netlify.app)

<!-- lang-switcher -->
[English](README.md) · **Bahasa Indonesia**

</div>

---

## Tentang

Pokédex yang mencakup **seluruh 9 generasi** — bukan hanya Gen 1. Dibangun sebagai project portfolio untuk mengeksplorasi data fetching berskala besar, caching, i18n, dan animasi tanpa membebani browser.

## Fitur

- **Seluruh katalog** — 1.025+ Pokémon, bukan hanya Gen 1 (`pokemon?limit` tanpa batas ke PokéAPI).
- **Pencarian** berdasarkan nama.
- **Filter per generasi dan per tipe** lewat `FilterBar` (`POKEMON_TYPES`).
- **Halaman detail:** base stats, tipe, ability, tinggi, berat, dan deskripsi Pokédex.
- **Galeri kartu TCG** dengan scroll horizontal dan efek hover di kartu.
- **Rekomendasi deck meta** untuk Pokémon TCG Pocket, datanya di `src/data/metaDecks.js`.
- **English & Bahasa Indonesia** (`src/locales/en.json`, `id.json`).
- **Dark / light mode**, preferensi disimpan di `localStorage`.

## Tech Stack

| Bagian | Teknologi |
| --- | --- |
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Data Pokémon | [PokéAPI v2](https://pokeapi.co) |
| Data kartu | [Pokémon TCG API v2](https://pokemontcg.io) |
| i18n | `i18next` + `react-i18next` |
| Deploy | Netlify / GitHub Pages |

## Menjalankan

### 1. Clone & install

```bash
git clone https://github.com/Ilhamaji/pokedex.git
cd pokedex
npm install
```

### 2. API key

Dapatkan API key gratis dari [pokemontcg.io](https://pokemontcg.io), lalu:

```env
VITE_POKEMON_TCG_API_KEY=your_key_here
```

### 3. Jalankan

```bash
npm run dev
```

### 4. Build produksi

```bash
npm run build
npm run preview
```

## Struktur

```
src/
  components/
    Body.jsx                 # grid utama Pokémon
    PokemonCard.jsx          # kartu individual
    FilterBar.jsx            # filter tipe & generasi
    TcgCards.jsx             # galeri kartu TCG
    DeckRecommendation.jsx   # rekomendasi deck meta
    HeroSection.jsx          # landing hero
    LanguageSelector.jsx     # switch EN/ID
    Nav.jsx / Footer.jsx
  context/ThemeContext.jsx   # dark/light mode
  data/metaDecks.js          # data deck meta
  locales/{en,id}.json       # terjemahan
```

## Sumber Data

```http
GET https://pokeapi.co/api/v2/pokemon
GET https://pokeapi.co/api/v2/pokemon-species
GET https://api.pokemontcg.io/v2/cards
```

## Disclaimer

Project buatan penggemar. Pokémon dan semua nama terkait adalah merek dagang Nintendo / Game Freak.

## Lisensi

MIT.

---

<div align="center">
Dibuat oleh <a href="https://github.com/Ilhamaji">Ilham Aji</a>
</div>
