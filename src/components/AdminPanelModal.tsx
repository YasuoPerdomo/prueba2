import React, { useState } from "react";
import { Dish } from "../types";
import { DISHES } from "../data";

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onToggleAdmin: (active: boolean) => void;
  dishes: Dish[];
  onUpdateDishes: (newDishes: Dish[]) => void;
  onShowToast: (msg: string, type?: "success" | "info" | "warning") => void;
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
}: AdminPanelModalProps) {
  const [activeTab, setActiveTab] = useState<"platos" | "nuevo" | "horario">("platos");
  const [searchFilter, setSearchFilter] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

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
                <div className="space-y-6 max-w-xl mx-auto py-2">
                  <div className="bg-gradient-to-r from-ocean-deep/5 to-teal-500/10 border border-teal-500/20 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-sm text-ocean-deep">
                          Modo Administrador (Anular Horario)
                        </h4>
                        <p className="text-xs text-gray-500">
                          Cuando está activo, la cocina se considera <b>siempre abierta</b> para ti, permitiéndote probar la web, ver toda la carta y realizar pedidos de prueba.
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
                        className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                          isAdmin ? "bg-emerald-500 justify-end" : "bg-gray-300 justify-start"
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full bg-white shadow-md" />
                      </button>
                    </div>

                    <div className="text-xs bg-white/80 p-3 rounded-xl border border-gray-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>
                        Estado actual: <b>{isAdmin ? "Acceso Total Sin Restricciones (Admin)" : "Vista Normal (Cliente)"}</b>
                      </span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-2xl p-5 bg-white">
                    <h4 className="font-bold text-sm text-ocean-deep mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-500 text-lg">schedule</span>
                      Horario Comercial Oficial de la Cocina
                    </h4>
                    <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-5">
                      <li><b>Lunes a Jueves:</b> 12:00 PM a 4:30 PM</li>
                      <li><b>Viernes a Domingo:</b> 12:00 PM a 5:00 PM</li>
                    </ul>
                    <p className="text-[11px] text-gray-400 mt-3">
                      Fuera de estos horarios, los clientes comunes verán el banner de cocina cerrada y no podrán enviar pedidos. Como admin, tú siempre puedes operar.
                    </p>
                  </div>
                </div>
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
