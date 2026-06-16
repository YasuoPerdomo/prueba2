import React from "react";

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <span className="text-xs text-sunset-coral font-black uppercase tracking-wider">Testimonios</span>
          <h2 className="font-display text-3xl font-extrabold text-ocean-deep mt-1">El Veredicto de la Gente</h2>
          <p className="text-xs text-gray-400 mt-1">Lo que nuestros comensales comentan en redes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="bg-[#F9F6F2] p-6 rounded-xl border border-gray-100/50 flex flex-col justify-between text-left">
            <p className="text-xs text-gray-600 font-medium italic leading-relaxed">
              &ldquo;¡Uff, causa! El ceviche carretillero con su chicharrón de pota crujiente estuvo recontra taipá, bien picantito y fresco como en el mismo Callao. Recomendadísimo.&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-amber-400 text-sm">★★★★★</span>
              <span className="text-xs font-bold text-ocean-deep">— Renzo P. (Causa Fiel)</span>
            </div>
          </div>
          <div className="bg-[#F9F6F2] p-6 rounded-xl border border-gray-100/50 flex flex-col justify-between text-left">
            <p className="text-xs text-gray-600 font-medium italic leading-relaxed">
              &ldquo;Pedimos el Combo Chiclayo para el almuerzo del domingo y llegó al toque, la chicha morada estaba heladita y el arroz con mariscos bien cremoso. Un sabor excelente.&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-amber-400 text-sm">★★★★★</span>
              <span className="text-xs font-bold text-ocean-deep">— Mariana T. (La Molina)</span>
            </div>
          </div>
          <div className="bg-[#F9F6F2] p-6 rounded-xl border border-gray-100/50 flex flex-col justify-between text-left">
            <p className="text-xs text-gray-600 font-medium italic leading-relaxed">
              &ldquo;Los tequeños del terminal y el Arroz Chaufa de Mariscos son sencillamente de otro mundo. Súper abundante la porción, ideal para compartir en familia una tarde.&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-amber-400 text-sm">★★★★★</span>
              <span className="text-xs font-bold text-ocean-deep">— Gianfranco S. (Miraflores)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
