import React from "react";

interface HistorySectionProps {
  equipoSalon: string;
}

export default function HistorySection({ equipoSalon }: HistorySectionProps) {
  return (
    <section className="py-20 bg-[#F0EDE9] relative overflow-hidden" id="historia">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Story text column */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <div className="flex items-center gap-3">
            <span className="w-10 h-1 bg-coastal-teal rounded-full" />
            <span className="text-xs font-black text-coastal-teal uppercase tracking-widest">
              Nuestra Esencia
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-ocean-deep leading-tight">
            Pasión por el Mar, <br />
            <span className="text-sunset-coral italic font-normal">
              Sabor Chalaco Original
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-semibold">
            En Terminal Pesquero, no solo servimos comida; honramos la herencia del Callao. Nos inspiramos en los vibrantes puertos pesqueros donde el pescador madruga al alba, trayendo la red pesada para cocinar al momento.
          </p>

          <p className="text-sm text-gray-500 leading-relaxed">
            Nuestra filosofía es bien simple: <strong className="text-ocean-deep">&ldquo;¡Así que pide de una nomás!&rdquo;</strong>. Platos rebosantes de ingredientes sinceros y de primera, sazón criolla para chuparse los dedos y un servicio veloz para alegrar el día.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="border-l-2 border-coastal-teal pl-4 text-left">
              <span className="block font-display text-2xl font-black text-ocean-deep">100%</span>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Pesca Fresca Matutina
              </span>
            </div>
            <div className="border-l-2 border-sunset-coral pl-4 text-left">
              <span className="block font-display text-2xl font-black text-ocean-deep">9</span>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Puertos a tu Servicio
              </span>
            </div>
          </div>
        </div>

        {/* Right Story Graphic column */}
        <div className="lg:col-span-5 relative min-h-[440px] rounded-2xl overflow-hidden flex flex-col justify-end p-6 group shadow-lg">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/30 to-transparent z-10" />
            <img
              src={equipoSalon}
              alt="Equipo Terminal Pesquero"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              loading="lazy"
            />
          </div>

          <span className="absolute top-4 right-4 material-symbols-outlined text-[90px] text-white/10 -rotate-12 pointer-events-none">
            anchor
          </span>

          <div className="relative z-20 bg-ocean-deep/80 backdrop-blur-sm border border-white/10 p-5 rounded-xl text-left">
            <h3 className="font-display text-lg font-bold text-white mb-2">
              Visítanos en nuestros salones
            </h3>
            <p className="text-xs text-gray-200 leading-relaxed font-semibold">
              Nuestras 9 sedes abren de Lunes a Jueves de 12:00 pm a 4:30 pm, y los Fines de Semana (Viernes a Domingo) listos para servirte hasta las 5:00 pm en todo Lima.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
