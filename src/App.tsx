import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sede, Dish, CartItem } from "./types";
import { SEDES, DISHES } from "./data";
import heroCeviche from "./assets/images/hero_ceviche_1781339366808.jpg";
import arrozMariscos from "./assets/images/arroz_mariscos_1781339688351.jpg";
import causaAcevichada from "./assets/images/causa_acevichada_1781341093495.jpg";

// Components
import Navbar from "./components/Navbar";
import HeaderBanner from "./components/HeaderBanner";
import BranchModal from "./components/BranchModal";
import CartDrawer from "./components/CartDrawer";
import DishCard from "./components/DishCard";
import CustomToast from "./components/CustomToast";

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

  // Display Toast Helper
  const showToast = (text: string, type: "success" | "info" | "warning" = "success") => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Branch Selector actions
  const handleSelectBranch = (sede: Sede) => {
    setSelectedSede(sede);
    localStorage.setItem("tp_sede_index", sede.id);
    localStorage.setItem("sede_seleccionada", sede.id);
    setIsBranchModalOpen(false);
    showToast(`¡Ajá! Sede cambiada a Terminal Pesquero - ${sede.suffix.toUpperCase()} 🌊`, "success");
  };

  // Cart operations
  const handleAddToCart = (dish: Dish) => {
    // Intercept with Sede selector first if not chosen
    if (!selectedSede) {
      setIsBranchModalOpen(true);
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.dish.id === dish.id);
      if (existing) {
        showToast(`Se aumentó cantidad de: ${dish.name} 🐟`);
        return prev.map(item =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast(`¡Excelente! ${dish.name} añadido al pedido 🛒`);
      return [...prev, { dish, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(dishId);
      return;
    }
    setCart(prev => prev.map(item => (item.dish.id === dishId ? { ...item, quantity } : item)));
  };

  const handleRemoveItem = (dishId: string) => {
    const found = cart.find(item => item.dish.id === dishId);
    if (found) {
      showToast(`Se retiró ${found.dish.name} del pedido`, "warning");
    }
    setCart(prev => prev.filter(item => item.dish.id !== dishId));
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
              {/* --- HERO AREA --- */}
              <header className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-ocean-deep pt-16 pb-20">
                {/* Carousel backdrop with overlay */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/95 via-ocean-deep/70 to-ocean-deep/45 z-10 mix-blend-multiply" />
                  <img
                    src={heroCeviche}
                    alt="Cevichería Terminal Pesquero"
                    className="w-full h-full object-cover bg-center"
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
                        onClick={() => {
                          setCurrentTab("carta");
                          setActiveCategory("todos");
                        }}
                        className="bg-sunset-coral hover:bg-[#e08d2d] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">menu_book</span>
                        Ver la Carta Completa
                      </button>

                      <button
                        onClick={() => {
                          setCurrentTab("carta");
                          setActiveCategory("duos");
                        }}
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

              {/* --- SPECIALTIES BENTO GRID --- */}
              <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs text-coastal-teal font-black uppercase tracking-widest block mb-2">
                    Lo Mejor del Puerto
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ocean-deep">
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
                            if (item) handleAddToCart(item);
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
                            if (item) handleAddToCart(item);
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
                      src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80"
                      alt="Chicharrón Mixto"
                      className="absolute inset-0 w-full h-full object-cover object-right group-hover:scale-102 transition-transform duration-700"
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
                            if (item) handleAddToCart(item);
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
                      onClick={() => {
                        setCurrentTab("carta");
                        setActiveCategory("combos");
                      }}
                      className="bg-white text-ocean-deep hover:bg-sunset-coral hover:text-white px-7 py-3 rounded-xl text-xs uppercase font-extrabold tracking-widest transition-all shadow-md cursor-pointer"
                    >
                      Ver Combos
                    </button>
                  </div>
                </div>
              </section>

              {/* --- REAL REVIEWS / TESTIMONIALS --- */}
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

              {/* --- HISTORIA SECTION --- */}
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
                        src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80"
                        alt="Equipo Terminal Pesquero"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
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

              {/* --- SEDES SECTOR --- */}
              <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                  <span className="text-xs text-coastal-teal font-black uppercase tracking-widest">Encuéntranos</span>
                  <h2 className="font-display text-3xl font-extrabold text-ocean-deep mt-1">Sedes Terminal Pesquero</h2>
                  <p className="text-xs text-gray-400 mt-1">Haz clic en tu local favorito para empezar a ordenar</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 font-sans">
                  {SEDES.map(s => {
                    const isActive = selectedSede?.id === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => handleSelectBranch(s)}
                        className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                          isActive
                            ? "border-coastal-teal bg-wave-blue/10 shadow-md ring-2 ring-coastal-teal/10"
                            : "border-gray-100 hover:border-wave-blue hover:bg-white bg-white hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-3xl bg-gray-50 p-2.5 rounded-xl block">{s.emoji}</span>
                          {isActive && (
                            <span className="bg-ocean-deep text-white text-[9px] uppercase font-bold py-1 px-2.5 rounded-full">
                              Sede Activa
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-sm text-ocean-deep uppercase tracking-tight">
                          {s.suffix}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 leading-normal font-medium">
                          {s.address}
                        </p>
                        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-coastal-teal">
                          <span>Establecer como sede</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
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
        sede={selectedSede}
      />

      {/* Interactive Branch Selection Modal */}
      <BranchModal
        isOpen={isBranchModalOpen}
        onSelect={handleSelectBranch}
        onClose={() => setIsBranchModalOpen(false)}
        currentSede={selectedSede}
      />

      {/* Top notifier toasts */}
      <CustomToast toasts={toasts} />
    </div>
  );
}
