import React from "react";
import { Sede } from "../../types";
import { SEDES } from "../../data";

interface SedesSectionProps {
  selectedSede: Sede | null;
  onSelectSede: (sede: Sede) => void;
  onOpenReservationForSede: (sede: Sede) => void;
}

export default function SedesSection({
  selectedSede,
  onSelectSede,
  onOpenReservationForSede,
}: SedesSectionProps) {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <span className="text-xs text-coastal-teal font-black uppercase tracking-widest">Encuéntranos</span>
        <h2 className="font-display text-3xl font-extrabold text-ocean-deep mt-1">Sedes Terminal Pesquero</h2>
        <p className="text-xs text-gray-400 mt-1">Establece tu sede favorita para delivery o reserva una mesa en salón</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
        {SEDES.map((s) => {
          const isActive = selectedSede?.id === s.id;
          return (
            <div
              key={s.id}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between bg-white ${
                isActive
                  ? "border-coastal-teal bg-wave-blue/5 shadow-md ring-2 ring-coastal-teal/10"
                  : "border-gray-150 hover:border-wave-blue hover:shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl bg-gray-50 p-2.5 rounded-xl block select-none">{s.emoji}</span>
                  {isActive ? (
                    <span className="bg-ocean-deep text-white text-[9px] uppercase font-bold py-1 px-2.5 rounded-full">
                      Sede Activa
                    </span>
                  ) : null}
                </div>
                <h3 className="font-bold text-sm text-ocean-deep uppercase tracking-tight">
                  {s.suffix}
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-normal font-medium min-h-[36px]">
                  {s.address}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col gap-2.5">
                {/* Delivery Choice Action */}
                <button
                  type="button"
                  onClick={() => onSelectSede(s)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? "bg-coastal-teal/15 text-coastal-teal border border-coastal-teal/20"
                      : "bg-gray-50 text-ocean-deep hover:bg-sky-50 hover:text-coastal-teal border border-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px]">motorcycle</span>
                    <span>Pedir por Delivery</span>
                  </span>
                  <span className="material-symbols-outlined text-sm">
                    {isActive ? "check_circle" : "arrow_forward"}
                  </span>
                </button>

                {/* Reservation Action */}
                <button
                  type="button"
                  onClick={() => onOpenReservationForSede(s)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-ocean-deep hover:bg-coastal-teal text-white flex items-center justify-center gap-1.5 transition-all shadow-3xs cursor-pointer select-none"
                >
                  <span className="material-symbols-outlined text-[15px]">table_restaurant</span>
                  <span>Reservar Mesa</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
