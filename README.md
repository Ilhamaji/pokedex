<div align="center">

# Pokédex

An interactive Pokémon encyclopedia — **1,025+ Pokémon across 9 generations**, with a TCG card gallery and meta deck recommendations for Pokémon TCG Pocket.

[![Status](https://img.shields.io/badge/status-complete-brightgreen?style=flat-square)](#)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

**Demo:** [pokemondexs.netlify.app](https://pokemondexs.netlify.app)

**English** · [Bahasa Indonesia](README.id.md)

</div>

---

## About

A Pokédex covering **all 9 generations**, not just Gen 1. It was built as a portfolio project to explore large-scale data fetching, caching, i18n, and animation without overwhelming the browser.

## Features

- **The whole catalogue** — 1,025+ Pokémon via an unbounded `pokemon?limit` call to PokéAPI.
- **Search** by name.
- **Filter by generation and by type** in `FilterBar` (`POKEMON_TYPES`).
- **Detail view:** base stats, types, abilities, height, weight, and Pokédex description.
- **TCG card gallery** with horizontal scrolling and hover effects on each card.
- **Meta deck recommendations** for Pokémon TCG Pocket, defined in `src/data/metaDecks.js`.
- **English and Bahasa Indonesia** (`src/locales/en.json`, `id.json`).
- **Dark / light mode**, with the preference stored in `localStorage`.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Pokémon data | [PokéAPI v2](https://pokeapi.co) |
| Card data | [Pokémon TCG API v2](https://pokemontcg.io) |
| i18n | `i18next` + `react-i18next` |
| Deployment | Netlify / GitHub Pages |

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Ilhamaji/pokedex.git
cd pokedex
npm install
```

### 2. API key

Get a free API key from [pokemontcg.io](https://pokemontcg.io), then:

```env
VITE_POKEMON_TCG_API_KEY=your_key_here
```

### 3. Run

```bash
npm run dev
```

### 4. Production build

```bash
npm run build
npm run preview
```

## Project Layout

```
src/
  components/
    Body.jsx                 # main Pokémon grid
    PokemonCard.jsx          # individual card
    FilterBar.jsx            # type and generation filter
    TcgCards.jsx             # TCG card gallery
    DeckRecommendation.jsx   # meta deck recommendations
    HeroSection.jsx          # landing hero
    LanguageSelector.jsx     # EN/ID switch
    Nav.jsx / Footer.jsx
  context/ThemeContext.jsx   # dark/light mode
  data/metaDecks.js          # meta deck data
  locales/{en,id}.json       # translations
```

## Data Sources

```http
GET https://pokeapi.co/api/v2/pokemon
GET https://pokeapi.co/api/v2/pokemon-species
GET https://api.pokemontcg.io/v2/cards
```

## Disclaimer

Fan-made project. Pokémon and all related names are trademarks of Nintendo / Game Freak.

## License

MIT.

---

<div align="center">
Built by <a href="https://github.com/Ilhamaji">Ilham Aji</a>
</div>
