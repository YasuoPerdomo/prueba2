import React from "react";
import { Sede } from "../types";

interface HeaderBannerProps {
  sede: Sede | null;
  onChangeBranch: () => void;
}

export default function HeaderBanner({ sede, onChangeBranch }: HeaderBannerProps) {
  if (!sede) return null;

  return (
    <div className="bg-gradient-to-r from-sunset-coral to-[#E08D2D] text-white py-2 px-4 shadow-sm relative z-40 text-center text-xs md:text-sm font-semibold tracking-wide flex flex-wrap items-center justify-center gap-1.5 md:gap-3 transition-all duration-300">
      <div className="flex items-center gap-1">
        <span className="animate-pulse">🐟</span>
        <span>Pidiendo desde:</span>
        <span className="font-bold underline tracking-tight text-white uppercase bg-ocean-deep/20 px-2 py-0.5 rounded">
          {sede.emoji} Terminal Pesquero {sede.suffix}
        </span>
      </div>
      <span className="hidden md:inline text-white/60">|</span>
      <button
        onClick={onChangeBranch}
        className="bg-white/20 hover:bg-white/30 text-white border border-white/40 text-[11px] md:text-xs font-bold py-1 px-3 rounded-full uppercase tracking-wider transition-all cursor-pointer active:scale-95"
      >
        Cambiar sede
      </button>
    </div>
  );
}
