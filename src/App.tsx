import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sede, Dish, CartItem } from "./types";
import { SEDES, DISHES } from "./data";
import heroCeviche from "./assets/images/hero_ceviche_1781339366808.jpg";
import arrozMariscos from "./assets/images/arroz_mariscos_1781339688351.jpg";
import causaAcevichada from "./assets/images/causa_acevichada_1781341093495.jpg";
import chicharronPescado from "./assets/images/chicharron_pescado_1781563544480.jpg";
import equipoSalon from "./assets/images/equipo_salon_1781563781348.jpg";

// Components
import Navbar from "./components/Navbar";
import HeaderBanner from "./components/HeaderBanner";
import BranchModal from "./components/BranchModal";
import CartDrawer from "./components/CartDrawer";
import DishCard from "./components/DishCard";
import CustomToast from "./components/CustomToast";
import ReservationModal from "./components/ReservationModal";

// Modular Home Sections
import HeroSection from "./components/home/HeroSection";
import SpecialtiesSection from "./components/home/SpecialtiesSection";
import TestimonialsSection from "./components/home/TestimonialsSection";
import HistorySection from "./components/home/HistorySection";
import SedesSection from "./components/home/SedesSection";

export default function App() {
  // Restore State from localStorage
  const initSede = (): Sede | null => {
    try {
      const saved = localStorage.getItem("tp_sede_index") || localStorage.getItem("sede_seleccionada");
      if (saved) {
        const found = SEDES.find(s => s.id === saved);
        if (found) return found;
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
    return null;
  };

  const [selectedSede, setSelectedSede] = useState<Sede | null>(initSede());
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(!initSede());
  const [currentTab, setCurrentTab] = useState<"inicio" | "carta">("inicio");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [toasts, setToasts] = useState<{ id: string; text: string; type: "success" | "info" | "warning" }[]>([]);

  // Admin Mode state to override business hours restriction
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const adminParam = params.get("admin");
      if (adminParam === "true") {
        localStorage.setItem("tp_admin_mode", "true");
        return true;
      } else if (adminParam === "false") {
        localStorage.setItem("tp_admin_mode", "false");
        return false;
      }
      return localStorage.getItem("tp_admin_mode") === "true";
    } catch (e) {
      return false;
    }
  });

  // Table reservation state variables
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationPreSede, setReservationPreSede] = useState<Sede | null>(null);

  const handleOpenReservation = (preselected?: Sede | null) => {
    setReservationPreSede(preselected || selectedSede);
    setIsReservationOpen(true);
  };

  // Check if restaurant is closed based on current local device time
  const checkIfClosed = (): boolean => {
    if (isAdmin) return false;

    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;

    // Lunes a Jueves: 12:00 PM a 4:30 PM (720 min a 990 min)
    // Viernes a Domingo: 12:00 PM a 5:00 PM (720 min a 1020 min)
    const isWeekend = day === 0 || day === 5 || day === 6; // Sun, Fri, Sat
    
    const openTime = 12 * 60; // 12:00 PM (720 min)
    const closeTime = isWeekend ? (17 * 60) : (16 * 60 + 30); // 17:00 (1020 min) vs 16:30 (990 min)

    return currentTimeInMinutes < openTime || currentTimeInMinutes >= closeTime;
  };

  const getClosedReason = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;

    const isWeekend = day === 0 || day === 5 || day === 6;
    const openTime = 12 * 60; // 12:00 PM

    const scheduleStr = "Lunes a Jueves de 12:00 PM a 4:30 PM & Viernes a Domingo de 12:00 PM a 5:00 PM";

    if (currentTimeInMinutes < openTime) {
      return {
        title: "¡La cocina de Terminal Pesquero se está preparando!",
        message: "Actualmente nos encontramos cerrados afinando el sabor y recibiendo la pesca del día más fresca del litoral.",
        badge: "Cerrado temporalmente",
        nextOpen: "Hoy a las 12:00 PM",
        hours: scheduleStr
      };
    } else {
      return {
        title: "¡Hasta mañana, marinero! La cocina ha cerrado",
        message: "Nuestra cocina cerró sus fuegos por hoy para garantizar que cada ingrediente servido sea de la máxima frescura del día. ¡Te esperamos mañana para deleitarte!",
        badge: "Servicio finalizado por hoy",
        nextOpen: "Mañana a las 12:00 PM",
        hours: scheduleStr
      };
    }
  };

  const [isClosed, setIsClosed] = useState<boolean>(() => {
    if (isAdmin) return false;
    return checkIfClosed();
  });

  // Display Toast Helper
  const showToast = (text: string, type: "success" | "info" | "warning" = "success") => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  useEffect(() => {
    if (isAdmin) {
      setIsClosed(false);
      return;
    }
    setIsClosed(checkIfClosed());
    // Check every 10 seconds to keep it real-time
    const interval = setInterval(() => {
      setIsClosed(checkIfClosed());
    }, 10000);
    return () => clearInterval(interval);
  }, [isAdmin]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get("admin");
    if (adminParam === "true") {
      showToast("¡Bienvenido creador! Modo Administrador ACTIVO 🛠️. Restricciones horarias desactivadas.", "success");
      // Clean up URL parameter to keep URL clean but maintain session
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    } else if (adminParam === "false") {
      showToast("Modo administrador desactivado. Ahora ves la página como cliente.", "info");
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  // Branch Selector actions
  const handleSelectBranch = (sede: Sede) => {
    setSelectedSede(sede);
    localStorage.setItem("tp_sede_index", sede.id);
    localStorage.setItem("sede_seleccionada", sede.id);
    setIsBranchModalOpen(false);
    showToast(`¡Ajá! Sede cambiada a Terminal Pesquero - ${sede.suffix.toUpperCase()} 🌊`, "success");
  };

  // Cart operations
  const handleAddToCart = (dish: Dish, spicyLevel: 'bajo' | 'medio' | 'alto' = 'medio') => {
    // Intercept with Sede selector first if not chosen
    if (!selectedSede) {
      setIsBranchModalOpen(true);
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.dish.id === dish.id && item.spicyLevel === spicyLevel);
      if (existing) {
        showToast(`Se aumentó cantidad de: ${dish.name} (${spicyLevel.toUpperCase()}) 🐟`);
        return prev.map(item =>
          (item.dish.id === dish.id && item.spicyLevel === spicyLevel) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast(`¡Excelente! ${dish.name} (${spicyLevel.toUpperCase()}) añadido al pedido 🛒`);
      return [...prev, { dish, quantity: 1, spicyLevel }];
    });
  };

  const handleUpdateQuantity = (dishId: string, quantity: number, spicyLevel?: 'bajo' | 'medio' | 'alto') => {
    if (quantity <= 0) {
      handleRemoveItem(dishId, spicyLevel);
      return;
    }
    setCart(prev => prev.map(item => ((item.dish.id === dishId && item.spicyLevel === spicyLevel) ? { ...item, quantity } : item)));
  };

  const handleRemoveItem = (dishId: string, spicyLevel?: 'bajo' | 'medio' | 'alto') => {
    const found = cart.find(item => item.dish.id === dishId && item.spicyLevel === spicyLevel);
    if (found) {
      showToast(`Se retiró ${found.dish.name} (${(spicyLevel || 'medio').toUpperCase()}) del pedido`, "warning");
    }
    setCart(prev => prev.filter(item => !(item.dish.id === dishId && item.spicyLevel === spicyLevel)));
  };

  const handleUpdateSpicyLevel = (
    dishId: string,
    oldSpicy?: 'bajo' | 'medio' | 'alto',
    newSpicy?: 'bajo' | 'medio' | 'alto'
  ) => {
    setCart(prev => {
      const itemToChange = prev.find(item => item.dish.id === dishId && item.spicyLevel === oldSpicy);
      if (!itemToChange) return prev;

      const existing = prev.find(item => item.dish.id === dishId && item.spicyLevel === newSpicy);

      if (existing && oldSpicy !== newSpicy) {
        showToast(`Se unificó ${itemToChange.dish.name} con Ají ${newSpicy?.toUpperCase()}`);
        return prev
          .map(item => {
            if (item.dish.id === dishId && item.spicyLevel === newSpicy) {
              return { ...item, quantity: item.quantity + itemToChange.quantity };
            }
            return item;
          })
          .filter(item => !(item.dish.id === dishId && item.spicyLevel === oldSpicy));
      } else {
        showToast(`Término de ají cambiado a ${newSpicy?.toUpperCase()} para ${itemToChange.dish.name}`);
        return prev.map(item => {
          if (item.dish.id === dishId && item.spicyLevel === oldSpicy) {
            return { ...item, spicyLevel: newSpicy };
          }
          return item;
        });
      }
    });
  };

  // Filtering Menu
  const filteredDishes = DISHES.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "todos" || dish.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Clean layout render
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F9F6F2] text-[#1c1c1a]">
      {/* Top Warning Banner about branch choice */}
      <HeaderBanner
        sede={selectedSede}
        onChangeBranch={() => setIsBranchModalOpen(true)}
      />

      {/* Primary Navigation System */}
      <Navbar
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        cartCount={cartCount}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
        sede={selectedSede}
        onChangeBranch={() => setIsBranchModalOpen(true)}
        isClosed={isClosed}
        onOpenReservation={() => handleOpenReservation()}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentTab === "inicio" ? (
            <motion.div
              key="inicio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <HeroSection
                heroCeviche={heroCeviche}
                onViewMenu={() => {
                  setCurrentTab("carta");
                  setActiveCategory("todos");
                }}
                onViewDuosCombos={() => {
                  setCurrentTab("carta");
                  setActiveCategory("duos");
                }}
              />

              <SpecialtiesSection
                arrozMariscos={arrozMariscos}
                causaAcevichada={causaAcevichada}
                chicharronPescado={chicharronPescado}
                onAddToCart={(dish) => handleAddToCart(dish, 'medio')}
                onViewCombos={() => {
                  setCurrentTab("carta");
                  setActiveCategory("combos");
                }}
              />

              <TestimonialsSection />

              <HistorySection equipoSalon={equipoSalon} />

              <SedesSection
                selectedSede={selectedSede}
                onSelectSede={handleSelectBranch}
                onOpenReservationForSede={(s) => handleOpenReservation(s)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="carta"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-12 max-w-7xl mx-auto px-4 md:px-8"
            >
              {/* --- CARTA COVER HEADER --- */}
              <header className="relative w-full rounded-2xl overflow-hidden bg-ocean-deep min-h-[30vh] flex items-center justify-center p-8 mb-8 select-none shadow-sm">
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/90 index-50 to-ocean-deep/50 mix-blend-multiply" />
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80"
                    alt="Ceviche de conchas"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="relative z-10 text-center max-w-xl">
                  <span className="bg-sunset-coral text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow">
                    Carta Delivery Web
                  </span>
                  <h1 className="font-display text-3xl sm:text-5xl font-black text-white mt-3 select-none">
                    Nuestros Platos Exclusivos
                  </h1>
                  <p className="text-xs text-wave-blue mt-2 font-semibold">
                    Selección premium de altamar. Preparados al instante para enviar a domicilio.
                  </p>
                </div>
              </header>

              {/* --- CLOSED RESTAURANT BANNER --- */}
              {isClosed && (() => {
                const info = getClosedReason();
                return (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-300 shadow-md ring-4 ring-amber-500/10"
                  >
                    <div className="flex flex-col md:flex-row items-stretch">
                      {/* Left icon slice */}
                      <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white px-6 py-8 md:py-0 flex flex-col items-center justify-center text-center shrink-0 w-full md:w-44 select-none">
                        <span className="material-symbols-outlined text-4xl mb-2 animate-bounce">
                          door_front
                        </span>
                        <span className="text-[10px] uppercase font-black tracking-widest text-[#FFF5EB]">
                          Cocina Cerrada
                        </span>
                        <div className="mt-2 bg-black/25 backdrop-blur-xs text-[#FFF5EB] px-3 py-1 rounded-full text-[9px] font-black tracking-wider uppercase">
                          {info.nextOpen}
                        </div>
                      </div>
                      
                      {/* Reason / Details text */}
                      <div className="p-6 flex-grow text-left flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h2 className="text-lg font-black text-amber-950 uppercase tracking-tight">
                              {info.title}
                            </h2>
                            <span className="bg-red-100 text-red-800 border border-red-200 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600" />
                              Cerrado Fuera de Horario
                            </span>
                          </div>
                          
                          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-semibold max-w-3xl">
                            {info.message}
                          </p>
                        </div>
                        
                        <div className="mt-5 pt-4 border-t border-amber-300/40 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-bold text-amber-950/95">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm text-amber-800">alarm_on</span>
                              <span>Nuestro Horario: <b className="text-amber-950 font-extrabold">{info.hours}</b></span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-xl text-amber-950">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-wider">
                              Los pedidos web se habilitarán a las 12:00 PM
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}

              {/* --- CATEGORIES HORIZONTAL NAVIGATION --- */}
              <div className="sticky top-16 z-40 bg-[#F9F6F2]/95 backdrop-blur-md border-y border-gray-200/60 py-3.5 px-1 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-xs select-none">
                <div className="w-full sm:w-auto overflow-x-auto sticky-nav flex gap-2 whitespace-nowrap scroll-smooth pb-1 md:pb-0">
                  {[
                    { id: "todos", label: "Todos" },
                    { id: "entradas", label: "Entradas" },
                    { id: "ceviches", label: "Ceviches" },
                    { id: "fondos", label: "Fondos" },
                    { id: "caldos", label: "Caldos" },
                    { id: "menu-kids", label: "Para Peques" },
                    { id: "combos", label: "Combos" },
                    { id: "duos", label: "Dúos Power" },
                    { id: "bebidas", label: "Bebidas" },
                    { id: "postres", label: "Postres" }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl uppercase tracking-wider transition-all cursor-pointer ${
                        activeCategory === cat.id
                          ? "bg-ocean-deep text-white shadow-sm"
                          : "bg-white text-gray-500 border border-gray-100 hover:border-wave-blue hover:text-ocean-deep"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* --- SEARCH BAR --- */}
                <div className="w-full sm:w-64 relative font-sans">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar platos..."
                    className="w-full px-3.5 py-2 pl-9 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-coastal-teal font-semibold placeholder-gray-400 shadow-3xs"
                  />
                  <span className="material-symbols-outlined text-[18px] text-gray-400 absolute left-3 top-2 pointer-events-none">
                    search
                  </span>
                </div>
              </div>



              {/* --- CARTA DISH GRID --- */}
              <div className="mt-8">
                {filteredDishes.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 italic text-gray-500 font-medium">
                    <span className="material-symbols-outlined text-4xl text-gray-300 block mb-2">sentiment_sad</span>
                    No se encontraron platos que coincidan con la búsqueda. Intenta con otra palabra.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDishes.map(dish => (
                      <DishCard
                        key={dish.id}
                        dish={dish}
                        onAddToCart={handleAddToCart}
                        isClosed={isClosed}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-ocean-deep border-t-8 border-sunset-coral text-white text-left font-sans mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo & Description */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-2xl font-black text-white tracking-tight">TERMINAL PESQUERO</h4>
            <span className="text-xs text-coastal-teal font-extrabold tracking-widest mt-[-8px]">SABOR DE ALTAMAR</span>
            <p className="text-xs text-gray-300 leading-relaxed font-semibold mt-3">
              Aquí se come recontra rico, causa. Platos potentes cocinados al momento con la receta de antaño. Pedidos y atención en salón garantizada.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-base font-bold text-sunset-coral mb-4 uppercase tracking-wider">Carta</h4>
            <ul className="text-xs space-y-2.5 font-semibold text-gray-300">
              <li><button onClick={() => { setCurrentTab("carta"); setActiveCategory("entradas"); }} className="hover:text-wave-blue">Entradas Potentes</button></li>
              <li><button onClick={() => { setCurrentTab("carta"); setActiveCategory("ceviches"); }} className="hover:text-wave-blue">Nuestros Ceviches</button></li>
              <li><button onClick={() => { setCurrentTab("carta"); setActiveCategory("fondos"); }} className="hover:text-wave-blue">Fondos Bien Taipá</button></li>
              <li><button onClick={() => { setCurrentTab("carta"); setActiveCategory("duos"); }} className="hover:text-wave-blue">Dúos & Combos</button></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display text-base font-bold text-sunset-coral mb-4 uppercase tracking-wider">Soporte</h4>
            <ul className="text-xs space-y-2.5 text-gray-300 font-semibold">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-coastal-teal">location_on</span>
                9 locales en todo Lima
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-coastal-teal">phone_iphone</span>
                <a href="tel:+51902862400" className="hover:text-wave-blue">902 862 400</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-coastal-teal">mail</span>
                <span>contacto@terminalpesquero.pe</span>
              </li>
            </ul>
          </div>

          {/* Socials & quick call */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-base font-bold text-sunset-coral uppercase tracking-wider">Síguenos</h4>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-coastal-teal transition-all">
                <span className="material-symbols-outlined text-base">photo_camera</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-coastal-teal transition-all">
                <span className="material-symbols-outlined text-base">thumb_up</span>
              </a>
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=51902862400&text=¡Hola!%20Deseo%20hacer%20un%20pedido."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-max bg-whatsapp-green hover:brightness-95 hover:text-white text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              Chatear Delivery
            </a>
          </div>
        </div>

        {/* copyright metadata */}
        <div className="border-t border-white/10 py-6 px-4 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
          <span>© 2024 Terminal Pesquero. Todos los derechos reservados. Sabor de altamar.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Términos y condiciones</a>
            <a href="#" className="hover:text-white">Política de Privacidad</a>
          </div>
        </div>
      </footer>

      {/* --- FLOATING MAIN ACTION BUTTON FOR CELLPHONES --- */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-[90] bg-sunset-coral hover:bg-[#e08d2d] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ring-4 ring-white"
        title="Ver Pedido"
      >
        <span className="material-symbols-outlined text-[28px]">shopping_basket</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-ocean-deep text-white text-[11px] font-extrabold w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white">
            {cartCount}
          </span>
        )}
      </button>

      {/* Sliding Shopping Drawer Overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddToCart={handleAddToCart}
        sede={selectedSede}
        onUpdateSpicyLevel={handleUpdateSpicyLevel}
      />

      {/* Interactive Branch Selection Modal */}
      <BranchModal
        isOpen={isBranchModalOpen}
        onSelect={handleSelectBranch}
        onClose={() => setIsBranchModalOpen(false)}
        currentSede={selectedSede}
      />

      {/* Table Reservation Dialog Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        selectedSede={reservationPreSede}
        onSuccess={(msg) => showToast(msg, "success")}
      />

      {/* Top notifier toasts */}
      <CustomToast toasts={toasts} />

      {/* Floating Admin Mode Indicator */}
      {isAdmin && (
        <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-2.5 bg-ocean-deep/95 border border-amber-500/50 text-white pl-4 pr-5 py-2.5 rounded-full shadow-2xl font-sans text-xs select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <b className="tracking-widest uppercase font-black text-sunset-coral text-[10px]">Admin Activo</b>
          </div>
          <span className="text-gray-500">|</span>
          <button
            onClick={() => {
              localStorage.setItem("tp_admin_mode", "false");
              setIsAdmin(false);
              showToast("Modo administrador desactivado. Ahora ves la página como cliente 🌊", "info");
            }}
            className="text-[#EFA351] hover:text-white font-extrabold uppercase tracking-wider text-[10px] transition-colors cursor-pointer"
          >
            Salir
          </button>
        </div>
      )}
    </div>
  );
}
