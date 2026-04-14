import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getTypeColor, getBgColor } from '../utils/colors';

export default function PokemonCard({ url, name }) {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [url]);

  if (!data) return (
    <div className="shimmer w-full rounded-2xl" style={{ height: '200px' }} />
  );

  const mainType = data.types[0].type.name;
  const bgColor = getBgColor(mainType);
  const sprite =
    data.sprites.other['official-artwork'].front_default ||
    data.sprites.front_default ||
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

  return (
    <div
      onClick={() => navigate(`/details/${name}`)}
      className="card-3d relative flex flex-col p-4 pt-5 cursor-pointer rounded-2xl overflow-hidden select-none"
      style={{
        background: `linear-gradient(145deg, ${bgColor}F0, ${bgColor}C0)`,
        boxShadow: `0 4px 24px ${bgColor}55`,
        minHeight: '200px',
      }}
    >
      {/* Pokeball watermark */}
      <div className="absolute -right-5 -bottom-5 w-28 h-28 opacity-[0.12] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
          <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28.3 90 10.6 72.8 10 51.5h27.8c1.5 5.2 6.3 9 12.2 9 5.9 0 10.7-3.8 12.2-9H90c-.6 21.3-18.3 38.5-40 38.5zm0-23.5c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15zm40-18H62.2C60.7 43.3 55.9 39.5 50 39.5c-5.9 0-10.7 3.8-12.2 9H10c.6-21.3 18.3-38.5 40-38.5s39.4 17.2 40 38.5z"/>
        </svg>
      </div>

      {/* Header row */}
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-sm font-black capitalize text-slate-800 leading-tight">
            {name.replace(/-/g, ' ')}
          </h2>
          <div className="flex flex-col gap-1">
            {data.types.map((t) => (
              <span
                key={t.type.name}
                className="type-badge w-fit text-[10px]"
                style={{ backgroundColor: getTypeColor(t.type.name) }}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
        <span className="text-xs font-black opacity-25 text-slate-900 id-badge">
          #{String(data.id).padStart(3, '0')}
        </span>
      </div>

      {/* Sprite */}
      <div className="absolute bottom-1 right-1 w-24 h-24 z-10">
        <img
          src={sprite}
          alt={name}
          className="w-full h-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Bottom gloss */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/10 to-transparent pointer-events-none rounded-b-2xl" />
    </div>
  );
}
