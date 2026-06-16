import React from "react";
import { Dish } from "../../types";
import { DISHES } from "../../data";

interface SpecialtiesSectionProps {
  arrozMariscos: string;
  causaAcevichada: string;
  chicharronPescado: string;
  onAddToCart: (dish: Dish) => void;
  onViewCombos: () => void;
}

export default function SpecialtiesSection({
  arrozMariscos,
  causaAcevichada,
  chicharronPescado,
  onAddToCart,
  onViewCombos,
}: SpecialtiesSectionProps) {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs text-coastal-teal font-black uppercase tracking-widest block mb-2">
          Lo Mejor del Puerto
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ocean-deep animate-[#pulse_slow]">
          Nuestras Especialidades
        </h2>
        <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto font-medium">
          Platos exclusivos con harto jugo, fondos bien taipá y entradas potentes. Solo para conocedores del buen comer marino.
        </p>
        <div className="w-16 h-1 bg-sunset-coral mx-auto mt-5 rounded-full" />
      </div>

      {/* Classic Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(320px,auto)] font-sans">
        
        {/* Featured element 1: Arroz con Mariscos */}
        <div className="md:col-span-8 relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 bg-white">
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/90 via-ocean-deep/30 to-transparent z-10" />
          <img
            src={arrozMariscos}
            alt="Arroz con Mariscos"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full text-left">
            <span className="bg-shell-pink text-ocean-deep px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider block w-max mb-3">
              El de la Firme Recomendación
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Arroz con Mariscos
            </h3>
            <p className="text-xs text-gray-200 max-w-lg mb-4 leading-relaxed font-semibold">
              Preparación húmeda al wok con mixtura de langostinos, calamares y conchas tiernas marinadas con ají panca y vino blanco. Un clásico taipá.
            </p>
            <div className="flex justify-between items-center bg-black/20 p-2.5 rounded-xl backdrop-blur-xs">
              <span className="font-display font-black text-lg text-sunset-coral">
                S/ 49.90
              </span>
              <button
                onClick={() => {
                  const item = DISHES.find(d => d.id === "fon_arroz_mar");
                  if (item) onAddToCart(item);
                }}
                className="bg-sunset-coral hover:bg-coastal-teal text-white py-2 px-5 rounded-lg text-xs uppercase font-extrabold transition-colors cursor-pointer"
              >
                Añadir al pedido
              </button>
            </div>
          </div>
        </div>

        {/* Featured element 2: Causa Acevichada */}
        <div className="md:col-span-4 relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 bg-white flex flex-col justify-end min-h-[320px]">
          <div className="absolute inset-0 z-0">
            <img
              src={causaAcevichada}
              alt="Causa Acevichada del Terminal"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          
          {/* Gradient Overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/95 via-ocean-deep/30 to-transparent z-10 pointer-events-none" />
          
          <div className="relative z-20 p-6 text-left">
            <span className="bg-wave-blue text-ocean-deep px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider block w-max mb-2">
              Entrada Potente (La Firma ⭐)
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white mb-1.5">
              Causa Acevichada
            </h3>
            <p className="text-xs text-gray-200 mb-4 line-clamp-3 leading-relaxed font-medium">
              Cremoso puré de papa con ají amarillo limeño, relleno de láminas de palta suave, coronada con un generoso ceviche clásico de harto jugo y chicharrón crujiente.
            </p>
            <div className="flex justify-between items-center">
              <span className="font-display font-black text-base text-sunset-coral font-bold">
                S/ 39.90
              </span>
              <button
                onClick={() => {
                  const item = DISHES.find(d => d.id === "ent_causa");
                  if (item) onAddToCart(item);
                }}
                className="bg-white/10 hover:bg-white text-white hover:text-ocean-deep border border-white/20 p-2 rounded-full flex items-center justify-center transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured element 3: Jalea Completa */}
        <div className="md:col-span-12 lg:col-span-6 relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white min-h-[340px] flex items-end">
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/95 via-ocean-deep/60 to-transparent z-10" />
          <img
            src={chicharronPescado}
            alt="Chicharrón de Pescado"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-right group-hover:scale-102 transition-transform duration-700"
            loading="lazy"
          />
          <div className="relative z-20 p-6 md:p-8 text-left max-w-md">
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Chicharrón de Pescado
            </h3>
            <p className="text-xs text-gray-200 mb-6 leading-relaxed font-semibold">
              Crujiente y doradito. Trozos jugosos de pescado fresco con zarza criolla norteña de cebollas finas, yucas doradas calientes y nuestro ají rocoto de la casa.
            </p>
            <div className="flex items-center gap-4">
              <span className="font-display font-black text-xl text-sunset-coral">
                S/ 48.90
              </span>
              <button
                onClick={() => {
                  const item = DISHES.find(d => d.id === "fon_chicharron");
                  if (item) onAddToCart(item);
                }}
                className="bg-coastal-teal hover:bg-sunset-coral text-white border-0 py-2.5 px-5 rounded-lg text-xs uppercase font-extrabold tracking-wider transition-all cursor-pointer"
              >
                Pedir Ahora
              </button>
            </div>
          </div>
        </div>

        {/* Promo element 4: Direct menu links */}
        <div className="md:col-span-12 lg:col-span-6 bg-coastal-teal rounded-2xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden text-white shadow-sm hover:shadow-md transition-shadow">
          <div className="hero-pattern absolute inset-0 opacity-10 pointer-events-none" />
          <span className="material-symbols-outlined text-[54px] mb-3 animate-pulse">sailing</span>
          <h3 className="font-display text-2xl font-black mb-1.5 uppercase tracking-tight">
            Combos Familiares
          </h3>
          <p className="text-xs font-semibold text-white/90 max-w-sm mb-6 leading-relaxed">
            Lleva el verdadero sabor del puerto directamente a la mesa del hogar con nuestros combos especiales de 3 a 5 personas, ¡bien servidos!
          </p>
          <button
            onClick={onViewCombos}
            className="bg-white text-ocean-deep hover:bg-sunset-coral hover:text-white px-7 py-3 rounded-xl text-xs uppercase font-extrabold tracking-widest transition-all shadow-md cursor-pointer"
          >
            Ver Combos
          </button>
        </div>
      </div>
    </section>
  );
}
