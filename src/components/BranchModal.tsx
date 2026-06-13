import React, { useState } from "react";
import { Sede } from "../types";
import { SEDES } from "../data";

interface BranchModalProps {
  isOpen: boolean;
  onSelect: (sede: Sede) => void;
  onClose?: () => void;
  currentSede: Sede | null;
}

export default function BranchModal({ isOpen, onSelect, onClose, currentSede }: BranchModalProps) {
  const [selectedId, setSelectedId] = useState<string>(currentSede?.id || "");

  if (!isOpen) return null;

  const handleConfirm = () => {
    const chosen = SEDES.find(s => s.id === selectedId);
    if (!chosen) {
      alert("Ya pe causa, elige una sede 😅");
      return;
    }
    onSelect(chosen);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border-t-8 border-ocean-deep relative overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Decorative Wave Design */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-wave-blue/20 rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-sunset-coral/10 rounded-full pointer-events-none"></div>

        <div className="p-6 md:p-8 overflow-y-auto relative z-10 flex-grow">
          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-5xl animate-bounce inline-block mb-2">🐟</span>
            <h3 className="font-display text-3xl font-extrabold text-ocean-deep leading-tight">
              ¡Hola, causa!
            </h3>
            <p className="text-on-surface-variant font-medium mt-1">
              Antes de cebichearte, dime:
            </p>
            <h4 className="text-xl font-bold text-sunset-coral mt-1">
              ¿De qué puerto zarpas hoy?
            </h4>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mt-2">
              Así tu pedido se envía a la cocina de la sede más cercana y te llega fresquito al toque.
            </p>
          </div>

          {/* Grid list of Sedes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {SEDES.map(sede => {
              const isSelected = selectedId === sede.id;
              return (
                <button
                  key={sede.id}
                  onClick={() => setSelectedId(sede.id)}
                  type="button"
                  className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? "border-coastal-teal bg-wave-blue/10 shadow-md ring-2 ring-coastal-teal/20"
                      : "border-gray-200 hover:border-wave-blue hover:bg-gray-50 bg-white"
                  }`}
                >
                  <span className="text-2xl mt-0.5">{sede.emoji}</span>
                  <div className="flex-grow">
                    <span className="block font-bold text-sm text-ocean-deep leading-tight">
                      {sede.suffix.toUpperCase()}
                    </span>
                    <span className="block text-xs text-gray-500 mt-1 font-medium leading-normal">
                      {sede.address}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="absolute top-2 right-2 bg-coastal-teal text-white text-[10px] uppercase font-bold py-0.5 px-2 rounded-full">
                      ZARPANDO
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleConfirm}
              type="button"
              className="w-full bg-gradient-to-r from-ocean-deep to-[#0c316a] text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm hover:opacity-95 active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">sailing</span>
              ¡A comer se dijo! 🚀
            </button>
            {currentSede && (
              <button
                onClick={onClose}
                type="button"
                className="w-full text-gray-500 hover:text-ocean-deep py-2 text-xs font-bold transition-colors"
              >
                Seguir navegando en {currentSede.suffix}
              </button>
            )}
          </div>
        </div>
        
        {/* Footer info */}
        <div className="bg-gray-50 py-3 px-6 text-center border-t border-gray-100 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
          * Tu selección quedará guardada para facilitar tu próximo antojo
        </div>
      </div>
    </div>
  );
}
