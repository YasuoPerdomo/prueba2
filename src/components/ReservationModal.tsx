import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sede } from "../types";
import { SEDES } from "../data";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSede: Sede | null;
  onSuccess: (message: string) => void;
}

export default function ReservationModal({
  isOpen,
  onClose,
  selectedSede,
  onSuccess,
}: ReservationModalProps) {
  const [sedeId, setSedeId] = useState("");
  const [customerName, setCustomerName] = useState(() => {
    try {
      return localStorage.getItem("tp_customer_name") || "";
    } catch {
      return "";
    }
  });
  const [customerPhone, setCustomerPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("4");
  const [notes, setNotes] = useState("");

  // Sync Sede when modal is opened with preselected branch
  useEffect(() => {
    if (selectedSede) {
      setSedeId(selectedSede.id);
    } else {
      setSedeId(SEDES[0]?.id || "");
    }
  }, [selectedSede, isOpen]);

  // Sync Customer name from localStorage if updated elsewhere
  useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem("tp_customer_name") || "";
        if (saved && !customerName) {
          setCustomerName(saved);
        }
      } catch (e) {
        console.error("Local storage error", e);
      }
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentSede = SEDES.find((s) => s.id === sedeId);
    if (!currentSede) {
      alert("Por favor elige una sede para tu reserva.");
      return;
    }

    if (!customerName.trim()) {
      alert("Por favor, ingresa tu Nombre para la reserva.");
      return;
    }

    if (!date || !time) {
      alert("Por favor, selecciona una Fecha y Hora válidas.");
      return;
    }

    // Save Name to improve future deliveries and reservations
    try {
      localStorage.setItem("tp_customer_name", customerName.trim());
    } catch (e) {
      console.error(e);
    }

    // Format neat WhatsApp invitation
    let wsMsg = `*RESERVA DE MESA - TERMINAL PESQUERO* 🌊🐟\n\n`;
    wsMsg += `👤 *Cliente:* ${customerName.trim()}\n`;
    if (customerPhone.trim()) {
      wsMsg += `📞 *Teléfono:* ${customerPhone.trim()}\n`;
    }
    wsMsg += `🏬 *Sede de Reserva:* ${currentSede.name}\n`;
    wsMsg += `📅 *Fecha:* ${date}\n`;
    wsMsg += `⏰ *Hora:* ${time}\n`;
    wsMsg += `👥 *Comensales:* ${guests} personas\n`;
    if (notes.trim()) {
      wsMsg += `📝 *Detalles/Notas:* ${notes.trim()}\n`;
    }
    wsMsg += `------------------------------------------\n`;
    wsMsg += `¡Hola! Deseo confirmar la reserva de esta mesa para disfrutar en salón de sus delicias marinas. Por favor me confirman disponibilidad. ¡Muchas gracias! ⚓✨`;

    const encodedText = encodeURIComponent(wsMsg);
    const targetUrl = `https://api.whatsapp.com/send?phone=${currentSede.phone}&text=${encodedText}`;
    
    window.open(targetUrl, "_blank");
    onSuccess(`¡Reserva enviada exitosamente a la sede ${currentSede.suffix.toUpperCase()}! 📱🥳`);
    onClose();
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 z-[120] backdrop-blur-xs"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 overflow-y-auto pointer-events-none">
            <motion.div
              initial={{ scale: 0.93, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden font-sans border border-gray-150 text-left pointer-events-auto"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-ocean-deep via-[#0d2e5e] to-coastal-teal px-6 py-5 text-white relative">
                <span className="material-symbols-outlined text-[42px] text-white/10 absolute right-4 top-3 -rotate-12 select-none pointer-events-none">
                  table_restaurant
                </span>
                <span className="bg-sunset-coral/95 text-white text-[9px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full inline-block mb-1.5 shadow-sm">
                  Salón Tradicional
                </span>
                <h3 className="text-xl font-display font-black leading-tight">
                  Reservar Mesa en Salón
                </h3>
                <p className="text-xs text-wave-blue/95 font-medium mt-1 leading-snug">
                  Ven con la familia a disfrutar la pesca más fresca y jugosa de Lima
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-4 hover:bg-white/10 text-white hover:text-sunset-coral px-2.5 py-1 rounded-full transition-colors font-bold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg leading-none">close</span>
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Sede Selector */}
                <div>
                  <label className="block text-[11px] font-black text-ocean-deep uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#EFA351]">storefront</span>
                    1. Elige tu Sede:
                  </label>
                  <select
                    value={sedeId}
                    onChange={(e) => setSedeId(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-ocean-deep focus:outline-none focus:border-coastal-teal shadow-2xs cursor-pointer"
                  >
                    {SEDES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.emoji} Terminal Pesquero - {s.name} ({s.address})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black text-ocean-deep uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#EFA351]">calendar_today</span>
                      2. Fecha:
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-coastal-teal shadow-2xs cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-ocean-deep uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#EFA351]">schedule</span>
                      3. Hora:
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-coastal-teal shadow-2xs cursor-pointer"
                    >
                      <option value="">Seleccionar hora</option>
                      {/* Generar horas acordes al servicio (12:00 PM a 4:30 PM) */}
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="12:30 PM">12:30 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="1:30 PM">1:30 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="2:30 PM">2:30 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="3:30 PM">3:30 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="4:30 PM">4:30 PM</option>
                      <option value="5:00 PM">5:00 PM (Solo Fin de S.)</option>
                    </select>
                  </div>
                </div>

                {/* Guest Selector & Phone Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black text-ocean-deep uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#EFA351]">groups</span>
                      4. Personas:
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-coastal-teal shadow-2xs cursor-pointer"
                    >
                      <option value="1">1 Personita</option>
                      <option value="2">2 Personas (Mesa Dúo)</option>
                      <option value="3">3 Personas</option>
                      <option value="4">4 Personas (Mesa Estándar)</option>
                      <option value="5">5 Personas</option>
                      <option value="6">6 Personas</option>
                      <option value="7">7 a 8 Personas (Familiar)</option>
                      <option value="9">9 a 10 Personas (Gran Grupo)</option>
                      <option value="12+">Más de 12 (Evento Especial)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-ocean-deep uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#EFA351]">phone_android</span>
                      5. Celular (Opcional):
                    </label>
                    <input
                      type="tel"
                      placeholder="Ej. 9xx xxx xxx"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-coastal-teal shadow-2xs"
                    />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[11px] font-black text-ocean-deep uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#EFA351]">person</span>
                    6. Nombre de Contacto:
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre completo, por favor"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-coastal-teal shadow-2xs"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[11px] font-black text-ocean-deep uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#EFA351]">edit_note</span>
                    7. ¿Alguna indicación o celebración especial?
                  </label>
                  <textarea
                    placeholder="Ej. Cumpleaños de mi abuela, mesa con silla de ruedas, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-coastal-teal shadow-2xs"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-3 border-t border-gray-100 flex gap-3 text-xs font-bold">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-500 text-center uppercase tracking-wide transition-colors cursor-pointer select-none font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-3 py-3 bg-ocean-deep hover:bg-[#0b2752] active:scale-98 text-white rounded-xl text-center uppercase tracking-wide transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer font-black"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    <span>Confirmar por WhatsApp</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
