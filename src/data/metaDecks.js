export const metaDecks = {
  "pikachu": {
    name: "Pikachu EX Aggro (PTCG Pocket)",
    description: "Deck super agresif yang mengandalkan Pikachu EX dan gempuran cepat di Early Game. Sangat ditakuti di meta Pokemon TCG Pocket saat ini.",
    partners: ["Zapdos EX", "Voltorb", "Electrode", "Raichu"]
  },
  "mewtwo": {
    name: "Mewtwo EX Control (PTCG Pocket)",
    description: "Deck tier 1 yang sangat mendominasi late-game. Gardevoir digunakan untuk mempercepat pengisian energi Psychic ke Mewtwo EX.",
    partners: ["Gardevoir", "Ralts", "Kirlia", "Jynx"]
  },
  "charizard": {
    name: "Charizard EX Ramp (PTCG Pocket)",
    description: "Fokus bertahan di awal game untuk mengumpulkan energi, lalu menggunakan Moltres EX untuk mempercepat setup Charizard EX yang bisa menghantam hingga seketika KO.",
    partners: ["Moltres EX", "Charmander", "Charmeleon"]
  },
  "starmie": {
    name: "Starmie EX / Articuno (PTCG Pocket)",
    description: "Deck air yang sangat cepat dan mengandalkan Misty untuk mengisi energi dalam satu putaran. Jika beruntung, deck ini bisa menang di satu giliran pertama.",
    partners: ["Articuno EX", "Misty (Trainer)", "Gyarados"]
  },
  "articuno": {
    name: "Starmie EX / Articuno (PTCG Pocket)",
    description: "Deck air yang sangat cepat dan mengandalkan Misty untuk mengisi energi dalam satu putaran. Jika beruntung, deck ini bisa menang di satu giliran pertama.",
    partners: ["Starmie EX", "Misty (Trainer)", "Greninja"]
  },
  "venusaur": {
    name: "Venusaur EX Tank (PTCG Pocket)",
    description: "Berkat HP yang sangat tinggi dan healing dari Erika, Venusaur menjadi tembok pertahanan yang sangat sulit dibidik oleh deck aggro.",
    partners: ["Lilligant", "Erika (Trainer)", "Exeggutor EX"]
  },
  // Generic ones for other popular pokemon
  "gengar": {
    name: "Gengar ex Disruption",
    description: "Deck yang memanipulasi tangan dan field lawan, Gengar sering digunakan untuk status condition dan damage spread.",
    partners: ["Alakazam ex", "Munna"]
  },
  "arcanine": {
    name: "Arcanine ex Turbo",
    description: "Arcanine memiliki damage yang besar namun cepat menghancurkan energinya sendiri. Butuh partner pengisi energi cepat.",
    partners: ["Magmar", "Rapidash"]
  }
};

export const getDeckRecommendation = (pokemonName) => {
  return metaDecks[pokemonName.toLowerCase()] || null;
}
