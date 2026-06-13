import React, { useState } from "react";
import { Sede } from "../types";

interface NavbarProps {
  currentTab: "inicio" | "carta";
  onChangeTab: (tab: "inicio" | "carta") => void;
  cartCount: number;
  onToggleCart: () => void;
  sede: Sede | null;
  onChangeBranch: () => void;
}

export default function Navbar({
  currentTab,
  onChangeTab,
  cartCount,
  onToggleCart,
  sede,
  onChangeBranch,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full top-0 sticky z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3.5">
        
        {/* Brand Logo */}
        <button
          onClick={() => {
            onChangeTab("inicio");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-display text-[26px] md:text-[32px] leading-tight text-ocean-deep tracking-tighter hover:opacity-90 transition-opacity flex flex-col text-left font-black"
        >
          <span>TERMINAL</span>
          <span className="text-coastal-teal text-[16px] md:text-[18px] tracking-widest font-bold mt-[-6px]">
            PESQUERO
          </span>
        </button>

        {/* Desktop Nav Routing */}
        <div className="hidden md:flex space-x-8 items-center font-sans">
          <button
            onClick={() => {
              onChangeTab("inicio");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`font-semibold tracking-wide text-sm transition-all pb-1 border-b-2 ${
              currentTab === "inicio"
                ? "text-ocean-deep border-coastal-teal font-extrabold"
                : "text-gray-500 border-transparent hover:text-ocean-deep"
            }`}
          >
            Inicio & Locales
          </button>
          
          <button
            onClick={() => {
              onChangeTab("carta");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`font-semibold tracking-wide text-sm transition-all pb-1 border-b-2 ${
              currentTab === "carta"
                ? "text-ocean-deep border-coastal-teal font-extrabold"
                : "text-gray-500 border-transparent hover:text-ocean-deep"
            }`}
          >
            Carta Completa
          </button>

          <a
            href="https://api.whatsapp.com/send?phone=51902862400&text=Hola,%20quisiera%20hacer%20una%20consulta%20para%20un%20evento."
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-ocean-deep font-semibold tracking-wide text-sm transition-colors flex items-center gap-1"
          >
            Eventos
          </a>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-2 md:gap-4 font-sans">
          {/* Sede Selector quick info */}
          {sede && (
            <button
              onClick={onChangeBranch}
              className="hidden lg:flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-100 hover:bg-gray-120 hover:border-wave-blue/50 text-ocean-deep font-semibold px-3 py-2 rounded-lg transition-all"
            >
              <span className="text-sm">{sede.emoji}</span>
              <span className="max-w-[120px] truncate">{sede.suffix}</span>
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
          )}

          {/* Cart Toggle button */}
          <button
            onClick={onToggleCart}
            aria-label="Ver mi pedido"
            className="flex items-center justify-center p-2.5 text-ocean-deep hover:bg-gray-100 rounded-full transition-all relative select-none cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[26px]">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-sunset-coral text-white text-[10px] sm:text-xs font-bold leading-none min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 animate-pulse border-2 border-white shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Quick Book CTA */}
          <button
            onClick={() => onChangeTab("carta")}
            className="hidden md:flex bg-ocean-deep text-white px-5 py-3 rounded-lg hover:bg-ocean-deep/90 transition-all font-bold text-xs uppercase tracking-wider items-center gap-2 shadow-sm cursor-pointer hover:shadow"
          >
            <span className="material-symbols-outlined text-sm font-bold">restaurant_menu</span>
            La Carta
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            className="md:hidden text-ocean-deep p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[30px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-4 py-4 space-y-3 shadow-md animate-fadeIn">
          <button
            onClick={() => {
              onChangeTab("inicio");
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left py-2 px-3 rounded-lg font-bold text-sm tracking-wide block ${
              currentTab === "inicio" ? "bg-wave-blue/20 text-ocean-deep" : "text-gray-600"
            }`}
          >
            Inicio & Locales
          </button>
          
          <button
            onClick={() => {
              onChangeTab("carta");
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left py-2 px-3 rounded-lg font-bold text-sm tracking-wide block ${
              currentTab === "carta" ? "bg-wave-blue/20 text-ocean-deep" : "text-gray-600"
            }`}
          >
            Ver Carta Completa
          </button>

          <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
            {sede && (
              <button
                onClick={() => {
                  onChangeBranch();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-3 rounded-lg font-semibold text-xs text-gray-500 bg-gray-50 flex items-center gap-1.5"
              >
                <span>{sede.emoji}</span>
                <span>Ubicación seleccionada: {sede.suffix}</span>
                <span className="font-bold underline text-coastal-teal ml-auto">Cambiar</span>
              </button>
            )}

            <button
              onClick={() => {
                onToggleCart();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-wave-blue/10 text-ocean-deep py-2.5 rounded-lg text-center text-sm font-bold flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">shopping_cart</span>
              Mi Carrito ({cartCount})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
