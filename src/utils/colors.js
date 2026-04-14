export const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export const bgColors = {
  normal: '#F5F5F5',
  fire: '#FDF2E9',
  water: '#EAF0F8',
  electric: '#FEF9E6',
  grass: '#E8F5E9',
  ice: '#E0F7FA',
  fighting: '#FBE9E7',
  poison: '#F3E5F5',
  ground: '#FFF8E1',
  flying: '#E8EAF6',
  psychic: '#FCE4EC',
  bug: '#F0F4C3',
  rock: '#EFEBE9',
  ghost: '#EDE7F6',
  dragon: '#EDE7F6',
  dark: '#E0E0E0',
  steel: '#ECEFF1',
  fairy: '#FCE4EC',
};

export const getTypeColor = (type) => typeColors[type?.toLowerCase()] || '#777';
export const getBgColor = (type) => bgColors[type?.toLowerCase()] || '#fff';
