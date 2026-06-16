import React from "react";
import { motion } from "motion/react";

interface HeroSectionProps {
  heroCeviche: string;
  onViewMenu: () => void;
  onViewDuosCombos: () => void;
}

export default function HeroSection({
  heroCeviche,
  onViewMenu,
  onViewDuosCombos,
}: HeroSectionProps) {
  return (
    <header className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-ocean-deep pt-16 pb-20">
      {/* Carousel backdrop with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/95 via-ocean-deep/70 to-ocean-deep/45 z-10 mix-blend-multiply" />
        <img
          src={heroCeviche}
          alt="Cevichería Terminal Pesquero"
          className="w-full h-full object-cover bg-center animate-pulse-slow"
          loading="lazy"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 flex flex-col gap-6 text-left">
          <div className="inline-flex items-center gap-2 bg-wave-blue/30 backdrop-blur-xs text-wave-blue px-4 py-2 rounded-full w-max font-bold text-xs uppercase tracking-widest shadow-xs">
            <span className="material-symbols-outlined text-sm font-bold">anchor</span>
            Sabor de Altamar
          </div>
          
          <h1 className="font-display text-4xl sm:text-6xl text-white font-extrabold leading-tight">
            Terminal Pesquero: <br />
            <span className="text-sunset-coral drop-shadow-sm font-black">
              Tradición y Frescura Marina
            </span>
          </h1>
          
          <p className="text-sm sm:text-lg text-[#EAE8E4] max-w-2xl leading-relaxed">
            Sumérgete en la auténtica experiencia del puerto. Platos potentes, ceviches con harto jugo y fondos bien taipá, preparados con la pesca fresca del día y el verdadero corazón chalaco.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={onViewMenu}
              className="bg-sunset-coral hover:bg-[#e08d2d] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">menu_book</span>
              Ver la Carta Completa
            </button>

            <button
              onClick={onViewDuosCombos}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-ocean-deep text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">motorcycle</span>
              Ver Dúos & Combos
            </button>
          </div>
        </div>

        {/* Decorative Glass Badge */}
        <div className="hidden lg:block lg:col-span-4 relative">
          <div className="hero-pattern absolute inset-0 z-0 h-40" />
          <div className="glass-card p-6 rounded-2xl shadow-xl border-t-4 border-coastal-teal text-left animate-float">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-400 text-3xl font-bold">★</span>
              <h3 className="font-display text-lg font-bold text-ocean-deep leading-tight">
                La vida es más sabrosa
              </h3>
            </div>
            <p className="font-sans text-xs text-gray-600 leading-relaxed font-semibold">
              Nuestra red atrapa la pesca al amanecer. Directo del terminal a tu paladar, garantizando sabor 100% chalaco y peruano legítimo.
            </p>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg className="relative block w-full h-[40px] md:h-[65px]" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path className="fill-[#F9F6F2]" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.95,123,194,108.57,243.68,97.35,285.83,72.41,321.39,56.44Z" />
        </svg>
      </div>
    </header>
  );
}
