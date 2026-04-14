<img src="https://raw.githubusercontent.com/Ilhamaji/PokeDex/main/public/pokedex-icon.svg" alt="PokeDex Logo" width="48" height="48" align="left" style="margin-right:12px" />

# PokeDex

A vibrant and interactive Pokémon encyclopedia. Browse, search, and view detailed stats for 1,025+ Pokémon — complete with a TCG card gallery and competitive deck recommendations for Pokémon TCG Pocket.

**Live Demo:** [pokedex.netlify.app](https://pokedex-ilham.netlify.app)

---

## 🚀 Features

- **Comprehensive Library** — Browse 1,025+ Pokémon from all 9 generations
- **Smart Search** — Find any Pokémon instantly by name
- **Detailed Stats** — Base stats, types, abilities, height, weight, and Pokédex description
- **TCG Card Gallery** — Latest Trading Card Game cards with smooth horizontal scroll & hover effects
- **Meta Deck Recommendations** — Competitive deck suggestions for Pokémon TCG Pocket
- **Dark / Light Mode** — Toggle with preference saved to localStorage
- **Responsive Design** — Works beautifully on mobile and desktop

## 🛠️ Built With

| Technology                                | Purpose                   |
| ----------------------------------------- | ------------------------- |
| React 18 + Vite                           | UI Framework & Build Tool |
| Tailwind CSS                              | Styling                   |
| [PokéAPI](https://pokeapi.co/)            | Pokémon Data              |
| [Pokémon TCG API](https://pokemontcg.io/) | Card Gallery              |
| Axios                                     | HTTP Client               |
| React Router v6                           | Client-side Routing       |

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ilhamaji/PokeDex.git
   cd PokeDex
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and fill in:
   ```
   VITE_POKEAPI_BASE_URL=https://pokeapi.co/api/v2
   VITE_TCG_API_KEY=your_key_from_pokemontcg.io
   ```

## 📋 Usage

```bash
# Development server
yarn dev

# Production build
yarn build

# Preview production build
yarn preview
```

## 🎮 Data Sources

- **PokéAPI v2** — `/pokemon`, `/pokemon-species`
- **Pokémon TCG API v2** — `/v2/cards` (requires free API key from [pokemontcg.io](https://pokemontcg.io))

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the **MIT License**.

## ✉️ Contact

**Ilham Aji** · [@ilhmsap](https://instagram.com/ilhmsap) · [github.com/Ilhamaji](https://github.com/Ilhamaji)

Project: [github.com/Ilhamaji/PokeDex](https://github.com/Ilhamaji/PokeDex)

---

_Disclaimer: Fan-made project. Pokémon and all related names are trademarks of Nintendo/Game Freak._
