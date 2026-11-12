import React, { useState, useEffect } from "react";
import { Dish, BusinessSchedule, ClaimRecord } from "../types";
import { DISHES } from "../data";
import AdminAnalyticsTab from "./AdminAnalyticsTab";

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onToggleAdmin: (active: boolean) => void;
  dishes: Dish[];
  onUpdateDishes: (newDishes: Dish[]) => void;
  onShowToast: (msg: string, type?: "success" | "info" | "warning") => void;
  schedule: BusinessSchedule;
  onUpdateSchedule: (newSchedule: BusinessSchedule) => void;
}

const PRESET_IMAGES = [
  { label: "Ceviche Clásico", url: "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=500&q=75&fm=webp" },
  { label: "Arroz con Mariscos", url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=75&fm=webp" },
  { label: "Chicharrón de Pescado", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=75&fm=webp" },
  { label: "Causa Marina", url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=75&fm=webp" },
  { label: "Bebida Marina / Chicha", url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=75&fm=webp" },
];

const CATEGORIES = [
  { id: "ceviches", label: "Ceviches" },
  { id: "entradas", label: "Entradas" },
  { id: "fondos", label: "Fondos" },
  { id: "caldos", label: "Caldos" },
  { id: "menu-kids", label: "Para Peques" },
  { id: "combos", label: "Combos" },
  { id: "duos", label: "Dúos Power" },
  { id: "bebidas", label: "Bebidas" },
  { id: "postres", label: "Postres" },
];

export default function AdminPanelModal({
  isOpen,
  onClose,
  isAdmin,
  onToggleAdmin,
  dishes,
  onUpdateDishes,
  onShowToast,
  schedule,
  onUpdateSchedule,
}: AdminPanelModalProps) {
  const [activeTab, setActiveTab] = useState<"platos" | "nuevo" | "horario" | "reclamos" | "ventas">("platos");
  const [searchFilter, setSearchFilter] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Claims state
  const [claims, setClaims] = useState<ClaimRecord[]>(() => {
    try {
      const raw = localStorage.getItem("tp_claims_data");
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error("Error reading tp_claims_data", e);
    }
    return [];
  });
  const [selectedClaim, setSelectedClaim] = useState<ClaimRecord | null>(null);
  const [claimSearchFilter, setClaimSearchFilter] = useState("");
  const [claimStatusFilter, setClaimStatusFilter] = useState<"todos" | "pendiente" | "en_proceso" | "atendido">("todos");

  // Reload claims when modal is open or activeTab changes
  useEffect(() => {
    if (isOpen) {
      try {
        const raw = localStorage.getItem("tp_claims_data");
        if (raw) setClaims(JSON.parse(raw));
      } catch (e) {
        console.error("Error reloading tp_claims_data", e);
      }
    }
  }, [isOpen, activeTab]);

  const handleUpdateClaimStatus = (claimId: string, newStatus: 'pendiente' | 'en_proceso' | 'atendido') => {
    const updated = claims.map(c => c.id === claimId ? { ...c, status: newStatus } : c);
    setClaims(updated);
    localStorage.setItem("tp_claims_data", JSON.stringify(updated));
    if (selectedClaim && selectedClaim.id === claimId) {
      setSelectedClaim({ ...selectedClaim, status: newStatus });
    }
    onShowToast(`Estado de ${claimId} actualizado a "${newStatus.replace('_', ' ')}"`, "info");
  };

  const handleDeleteClaim = (claimId: string) => {
    const updated = claims.filter(c => c.id !== claimId);
    setClaims(updated);
    localStorage.setItem("tp_claims_data", JSON.stringify(updated));
    if (selectedClaim && selectedClaim.id === claimId) {
      setSelectedClaim(null);
    }
    onShowToast(`Registro ${claimId} eliminado`, "warning");
  };

  // Business schedule edit form state
  const [schedForm, setSchedForm] = useState<BusinessSchedule>(schedule);

  useEffect(() => {
    setSchedForm(schedule);
  }, [schedule]);

  const format12h = (timeStr?: string): string => {
    if (!timeStr) return "";
    const [hStr, mStr] = timeStr.split(":");
    let h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10) || 0;
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12;
    const minFormatted = m < 10 ? `0${m}` : `${m}`;
    return `${h}:${minFormatted} ${ampm}`;
  };

  // Form state for creating a new dish
  const [newDish, setNewDish] = useState<Partial<Dish>>({
    name: "",
    price: 39.0,
    category: "ceviches",
    description: "",
    image: PRESET_IMAGES[0].url,
    badge: "Nuevo",
    noSpicy: false,
    isAvailable: true,
  });

  if (!isOpen) return null;

  // Simple PIN validation (default 1234 or direct unlock)
  const handleUnlockAdmin = () => {
    if (pinInput === "1234" || pinInput === "" || pinInput.toLowerCase() === "admin") {
      onToggleAdmin(true);
      setPinError(false);
      onShowToast("¡Acceso correcto! Modo Administrador activado.", "success");
    } else {
      setPinError(true);
    }
  };

  const handleToggleAvailability = (dishId: string) => {
    const updated = dishes.map((d) => {
      if (d.id === dishId) {
        const nextState = d.isAvailable === false ? true : false;
        onShowToast(`${d.name}: ${nextState ? "Disponible" : "Marcado como Agotado"}`, "info");
        return { ...d, isAvailable: nextState };
      }
      return d;
    });
    onUpdateDishes(updated);
  };

  const handleDeleteDish = (dishId: string, dishName: string) => {
    const updated = dishes.filter((d) => d.id !== dishId);
    onUpdateDishes(updated);
    onShowToast(`Plato "${dishName}" eliminado con éxito`, "warning");
  };

  const handleResetDishes = () => {
    onUpdateDishes(DISHES);
    localStorage.removeItem("tp_custom_dishes");
    onShowToast("Carta restaurada a los platos originales de fábrica", "success");
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price) {
      onShowToast("Por favor completa el nombre y precio del plato.", "warning");
      return;
    }

    const created: Dish = {
      id: `custom_${Date.now()}`,
      name: newDish.name.trim(),
      price: Number(newDish.price),
      description: newDish.description || "Exquisito plato preparado con ingredientes frescos del día.",
      category: newDish.category || "ceviches",
      image: newDish.image || PRESET_IMAGES[0].url,
      badge: newDish.badge || undefined,
      noSpicy: Boolean(newDish.noSpicy),
      isAvailable: true,
      isNew: true,
    };

    const updated = [created, ...dishes];
    onUpdateDishes(updated);
    onShowToast(`¡Plato "${created.name}" añadido exitosamente a la carta!`, "success");
    
    // Reset form
    setNewDish({
      name: "",
      price: 39.0,
      category: "ceviches",
      description: "",
      image: PRESET_IMAGES[0].url,
      badge: "Nuevo",
      noSpicy: false,
      isAvailable: true,
    });
    setActiveTab("platos");
  };

  const filteredDishes = dishes.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-ocean-deep/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden font-sans">
        
        {/* Header */}
        <div className="bg-ocean-deep text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-sunset-coral flex items-center justify-center text-xl">
              ⚙️
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight font-display">
                  Panel de Administración - Creador
                </h2>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isAdmin ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-gray-500/20 text-gray-300"
                }`}>
                  {isAdmin ? "Admin Activo" : "Modo Cliente"}
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Añade o elimina platos, gestiona disponibilidad y anula restricción de horario.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* If NOT logged in / Admin mode not active, show quick unlock screen */}
        {!isAdmin ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 text-sunset-coral flex items-center justify-center text-3xl mb-4 shadow-sm">
              🔐
            </div>
            <h3 className="font-display font-black text-xl text-ocean-deep mb-2">
              Acceso Exclusivo para el Administrador
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Como creador de la página, activa el Modo Administrador para saltarte el horario cerrado y gestionar platos.
            </p>

            <div className="w-full space-y-3">
              <div>
                <input
                  type="password"
                  placeholder="Código PIN (por defecto: 1234)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUnlockAdmin()}
                  className="w-full px-4 py-2.5 text-center text-sm font-bold tracking-widest bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-sunset-coral"
                />
                {pinError && (
                  <p className="text-xs text-red-500 mt-1 font-bold">
                    Código incorrecto. Intenta con 1234 o déjalo vacío.
                  </p>
                )}
              </div>

              <button
                onClick={handleUnlockAdmin}
                className="w-full py-3 bg-ocean-deep hover:bg-[#07243b] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
              >
                Ingresar al Modo Administrador
              </button>

              <p className="text-[11px] text-gray-400 mt-2">
                Tip: También puedes entrar añadiendo <b>?admin=true</b> al final de la URL en tu navegador.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-2.5 flex items-center justify-between shrink-0 overflow-x-auto gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("platos")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "platos"
                      ? "bg-ocean-deep text-white shadow-xs"
                      : "bg-white text-gray-600 border border-gray-200 hover:text-ocean-deep"
                  }`}
                >
                  📋 Platos de la Carta ({dishes.length})
                </button>

                <button
                  onClick={() => setActiveTab("nuevo")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    activeTab === "nuevo"
                      ? "bg-sunset-coral text-white shadow-xs"
                      : "bg-white text-gray-600 border border-gray-200 hover:text-sunset-coral"
                  }`}
                >
                  <span>➕ Añadir Nuevo Plato</span>
                </button>

                <button
                  onClick={() => setActiveTab("horario")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "horario"
                      ? "bg-ocean-deep text-white shadow-xs"
                      : "bg-white text-gray-600 border border-gray-200 hover:text-ocean-deep"
                  }`}
                >
                  ⏰ Horario y Modo Libre
                </button>

                <button
                  onClick={() => setActiveTab("reclamos")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "reclamos"
                      ? "bg-ocean-deep text-white shadow-xs"
                      : "bg-white text-gray-600 border border-gray-200 hover:text-ocean-deep"
                  }`}
                >
                  <span>📖 Reclamaciones</span>
                  {claims.length > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      claims.some(c => c.status === "pendiente")
                        ? "bg-red-500 text-white animate-pulse"
                        : "bg-gray-200 text-gray-700"
                    }`}>
                      {claims.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("ventas")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "ventas"
                      ? "bg-ocean-deep text-white shadow-xs"
                      : "bg-white text-gray-600 border border-gray-200 hover:text-ocean-deep"
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px] text-sunset-coral">analytics</span>
                  <span>📊 Ventas & Gráficos</span>
                </button>
              </div>

              <button
                onClick={() => {
                  onToggleAdmin(false);
                  onClose();
                  onShowToast("Modo administrador desactivado. Ahora ves como cliente.", "info");
                }}
                className="text-xs text-red-600 hover:text-red-700 font-bold px-3 py-1 rounded-lg hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
              >
                Cerrar Sesión Admin
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-grow">
              
              {/* TAB 1: LISTA DE PLATOS */}
              {activeTab === "platos" && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="relative w-full sm:w-72">
                      <input
                        type="text"
                        placeholder="Buscar plato para editar/eliminar..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-coastal-teal font-medium"
                      />
                      <span className="material-symbols-outlined text-[18px] text-gray-400 absolute left-2.5 top-2">
                        search
                      </span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => setActiveTab("nuevo")}
                        className="px-3.5 py-2 bg-sunset-coral hover:bg-[#e08d2d] text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                      >
                        <span>➕ Añadir Plato</span>
                      </button>

                      <button
                        onClick={handleResetDishes}
                        className="px-3 py-2 text-gray-500 hover:text-red-600 border border-gray-200 rounded-xl text-xs font-semibold hover:bg-red-50 transition-colors cursor-pointer"
                        title="Restaurar carta de fábrica"
                      >
                        Restablecer Originales
                      </button>
                    </div>
                  </div>

                  {/* Dishes list table */}
                  <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100 max-h-[50vh] overflow-y-auto">
                    {filteredDishes.length === 0 ? (
                      <div className="p-8 text-center text-gray-400 text-xs">
                        No se encontraron platos con esa búsqueda.
                      </div>
                    ) : (
                      filteredDishes.map((dish) => (
                        <div
                          key={dish.id}
                          className="p-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/70 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={dish.image}
                              alt={dish.name}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-200"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                              }}
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-xs sm:text-sm text-ocean-deep truncate">
                                  {dish.name}
                                </h4>
                                {dish.badge && (
                                  <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold uppercase px-1.5 py-0.5 rounded">
                                    {dish.badge}
                                  </span>
                                )}
                                {dish.isAvailable === false && (
                                  <span className="text-[9px] bg-red-100 text-red-700 font-extrabold uppercase px-1.5 py-0.5 rounded">
                                    Agotado
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-gray-400 truncate max-w-md">
                                {dish.category.toUpperCase()} • S/ {dish.price.toFixed(2)} • {dish.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Toggle availability */}
                            <button
                              onClick={() => handleToggleAvailability(dish.id)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-colors cursor-pointer ${
                                dish.isAvailable !== false
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                                  : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                              }`}
                            >
                              {dish.isAvailable !== false ? "✓ Disponible" : "✕ Agotado"}
                            </button>

                            {/* Delete dish button */}
                            <button
                              onClick={() => handleDeleteDish(dish.id, dish.name)}
                              className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                              title="Eliminar plato"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: AÑADIR NUEVO PLATO */}
              {activeTab === "nuevo" && (
                <form onSubmit={handleCreateDish} className="space-y-4 max-w-2xl mx-auto">
                  <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 font-medium">
                    ✨ Completa los datos para añadir un nuevo plato a la carta. Se guardará de inmediato y aparecerá visible en la carta.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Nombre del Plato *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Ceviche Poderoso del Norte"
                        value={newDish.name}
                        onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-sunset-coral font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Precio en Soles (S/) *
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        required
                        placeholder="39.00"
                        value={newDish.price}
                        onChange={(e) => setNewDish({ ...newDish, price: parseFloat(e.target.value) })}
                        className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-sunset-coral font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Categoría *
                      </label>
                      <select
                        value={newDish.category}
                        onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-sunset-coral font-medium"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Etiqueta / Badge (Opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Nuevo, Recomendado, Joya Marina"
                        value={newDish.badge || ""}
                        onChange={(e) => setNewDish({ ...newDish, badge: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-sunset-coral font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Descripción del Plato
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Describe los ingredientes, pesca del día y preparación..."
                      value={newDish.description}
                      onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-sunset-coral font-medium"
                    />
                  </div>

                  {/* Image selection */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Foto del Plato (Selecciona una sugerida o ingresa URL)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2">
                      {PRESET_IMAGES.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setNewDish({ ...newDish, image: img.url })}
                          className={`border-2 rounded-xl p-1 text-left transition-all cursor-pointer ${
                            newDish.image === img.url
                              ? "border-sunset-coral ring-2 ring-sunset-coral/30"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <img src={img.url} alt={img.label} className="w-full h-12 object-cover rounded-lg mb-1" />
                          <span className="text-[10px] font-bold text-gray-700 block truncate">{img.label}</span>
                        </button>
                      ))}
                    </div>
                    <input
                      type="url"
                      placeholder="O pega una URL de imagen personalizada (https://...)"
                      value={newDish.image}
                      onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-sunset-coral font-medium"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="noSpicyCheck"
                      checked={newDish.noSpicy}
                      onChange={(e) => setNewDish({ ...newDish, noSpicy: e.target.checked })}
                      className="w-4 h-4 text-sunset-coral rounded border-gray-300"
                    />
                    <label htmlFor="noSpicyCheck" className="text-xs font-bold text-gray-700">
                      Plato sin selector de ají (ej: caldos, bebidas, postres)
                    </label>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab("platos")}
                      className="px-4 py-2 border border-gray-300 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-sunset-coral hover:bg-[#e08d2d] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                    >
                      ✓ Guardar y Añadir a la Carta
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: HORARIOS Y MODO LIBRE */}
              {activeTab === "horario" && (
                <div className="space-y-6 max-w-2xl mx-auto py-2">
                  
                  {/* ADMIN BYPASS TOGGLE */}
                  <div className="bg-gradient-to-r from-ocean-deep/5 to-teal-500/10 border border-teal-500/20 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-sm text-ocean-deep flex items-center gap-1.5">
                          <span>🛡️ Modo Creador (Anular Horario para mí)</span>
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Cuando está activo, tú puedes navegar, ver la carta completa y hacer pedidos de prueba sin importar si la tienda está cerrada.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          onToggleAdmin(!isAdmin);
                          onShowToast(
                            !isAdmin ? "Modo Administrador Activado" : "Modo Administrador Desactivado",
                            "info"
                          );
                        }}
                        className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ml-4 ${
                          isAdmin ? "bg-emerald-500 justify-end" : "bg-gray-300 justify-start"
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full bg-white shadow-md" />
                      </button>
                    </div>

                    <div className="text-xs bg-white/90 p-3 rounded-xl border border-gray-100 flex items-center gap-2 font-medium">
                      <span className={`w-2.5 h-2.5 rounded-full ${isAdmin ? "bg-emerald-500 animate-pulse" : "bg-gray-400"}`} />
                      <span>
                        Tu vista actual: <b>{isAdmin ? "Acceso Total Sin Restricciones (Admin)" : "Vista Normal (Cliente)"}</b>
                      </span>
                    </div>
                  </div>

                  {/* MANUAL RESTAURANT OVERRIDE SELECTOR */}
                  <div className="border border-gray-200 rounded-2xl p-5 bg-white">
                    <div className="mb-3">
                      <h4 className="font-bold text-sm text-ocean-deep flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-500 text-lg">tune</span>
                        Control Rápido de Estado de la Cocina
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Define cómo se comportará la tienda para todos los clientes visitantes.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSchedForm({ ...schedForm, manualOverride: "auto" })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          schedForm.manualOverride === "auto" || !schedForm.manualOverride
                            ? "border-ocean-deep bg-ocean-deep text-white shadow-sm"
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <div className="text-xs font-bold flex items-center gap-1.5 mb-1">
                          <span>⏰ Automático</span>
                        </div>
                        <p className={`text-[11px] leading-tight ${
                          schedForm.manualOverride === "auto" || !schedForm.manualOverride ? "text-gray-200" : "text-gray-500"
                        }`}>
                          Abre y cierra solo según las horas fijadas abajo.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSchedForm({ ...schedForm, manualOverride: "always_open" })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          schedForm.manualOverride === "always_open"
                            ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <div className="text-xs font-bold flex items-center gap-1.5 mb-1">
                          <span>🟢 Forzar Abierto</span>
                        </div>
                        <p className={`text-[11px] leading-tight ${
                          schedForm.manualOverride === "always_open" ? "text-emerald-100" : "text-gray-500"
                        }`}>
                          Cocina abierta ahora mismo para todos sin importar la hora.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSchedForm({ ...schedForm, manualOverride: "always_closed" })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          schedForm.manualOverride === "always_closed"
                            ? "border-red-600 bg-red-600 text-white shadow-sm"
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <div className="text-xs font-bold flex items-center gap-1.5 mb-1">
                          <span>🔴 Forzar Cerrado</span>
                        </div>
                        <p className={`text-[11px] leading-tight ${
                          schedForm.manualOverride === "always_closed" ? "text-red-100" : "text-gray-500"
                        }`}>
                          Pausar pedidos inmediatamente (evento, feriado o pesca agotada).
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* SCHEDULE HOURS FORM */}
                  <div className="border border-gray-200 rounded-2xl p-5 bg-white space-y-4">
                    <div>
                      <h4 className="font-bold text-sm text-ocean-deep flex items-center gap-2">
                        <span className="material-symbols-outlined text-sunset-coral text-lg">edit_calendar</span>
                        Editar Horas de Apertura y Cierre
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Configura el rango en el que la cocina recibe pedidos en cada bloque semanal.
                      </p>
                    </div>

                    {/* Weekday Schedule: Lunes a Jueves */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/80">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black uppercase text-ocean-deep tracking-wider flex items-center gap-1.5">
                          <span>📅 Lunes a Jueves</span>
                        </span>
                        <span className="text-xs font-extrabold text-sunset-coral bg-sunset-coral/10 px-2.5 py-0.5 rounded-full">
                          {format12h(schedForm.weekdayOpen)} a {format12h(schedForm.weekdayClose)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            Hora de Apertura
                          </label>
                          <input
                            type="time"
                            value={schedForm.weekdayOpen}
                            onChange={(e) => setSchedForm({ ...schedForm, weekdayOpen: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-bold bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-sunset-coral"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            Hora de Cierre
                          </label>
                          <input
                            type="time"
                            value={schedForm.weekdayClose}
                            onChange={(e) => setSchedForm({ ...schedForm, weekdayClose: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-bold bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-sunset-coral"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Weekend Schedule: Viernes a Domingo */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/80">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black uppercase text-ocean-deep tracking-wider flex items-center gap-1.5">
                          <span>🔥 Viernes a Domingo</span>
                        </span>
                        <span className="text-xs font-extrabold text-coastal-teal bg-coastal-teal/10 px-2.5 py-0.5 rounded-full">
                          {format12h(schedForm.weekendOpen)} a {format12h(schedForm.weekendClose)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            Hora de Apertura
                          </label>
                          <input
                            type="time"
                            value={schedForm.weekendOpen}
                            onChange={(e) => setSchedForm({ ...schedForm, weekendOpen: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-bold bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-sunset-coral"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            Hora de Cierre
                          </label>
                          <input
                            type="time"
                            value={schedForm.weekendClose}
                            onChange={(e) => setSchedForm({ ...schedForm, weekendClose: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-bold bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-sunset-coral"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const def = {
                            weekdayOpen: "12:00",
                            weekdayClose: "16:30",
                            weekendOpen: "12:00",
                            weekendClose: "17:00",
                            manualOverride: "auto" as const,
                          };
                          setSchedForm(def);
                          onUpdateSchedule(def);
                          onShowToast("Horario comercial restablecido a valores predeterminados", "info");
                        }}
                        className="text-xs text-gray-500 hover:text-red-600 font-semibold underline cursor-pointer"
                      >
                        Restablecer Horario Predeterminado
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onUpdateSchedule(schedForm);
                          onShowToast("¡Horario comercial actualizado y guardado con éxito! ⏰", "success");
                        }}
                        className="w-full sm:w-auto px-6 py-2.5 bg-sunset-coral hover:bg-[#e08d2d] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                      >
                        ✓ Guardar Horario Comercial
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: RECLAMACIONES Y QUEJAS (LIBRO DE RECLAMACIONES) */}
              {activeTab === "reclamos" && (
                <div className="space-y-6">
                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-ocean-deep/5 border border-ocean-deep/15 rounded-2xl p-4">
                      <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block">Total Hojas</span>
                      <span className="text-2xl font-black text-ocean-deep mt-1 block">{claims.length}</span>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                      <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider block">Pendientes</span>
                      <span className="text-2xl font-black text-red-700 mt-1 block">
                        {claims.filter(c => c.status === "pendiente").length}
                      </span>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                      <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider block">En Proceso</span>
                      <span className="text-2xl font-black text-blue-700 mt-1 block">
                        {claims.filter(c => c.status === "en_proceso").length}
                      </span>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                      <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider block">Atendidos</span>
                      <span className="text-2xl font-black text-emerald-700 mt-1 block">
                        {claims.filter(c => c.status === "atendido").length}
                      </span>
                    </div>
                  </div>

                  {/* Search and Filter toolbar */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="relative w-full sm:w-80">
                      <input
                        type="text"
                        placeholder="Buscar por código, cliente o DNI..."
                        value={claimSearchFilter}
                        onChange={(e) => setClaimSearchFilter(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-sunset-coral font-medium"
                      />
                      <span className="material-symbols-outlined text-[18px] text-gray-400 absolute left-2.5 top-2">
                        search
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                      {(["todos", "pendiente", "en_proceso", "atendido"] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => setClaimStatusFilter(st)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap ${
                            claimStatusFilter === st
                              ? "bg-ocean-deep text-white shadow-xs"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {st.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Claims list */}
                  {(() => {
                    const filtered = claims.filter((c) => {
                      const matchesStatus = claimStatusFilter === "todos" || c.status === claimStatusFilter;
                      const q = claimSearchFilter.toLowerCase().trim();
                      const matchesSearch =
                        !q ||
                        c.id.toLowerCase().includes(q) ||
                        c.consumer.fullName.toLowerCase().includes(q) ||
                        c.consumer.docNumber.includes(q) ||
                        c.contractedGood.sede.toLowerCase().includes(q);
                      return matchesStatus && matchesSearch;
                    });

                    if (filtered.length === 0) {
                      return (
                        <div className="text-center py-12 px-4 bg-gray-50 border border-dashed border-gray-300 rounded-2xl">
                          <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">menu_book</span>
                          <h4 className="font-bold text-gray-700 text-sm">No se encontraron hojas de reclamación</h4>
                          <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                            Cuando los clientes registren una queja o reclamo a través del Libro de Reclamaciones Virtual en la web, aparecerán aquí para tu gestión y respuesta legal.
                          </p>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-3">
                        {filtered.map((claim) => (
                          <div
                            key={claim.id}
                            className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-sunset-coral/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="space-y-1.5 flex-grow">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono font-black text-sm text-ocean-deep">{claim.id}</span>
                                <span className="text-gray-400 text-xs">•</span>
                                <span className="text-xs text-gray-500">{claim.createdAt}</span>
                                
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                  claim.claimDetail.type === "reclamo"
                                    ? "bg-red-100 text-red-700 border border-red-200"
                                    : "bg-amber-100 text-amber-800 border border-amber-200"
                                }`}>
                                  {claim.claimDetail.type.toUpperCase()}
                                </span>

                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                  claim.status === "pendiente"
                                    ? "bg-red-500 text-white"
                                    : claim.status === "en_proceso"
                                    ? "bg-blue-600 text-white"
                                    : "bg-emerald-600 text-white"
                                }`}>
                                  {claim.status.replace("_", " ")}
                                </span>
                              </div>

                              <div className="text-xs text-gray-800 font-semibold">
                                <span>{claim.consumer.fullName}</span>
                                <span className="text-gray-500 font-normal ml-2">
                                  ({claim.consumer.docType}: {claim.consumer.docNumber})
                                </span>
                              </div>

                              <div className="text-xs text-gray-600 flex flex-wrap items-center gap-3">
                                <span>📍 Sede: <b>{claim.contractedGood.sede}</b></span>
                                {claim.contractedGood.amount && (
                                  <span>💰 Monto: <b>S/. {claim.contractedGood.amount.toFixed(2)}</b></span>
                                )}
                                <span>📞 {claim.consumer.phone}</span>
                              </div>

                              <p className="text-xs text-gray-500 line-clamp-1 italic bg-gray-50 p-2 rounded-lg border border-gray-100">
                                "{claim.claimDetail.detail}"
                              </p>
                            </div>

                            {/* Actions and Status selector */}
                            <div className="flex flex-wrap md:flex-col items-end gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                              <select
                                value={claim.status}
                                onChange={(e) => handleUpdateClaimStatus(claim.id, e.target.value as any)}
                                className="px-2.5 py-1.5 text-xs font-bold rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:border-sunset-coral cursor-pointer"
                              >
                                <option value="pendiente">🔴 Pendiente</option>
                                <option value="en_proceso">🔵 En Proceso</option>
                                <option value="atendido">🟢 Atendido</option>
                              </select>

                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedClaim(claim)}
                                  className="px-3 py-1.5 bg-ocean-deep hover:bg-[#163866] text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                                >
                                  <span className="material-symbols-outlined text-sm">visibility</span>
                                  <span>Detalle</span>
                                </button>

                                <a
                                  href={`https://api.whatsapp.com/send?phone=51${claim.consumer.phone.replace(/\D/g, '')}&text=${encodeURIComponent(
                                    `Estimado(a) ${claim.consumer.fullName}, nos comunicamos desde Terminal Pesquero respecto a su Hoja de Reclamación N° ${claim.id}.`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 bg-whatsapp-green hover:brightness-95 text-white rounded-xl transition-all cursor-pointer"
                                  title="Contactar por WhatsApp"
                                >
                                  <span className="material-symbols-outlined text-sm">chat</span>
                                </a>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteClaim(claim.id)}
                                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                                  title="Eliminar registro"
                                >
                                  <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}

                  {/* MODAL DETALLE DE RECLAMO EN ADMIN */}
                  {selectedClaim && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto space-y-4">
                        <div className="flex items-center justify-between border-b pb-3 border-gray-200">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-base text-ocean-deep">
                                Hoja de Reclamación: <span className="font-mono">{selectedClaim.id}</span>
                              </h3>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                selectedClaim.claimDetail.type === "reclamo" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"
                              }`}>
                                {selectedClaim.claimDetail.type.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">Registrado el {selectedClaim.createdAt}</p>
                          </div>

                          <button
                            onClick={() => setSelectedClaim(null)}
                            className="text-gray-400 hover:text-gray-700 p-1 rounded-full cursor-pointer"
                          >
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>

                        {/* Customer details */}
                        <div className="bg-gray-50 rounded-xl p-4 text-xs space-y-2">
                          <h4 className="font-bold text-ocean-deep uppercase text-[10px] tracking-wider">
                            1. Consumidor Reclamante
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-gray-700">
                            <div><b>Nombre:</b> {selectedClaim.consumer.fullName}</div>
                            <div><b>Documento:</b> {selectedClaim.consumer.docType}: {selectedClaim.consumer.docNumber}</div>
                            <div><b>Teléfono:</b> {selectedClaim.consumer.phone}</div>
                            <div><b>Email:</b> {selectedClaim.consumer.email}</div>
                            <div className="col-span-2"><b>Dirección:</b> {selectedClaim.consumer.address}</div>
                            {selectedClaim.consumer.isMinor && (
                              <div className="col-span-2 text-amber-800">
                                <b>Menor de edad. Apoderado:</b> {selectedClaim.consumer.parentName}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Good details */}
                        <div className="bg-gray-50 rounded-xl p-4 text-xs space-y-2">
                          <h4 className="font-bold text-ocean-deep uppercase text-[10px] tracking-wider">
                            2. Bien Contratado
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-gray-700">
                            <div><b>Tipo:</b> <span className="capitalize">{selectedClaim.contractedGood.type}</span></div>
                            <div><b>Sede:</b> {selectedClaim.contractedGood.sede}</div>
                            {selectedClaim.contractedGood.amount && (
                              <div><b>Monto Reclamado:</b> S/. {selectedClaim.contractedGood.amount.toFixed(2)}</div>
                            )}
                            {selectedClaim.contractedGood.description && (
                              <div className="col-span-2"><b>Descripción / Boleta:</b> {selectedClaim.contractedGood.description}</div>
                            )}
                          </div>
                        </div>

                        {/* Facts & request */}
                        <div className="space-y-3 text-xs">
                          <div>
                            <h4 className="font-bold text-ocean-deep uppercase text-[10px] tracking-wider mb-1">
                              3. Detalle de los Hechos:
                            </h4>
                            <div className="p-3 bg-white border border-gray-200 rounded-xl text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
                              {selectedClaim.claimDetail.detail}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-ocean-deep uppercase text-[10px] tracking-wider mb-1">
                              4. Pedido Concreto del Consumidor:
                            </h4>
                            <div className="p-3 bg-white border border-gray-200 rounded-xl text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
                              {selectedClaim.claimDetail.request}
                            </div>
                          </div>
                        </div>

                        {/* Status change in detail view */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-700">Cambiar Estado:</span>
                            <select
                              value={selectedClaim.status}
                              onChange={(e) => handleUpdateClaimStatus(selectedClaim.id, e.target.value as any)}
                              className="px-3 py-1.5 font-bold rounded-xl border border-gray-300 bg-gray-50 cursor-pointer"
                            >
                              <option value="pendiente">🔴 Pendiente</option>
                              <option value="en_proceso">🔵 En Proceso</option>
                              <option value="atendido">🟢 Atendido</option>
                            </select>
                          </div>

                          <div className="flex gap-2">
                            <a
                              href={`https://api.whatsapp.com/send?phone=51${selectedClaim.consumer.phone.replace(/\D/g, '')}&text=${encodeURIComponent(
                                `Estimado(a) ${selectedClaim.consumer.fullName}, nos comunicamos desde Terminal Pesquero respecto a su Hoja de Reclamación N° ${selectedClaim.id}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 bg-whatsapp-green hover:brightness-95 text-white rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-sm">chat</span>
                              Responder WhatsApp
                            </a>
                            <button
                              onClick={() => setSelectedClaim(null)}
                              className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold cursor-pointer"
                            >
                              Cerrar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: VENTAS Y RESUMEN GRÁFICO (RECHARTS) */}
              {activeTab === "ventas" && (
                <AdminAnalyticsTab
                  dishes={dishes}
                  onShowToast={onShowToast}
                />
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex items-center justify-between text-xs text-gray-500 shrink-0">
          <span>Terminal Pesquero • Sistema de Administración</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-bold transition-colors cursor-pointer"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
}
