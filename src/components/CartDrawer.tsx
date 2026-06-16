import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem, Sede, Dish } from "../types";

// Helper of available pre-configured suggested side-dishes, drinks, and desserts
const SUGGESTED_ADDONS: Dish[] = [
  {
    id: "add_chicha_morada_vaso",
    name: "Chicha Morada Heladita (Vaso)",
    price: 8.50,
    description: "Néctar casero de maíz morado, piña, manzana, canela, clavo de olor y gotas de limón norteño.",
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80",
    noSpicy: true,
  },
  {
    id: "add_chicha_morada_jarra",
    name: "Jarra de Chicha Morada (1L)",
    price: 19.50,
    description: "La jarra helada favorita del terminal, ideal para compartir en mesa salvaje.",
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80",
    noSpicy: true,
  },
  {
    id: "pos_chocolate", // Matches standard ID for deep integration
    name: "Torta de Chocolate Norteña",
    price: 18.00,
    description: "Clásica y húmeda torta de cacao puro peruano al 70%, con harto manjar blanco.",
    category: "postres",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80",
    noSpicy: true,
  },
  {
    id: "pos_limon", // Matches standard ID for deep integration
    name: "Pie de Limón Real",
    price: 17.00,
    description: "Crema cítrica premium de limón norteño sobre base crocante y merengue suizo.",
    category: "postres",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=300&q=80",
    noSpicy: true,
  }
];

// Helper to determine delivery minutes per sede (25 to 30 min)
const getSedeMinutes = (sedeId: string): number => {
  switch (sedeId) {
    case "begonias": return 25;
    case "jesus_maria": return 28;
    case "barranco": return 26;
    case "chacarilla": return 29;
    case "miraflores": return 25;
    case "monterrico": return 30;
    case "san_isidro": return 27;
    case "punta_hermosa": return 30;
    case "san_miguel": return 29;
    default: return 25;
  }
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs} min`;
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (dishId: string, quantity: number, spicyLevel?: 'bajo' | 'medio' | 'alto') => void;
  onRemoveItem: (dishId: string, spicyLevel?: 'bajo' | 'medio' | 'alto') => void;
  onAddToCart: (dish: Dish, spicyLevel?: 'bajo' | 'medio' | 'alto') => void;
  sede: Sede | null;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  sede,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    if (!sede) return 25 * 60;
    return getSedeMinutes(sede.id) * 60;
  });

  // Reset/set timer when sede changes
  useEffect(() => {
    if (sede) {
      setTimeLeft(getSedeMinutes(sede.id) * 60);
    }
  }, [sede?.id]);

  // Live ticking countdown when drawer is open
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, timeLeft]);

  // Calculate order totals
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);

  // Auto scroll to lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSendOrder = () => {
    if (!sede) {
      alert("Error: Primero elige tu sede.");
      return;
    }

    if (!customerName.trim() || !customerAddress.trim()) {
      alert("Por favor, ingresa tu Nombre y Dirección de Entrega antes de enviar.");
      return;
    }

    if (cart.length === 0) {
      alert("Tu carrito está vacío. ¡Agrega un cevichazo u otro plato delicioso!");
      return;
    }

    // Compose custom, clean, stylized message that delights the owners
    let message = `*NUEVO PEDIDO - TERMINAL PESQUERO* 🌊🐟\n\n`;
    message += `👤 *Cliente:* ${customerName.trim()}\n`;
    message += `🏬 *Sede de Despacho:* ${sede.name}\n`;
    message += `📍 *Dirección de Entrega:* ${customerAddress.trim()}\n`;
    message += `------------------------------------------\n`;

    cart.forEach(item => {
      const itemCost = item.dish.price * item.quantity;
      const spicyText = item.spicyLevel ? ` [Picante: ${item.spicyLevel.toUpperCase()}]` : '';
      message += `▪️ ${item.quantity}x _${item.dish.name}_${spicyText} (S/ ${itemCost.toFixed(2)})\n`;
    });

    message += `------------------------------------------\n`;
    message += `💰 *TOTAL A PAGAR: S/ ${totalPrice.toFixed(2)}*\n\n`;
    message += `¡Hola! Acabo de armar mi pedido desde la web para la sede *${sede.suffix}*. Quedo atento a la confirmación de cocina para el delivery. ¡Gracias! 🚀`;

    const encodedText = encodeURIComponent(message);
    const targetUrl = `https://api.whatsapp.com/send?phone=${sede.phone}&text=${encodedText}`;
    window.open(targetUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white z-[110] shadow-2xl flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-ocean-deep to-[#0b2752] text-white flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[26px]">shopping_cart</span>
                <div className="text-left">
                  <h2 className="font-display font-black text-xl tracking-tight">Tu Pedido</h2>
                  <p className="text-[10px] text-wave-blue uppercase font-bold tracking-wider">
                    Sabor de altamar garantizado
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 px-2.5 rounded-full hover:bg-white/10 text-white hover:text-sunset-coral font-bold transition-all flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Display banner of the current dispatch branch */}
            {sede && (
              <div className="flex flex-col bg-sky-50 border-b border-sky-100 divide-y divide-sky-100/40">
                <div className="px-5 py-2 text-xs text-ocean-deep font-semibold flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span>{sede.emoji}</span>
                    <span>Despacho: <b>{sede.suffix}</b></span>
                  </div>
                  <span className="text-[10px] bg-ocean-deep text-white py-0.5 px-2 rounded-full uppercase font-bold tracking-wider">
                    Sede Activa
                  </span>
                </div>
                
                {/* Visual Delivery Estimate & Timer */}
                <div className="px-5 py-2.5 flex items-center justify-between bg-emerald-50/70 text-emerald-800">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[19px] text-emerald-600 animate-pulse font-bold">
                      local_shipping
                    </span>
                    <div className="text-left">
                      <p className="text-[10px] text-emerald-700/95 uppercase font-black tracking-wider leading-none mb-0.5">
                        Entrega de Sabor Estimada
                      </p>
                      <p className="text-[11px] font-medium text-emerald-950/90 leading-tight">
                        Tu pedido llegará fresquecito en:
                      </p>
                    </div>
                  </div>
                  
                  {/* Digital active countdown box */}
                  <div className="bg-emerald-600 border border-emerald-500/20 text-white font-mono text-center font-black px-2.5 py-1 rounded-lg flex items-center gap-1 text-xs shadow-3xs">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Items Container */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-gray-400 font-sans">
                  <span className="material-symbols-outlined text-6xl text-wave-blue animate-bounce block mb-4">
                    set_meal
                  </span>
                  <p className="font-bold text-gray-700 text-lg">Tu carrito está vacío.</p>
                  <p className="text-xs max-w-[240px] mx-auto mt-2 leading-relaxed">
                    ¡Cebichéate de una vez causa! Agrega unos sabrosos platos desde la carta.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 bg-ocean-deep text-white hover:bg-coastal-teal px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    Ver la carta
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Artículos Añadidos ({totalItems})
                  </p>
                  {cart.map(item => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={`${item.dish.id}_${item.spicyLevel || 'medio'}`}
                      className="flex items-center justify-between bg-gray-50 border border-gray-100 p-3 rounded-xl gap-3 shadow-none hover:shadow-xs transition-shadow"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0 relative">
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80";
                          }}
                        />
                      </div>

                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold text-sm text-ocean-deep truncate leading-tight">
                          {item.dish.name}
                        </h4>
                        <div className="flex flex-wrap gap-1 items-center mt-1">
                          {item.spicyLevel && (
                            <span className={`inline-flex items-center gap-0.5 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md ${
                              item.spicyLevel === 'bajo' 
                                ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                                : item.spicyLevel === 'medio' 
                                ? 'bg-orange-50 text-orange-700 border border-orange-200' 
                                : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                              🌶️ {item.spicyLevel}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-bold text-sunset-coral block mt-1">
                          S/ {(item.dish.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Controls Area */}
                      <div className="flex items-center gap-2">
                        {/* +/- Counters */}
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-2xs">
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1, item.spicyLevel)}
                            className="px-2 py-1 text-ocean-deep hover:bg-gray-100 font-extrabold text-sm transition-colors rounded-l-lg cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-gray-700 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1, item.spicyLevel)}
                            className="px-2 py-1 text-ocean-deep hover:bg-gray-100 font-extrabold text-sm transition-colors rounded-r-lg cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => onRemoveItem(item.dish.id, item.spicyLevel)}
                          className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                          title="Eliminar del pedido"
                        >
                          <span className="material-symbols-outlined text-[19px]">delete</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Interactive Suggestions Section */}
                  {(() => {
                    const cartDishIds = new Set(cart.map(item => item.dish.id));
                    const availableSuggestions = SUGGESTED_ADDONS.filter(addon => !cartDishIds.has(addon.id));
                    
                    if (availableSuggestions.length === 0) return null;
                    
                    return (
                      <div className="pt-5 border-t border-gray-100/90 mt-6 text-left">
                        <div className="flex items-center gap-1.5 mb-3">
                          <span className="material-symbols-outlined text-[18px] text-sunset-coral animate-pulse font-bold">
                            restaurant
                          </span>
                          <h4 className="text-[11px] font-black text-ocean-deep uppercase tracking-widest">
                            ¿Deseas agregar un acompañamiento?
                          </h4>
                        </div>
                        
                        <div className="space-y-2.5">
                          {availableSuggestions.map(addon => (
                            <div
                              key={addon.id}
                              className="flex items-center gap-3 bg-ocean-deep/[0.02] border border-gray-150 p-2.5 rounded-xl hover:bg-sky-50/50 hover:border-sky-100 transition-all duration-300"
                            >
                              <img
                                src={addon.image}
                                alt={addon.name}
                                referrerPolicy="no-referrer"
                                className="w-12 h-12 object-cover rounded-lg shrink-0 shadow-3xs"
                                loading="lazy"
                              />
                              <div className="flex-grow min-w-0">
                                <p className="text-xs font-bold text-ocean-deep truncate leading-snug">
                                  {addon.name}
                                </p>
                                <p className="text-[10px] text-gray-500 truncate mt-0.5">
                                  {addon.description}
                                </p>
                                <span className="text-xs font-black text-sunset-coral block mt-0.5">
                                  S/ {addon.price.toFixed(2)}
                                </span>
                              </div>
                              <button
                                onClick={() => onAddToCart(addon, 'medio')}
                                className="bg-ocean-deep hover:bg-coastal-teal text-white font-extrabold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shrink-0 transition-all select-none hover:scale-102 cursor-pointer shadow-3xs"
                              >
                                <span className="material-symbols-outlined text-[13px] font-bold">add</span>
                                <span>Añadir</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Delivery Form Controls & Summary */}
            <div className="p-5 border-t border-gray-100 bg-gray-50 space-y-3.5 shrink-0">
              {cart.length > 0 && (
                <>
                  <div className="space-y-2.5">
                    {/* Customer Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-ocean-deep uppercase tracking-widest mb-1.5">
                        Nombre de quien recibe:
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-coastal-teal focus:ring-2 focus:ring-coastal-teal/10 font-medium placeholder-gray-400 shadow-3xs"
                      />
                    </div>

                    {/* Destination Address */}
                    <div>
                      <label className="block text-[11px] font-bold text-ocean-deep uppercase tracking-widest mb-1.5">
                        Dirección de entrega:
                      </label>
                      <input
                        type="text"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="Ej. Av. Larco 123, Dpto. 402 - Miraflores"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-coastal-teal focus:ring-2 focus:ring-coastal-teal/10 font-medium placeholder-gray-400 shadow-3xs"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-dashed border-gray-200 space-y-3 mt-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-ocean-deep uppercase tracking-wider">
                        Total de la Orden:
                      </span>
                      <span className="font-display text-2xl font-black text-sunset-coral tracking-tight">
                        S/ {totalPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={handleSendOrder}
                      className="w-full bg-whatsapp-green hover:brightness-95 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <span className="material-symbols-outlined font-bold text-base">chat</span>
                      Enviar Pedido por WhatsApp
                    </button>
                    
                    <p className="text-[10px] text-gray-400 text-center leading-normal font-medium max-w-xs mx-auto">
                      * Al enviar, se solicitará confirmación en la aplicación de WhatsApp de tu dispositivo.
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
