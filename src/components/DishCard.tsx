import React from "react";
import { Dish } from "../types";

interface DishCardProps {
  key?: string;
  dish: Dish;
  onAddToCart: (dish: Dish) => void;
}

export default function DishCard({ dish, onAddToCart }: DishCardProps) {
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
        </div>

        {/* Actions Row */}
        <div className="pt-3 border-t border-gray-50 shrink-0">
          <button
            onClick={() => onAddToCart(dish)}
            className="w-full py-2.5 bg-white border-2 border-ocean-deep text-ocean-deep hover:bg-ocean-deep hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[17px]">add_shopping_cart</span>
            Añadir al pedido
          </button>
        </div>
      </div>
    </div>
  );
}
