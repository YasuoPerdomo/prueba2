import React, { useState } from "react";
import { Dish } from "../types";

const ALLERGENS_MAP: Record<string, { label: string; emoji: string; color: string }> = {
  mariscos: { label: "Mariscos", emoji: "🦐", color: "bg-red-50 text-red-700 border-red-200/80 hover:bg-red-100/40" },
  gluten: { label: "Gluten", emoji: "🌾", color: "bg-amber-50 text-amber-700 border-amber-200/80 hover:bg-amber-100/40" },
  lacteos: { label: "Lácteos", emoji: "🥛", color: "bg-blue-50 text-blue-700 border-blue-200/80 hover:bg-blue-100/40" },
  pescado: { label: "Pescado", emoji: "🐟", color: "bg-emerald-50 text-emerald-700 border-emerald-200/80 hover:bg-emerald-100/40" },
  huevo: { label: "Huevo", emoji: "🥚", color: "bg-yellow-50 text-yellow-700 border-yellow-200/80 hover:bg-yellow-100/40" },
};

interface DishCardProps {
  key?: string;
  dish: Dish;
  onAddToCart: (dish: Dish, spicyLevel?: 'bajo' | 'medio' | 'alto') => void;
  isClosed?: boolean;
}

export default function DishCard({ dish, onAddToCart, isClosed = false }: DishCardProps) {
  const [spicyLevel, setSpicyLevel] = useState<'bajo' | 'medio' | 'alto'>('medio');

  // Co-generate colorful badges based on type or explicit label
  const getBadgeStyles = () => {
    if (dish.badge === "Recomendado" || dish.isRecommended) {
      return "bg-[#EFA351] text-white"; // Sunset Coral
    }
    if (dish.badge === "Nuevo" || dish.isNew) {
      return "bg-coastal-teal text-white"; // Coastal Teal
    }
    if (dish.isFavorite || dish.badge === "Favorito Kids") {
      return "bg-shell-pink text-ocean-deep"; // Shell Pink + Deep Ocean
    }
    return "bg-wave-blue text-ocean-deep font-semibold"; // Sea foam light blue
  };

  const getBadgeLabel = () => {
    if (dish.badge) return dish.badge;
    if (dish.isRecommended) return "Recomendado";
    if (dish.isNew) return "¡Nuevo!";
    if (dish.isFavorite) return "Nuestra Joya";
    return null;
  };

  const label = getBadgeLabel();

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-wave-blue/50 group flex flex-col h-full shadow-xs hover:shadow-md transition-all duration-300 relative">
      
      {/* Product Image Stage */}
      <div className="h-48 w-full overflow-hidden relative bg-gray-100 select-none">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=350&q=80";
          }}
        />
        
        {label && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${getBadgeStyles()}`}>
            {label}
          </span>
        )}
      </div>

      {/* Description Content Box */}
      <div className="p-4 flex-grow flex flex-col justify-between font-sans">
        <div className="flex-grow">
          {/* Header Row */}
          <div className="flex justify-between items-start gap-2 mb-1.5">
            <h3 className="font-display font-bold text-base md:text-[17px] text-ocean-deep leading-snug group-hover:text-coastal-teal transition-colors">
              {dish.name}
            </h3>
            <span className="font-display font-black text-sm md:text-base text-sunset-coral shrink-0">
              S/ {dish.price.toFixed(2)}
            </span>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed font-medium mb-4 line-clamp-3">
            {dish.description}
          </p>

          {/* Elegant Allergen Badges */}
          {dish.alergenos && dish.alergenos.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4 items-center">
              <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider">
                Contiene:
              </span>
              {dish.alergenos.map((al) => {
                const info = ALLERGENS_MAP[al.toLowerCase()] || {
                  label: al,
                  emoji: "⚠️",
                  color: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100",
                };
                return (
                  <span
                    key={al}
                    title={`Este plato contiene alérgeno: ${info.label}`}
                    className={`inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full border ${info.color} font-bold transition-colors cursor-help select-none`}
                  >
                    <span>{info.emoji}</span>
                    <span className="capitalize">{info.label}</span>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Nivel de Picante Selector */}
        {!dish.noSpicy && dish.category !== "postres" && dish.category !== "bebidas" ? (
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-[11px] font-bold text-ocean-deep uppercase tracking-wider block">
                🌶️ Término Ají:
              </span>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                spicyLevel === 'bajo' 
                  ? 'bg-amber-100 text-amber-700' 
                  : spicyLevel === 'medio' 
                  ? 'bg-orange-100 text-orange-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {spicyLevel}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
              {(['bajo', 'medio', 'alto'] as const).map((level) => {
                const isActive = spicyLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSpicyLevel(level)}
                    className={`py-1.5 px-1.5 rounded-lg text-[10px] font-extrabold uppercase transition-all duration-200 select-none cursor-pointer ${
                      isActive
                        ? level === 'bajo'
                          ? 'bg-amber-400 text-ocean-deep shadow-xs'
                          : level === 'medio'
                          ? 'bg-[#EFA351] text-white shadow-xs'
                          : 'bg-rose-600 text-white shadow-xs'
                        : 'text-gray-500 hover:text-ocean-deep hover:bg-gray-50'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="h-4" />
        )}

        {/* Actions Row */}
        <div className="pt-3 border-t border-gray-50 shrink-0">
          <button
            disabled={isClosed}
            onClick={() => {
              if (isClosed) return;
              const hasSpicy = !dish.noSpicy && dish.category !== "postres" && dish.category !== "bebidas";
              onAddToCart(dish, hasSpicy ? spicyLevel : undefined);
            }}
            className={`w-full py-2.5 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-98 ${
              isClosed
                ? "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white border-2 border-ocean-deep text-ocean-deep hover:bg-ocean-deep hover:text-white cursor-pointer"
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">
              {isClosed ? "lock_clock" : "add_shopping_cart"}
            </span>
            {isClosed ? "Fuera de Horario" : "Añadir al pedido"}
          </button>
        </div>
      </div>
    </div>
  );
}
