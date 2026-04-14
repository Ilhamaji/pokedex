export const metaDecks = {
  "pikachu": {
    name: "Pikachu EX Aggro (PTCG Pocket)",
    description: "Super aggressive deck relying on Pikachu EX and fast pressure in the early game. Highly feared in the current Pokémon TCG Pocket meta.",
    partners: ["Zapdos EX", "Voltorb", "Electrode", "Raichu"]
  },
  "mewtwo": {
    name: "Mewtwo EX Control (PTCG Pocket)",
    description: "Tier 1 deck that dominates the late game. Gardevoir is used to accelerate Psychic energy attachment to Mewtwo EX.",
    partners: ["Gardevoir", "Ralts", "Kirlia", "Jynx"]
  },
  "charizard": {
    name: "Charizard EX Ramp (PTCG Pocket)",
    description: "Focus on defending in the early game to gather energy, then use Moltres EX to accelerate the setup of Charizard EX which can deal massive damage for instant KOs.",
    partners: ["Moltres EX", "Charmander", "Charmeleon"]
  },
  "starmie": {
    name: "Starmie EX / Articuno (PTCG Pocket)",
    description: "Very fast water deck relying on Misty to charge energy in a single turn. With luck, this deck can win in the first few turns.",
    partners: ["Articuno EX", "Misty (Trainer)", "Gyarados"]
  },
  "articuno": {
    name: "Starmie EX / Articuno (PTCG Pocket)",
    description: "Very fast water deck relying on Misty to charge energy in a single turn. With luck, this deck can win in the first few turns.",
    partners: ["Starmie EX", "Misty (Trainer)", "Greninja"]
  },
  "venusaur": {
    name: "Venusaur EX Tank (PTCG Pocket)",
    description: "Thanks to very high HP and healing from Erika, Venusaur becomes a defensive wall that is very difficult for aggro decks to take down.",
    partners: ["Lilligant", "Erika (Trainer)", "Exeggutor EX"]
  },
  // Generic ones for other popular pokemon
  "gengar": {
    name: "Gengar ex Disruption",
    description: "A deck that manipulates the opponent's hand and field, Gengar is often used for status conditions and damage spreading.",
    partners: ["Alakazam ex", "Munna"]
  },
  "arcanine": {
    name: "Arcanine ex Turbo",
    description: "Arcanine has huge damage but quickly discards its own energy. Needs a fast energy acceleration partner.",
    partners: ["Magmar", "Rapidash"]
  }
};

export const getDeckRecommendation = (pokemonName) => {
  return metaDecks[pokemonName.toLowerCase()] || null;
}
