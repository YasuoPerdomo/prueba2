import React, { useState } from "react";
import { ClaimRecord, Sede } from "../types";
import { SEDES } from "../data";

interface LibroReclamacionesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessClaim?: (claim: ClaimRecord) => void;
  onShowToast: (msg: string, type?: "success" | "info" | "warning") => void;
}

export default function LibroReclamacionesModal({
  isOpen,
  onClose,
  onSuccessClaim,
  onShowToast,
}: LibroReclamacionesModalProps) {
  // Consumer fields
  const [fullName, setFullName] = useState("");
  const [docType, setDocType] = useState<"DNI" | "CE" | "Pasaporte" | "RUC">("DNI");
  const [docNumber, setDocNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isMinor, setIsMinor] = useState(false);
  const [parentName, setParentName] = useState("");

  // Contracted Good fields
  const [goodType, setGoodType] = useState<"producto" | "servicio">("producto");
  const [sedeKey, setSedeKey] = useState<string>(SEDES[0]?.id || "begonias");
  const [amount, setAmount] = useState<string>("");
  const [goodDescription, setGoodDescription] = useState("");

  // Claim Details
  const [claimType, setClaimType] = useState<"reclamo" | "queja">("reclamo");
  const [detail, setDetail] = useState("");
  const [request, setRequest] = useState("");

  // Legal checks
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptDataPolicy, setAcceptDataPolicy] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedClaim, setSubmittedClaim] = useState<ClaimRecord | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setFullName("");
    setDocNumber("");
    setPhone("");
    setEmail("");
    setAddress("");
    setIsMinor(false);
    setParentName("");
    setGoodType("producto");
    setAmount("");
    setGoodDescription("");
    setClaimType("reclamo");
    setDetail("");
    setRequest("");
    setAcceptTerms(false);
    setAcceptDataPolicy(false);
    setSubmittedClaim(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !docNumber.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      onShowToast("Por favor completa todos tus datos personales de contacto.", "warning");
      return;
    }

    if (!detail.trim() || !request.trim()) {
      onShowToast("Por favor detalla los hechos del reclamo y tu pedido concreto.", "warning");
      return;
    }

    if (!acceptTerms || !acceptDataPolicy) {
      onShowToast("Debes aceptar las declaraciones legales y la política de privacidad.", "warning");
      return;
    }

    setIsSubmitting(true);

    try {
      // Fetch existing claims to determine next correlative
      const existingRaw = localStorage.getItem("tp_claims_data");
      let claimsList: ClaimRecord[] = [];
      if (existingRaw) {
        try {
          claimsList = JSON.parse(existingRaw);
        } catch {
          claimsList = [];
        }
      }

      const nextNumber = claimsList.length + 1;
      const year = new Date().getFullYear();
      const codeId = `TP-${year}-${String(nextNumber).padStart(4, "0")}`;

      const selectedSedeObj = SEDES.find(s => s.id === sedeKey);
      const sedeName = selectedSedeObj ? selectedSedeObj.name : "Sede General / Web";

      const newClaim: ClaimRecord = {
        id: codeId,
        correlativeNumber: nextNumber,
        createdAt: new Date().toLocaleString("es-PE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        consumer: {
          fullName: fullName.trim(),
          docType,
          docNumber: docNumber.trim(),
          phone: phone.trim(),
          email: email.trim(),
          address: address.trim(),
          isMinor,
          parentName: isMinor ? parentName.trim() : undefined,
        },
        contractedGood: {
          type: goodType,
          sede: sedeName,
          amount: amount ? parseFloat(amount) : undefined,
          description: goodDescription.trim(),
        },
        claimDetail: {
          type: claimType,
          detail: detail.trim(),
          request: request.trim(),
        },
        status: "pendiente",
      };

      const updated = [newClaim, ...claimsList];
      localStorage.setItem("tp_claims_data", JSON.stringify(updated));

      setSubmittedClaim(newClaim);
      if (onSuccessClaim) {
        onSuccessClaim(newClaim);
      }
      onShowToast(`Hoja de Reclamación ${codeId} registrada correctamente`, "success");
    } catch (err) {
      console.error("Error al registrar reclamo:", err);
      onShowToast("Hubo un error al guardar la reclamación. Inténtalo de nuevo.", "warning");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsapp = (claim: ClaimRecord) => {
    const text = encodeURIComponent(
      `🌊 *LIBRO DE RECLAMACIONES VIRTUAL - TERMINAL PESQUERO*\n` +
      `*Hoja N°:* ${claim.id}\n` +
      `*Fecha:* ${claim.createdAt}\n` +
      `*Cliente:* ${claim.consumer.fullName} (${claim.consumer.docType}: ${claim.consumer.docNumber})\n` +
      `*Teléfono:* ${claim.consumer.phone}\n` +
      `*Tipo:* ${claim.claimDetail.type.toUpperCase()}\n` +
      `*Sede:* ${claim.contractedGood.sede}\n` +
      `*Detalle:* ${claim.claimDetail.detail.substring(0, 180)}...\n` +
      `*Pedido:* ${claim.claimDetail.request.substring(0, 180)}...\n\n` +
      `Adjunto constancia generada conforme a la Ley N° 29571.`
    );
    window.open(`https://api.whatsapp.com/send?phone=51902862400&text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-ocean-deep/80 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto max-h-[92vh] flex flex-col print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-ocean-deep via-[#163866] to-[#0d2346] text-white p-5 sm:p-6 shrink-0 relative border-b-4 border-sunset-coral print:bg-white print:text-black print:border-b-2 print:border-gray-800">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {/* Emblematic Indecopi-style Peruvian book badge */}
              <div className="w-13 h-13 rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center p-1 shadow-inner shrink-0 text-center print:border-gray-800">
                <span className="material-symbols-outlined text-sunset-coral text-2xl leading-none">menu_book</span>
                <span className="text-[8px] font-black uppercase tracking-wider text-white mt-0.5">Libro</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-display font-extrabold uppercase tracking-tight text-white print:text-black">
                    Libro de Reclamaciones
                  </h2>
                  <span className="bg-sunset-coral text-ocean-deep font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Virtual
                  </span>
                </div>
                <p className="text-xs text-gray-300 font-medium mt-0.5 print:text-gray-700">
                  Terminal Pesquero Cevichería S.A.C. • RUC: 20601284915
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5 print:text-gray-600">
                  Conforme a la Ley N° 29571 (Código de Protección y Defensa del Consumidor)
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer print:hidden"
              aria-label="Cerrar modal"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* CONTENT BODY */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 text-gray-800 text-xs sm:text-sm">
          
          {/* SUCCESS / RECEIPT VIEW */}
          {submittedClaim ? (
            <div className="space-y-6 py-2">
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 text-center text-emerald-950">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="material-symbols-outlined text-3xl">task_alt</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-emerald-900">
                  ¡Hoja de Reclamación Registrada!
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-emerald-800 mt-1 max-w-lg mx-auto">
                  Tu reclamo o queja ha sido ingresado en nuestro sistema con total validez legal conforme a la normativa de Indecopi.
                </p>

                <div className="mt-4 inline-flex flex-col items-center bg-white border border-emerald-300 rounded-xl px-5 py-3 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">N° de Hoja de Reclamación</span>
                  <span className="text-xl sm:text-2xl font-black text-ocean-deep tracking-widest font-mono mt-0.5">
                    {submittedClaim.id}
                  </span>
                  <span className="text-[10px] text-gray-500 mt-1">Registrado el {submittedClaim.createdAt}</span>
                </div>
              </div>

              {/* Legal Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
                <span className="material-symbols-outlined text-amber-600 text-lg shrink-0 mt-0.5">info</span>
                <div>
                  <p className="font-bold">Plazo de Atención Legal (D.S. N° 011-2011-PCM):</p>
                  <p className="mt-0.5 text-amber-800">
                    Terminal Pesquero dará respuesta a tu solicitud a través del correo electrónico o teléfono consignado en un plazo máximo no mayor a <b>quince (15) días hábiles</b> improrrogables.
                  </p>
                </div>
              </div>

              {/* Claim Summary Card */}
              <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/70 space-y-4">
                <h4 className="font-bold text-ocean-deep text-xs uppercase tracking-wider border-b border-gray-200 pb-2">
                  Resumen de la Reclamación
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Consumidor:</span>
                    <span className="font-bold text-gray-800">{submittedClaim.consumer.fullName}</span>
                    <span className="text-gray-600 block">{submittedClaim.consumer.docType}: {submittedClaim.consumer.docNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Contacto:</span>
                    <span className="font-bold text-gray-800">{submittedClaim.consumer.phone}</span>
                    <span className="text-gray-600 block">{submittedClaim.consumer.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Bien Contratado:</span>
                    <span className="font-bold text-gray-800 uppercase">{submittedClaim.contractedGood.type}</span>
                    <span className="text-gray-600 block">Sede: {submittedClaim.contractedGood.sede}</span>
                    {submittedClaim.contractedGood.amount && (
                      <span className="text-gray-600 block">Monto: S/. {submittedClaim.contractedGood.amount.toFixed(2)}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Naturaleza:</span>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mt-0.5 ${
                      submittedClaim.claimDetail.type === "reclamo" ? "bg-red-100 text-red-700 border border-red-200" : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}>
                      {submittedClaim.claimDetail.type.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 space-y-2 text-xs">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Detalle del Reclamo / Queja:</span>
                    <p className="mt-1 text-gray-800 bg-white p-3 rounded-lg border border-gray-200 whitespace-pre-wrap font-sans">
                      {submittedClaim.claimDetail.detail}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Pedido Concreto del Consumidor:</span>
                    <p className="mt-1 text-gray-800 bg-white p-3 rounded-lg border border-gray-200 whitespace-pre-wrap font-sans">
                      {submittedClaim.claimDetail.request}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 print:hidden">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-gray-300 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">print</span>
                  Imprimir / Guardar en PDF
                </button>
                <button
                  type="button"
                  onClick={() => handleSendWhatsapp(submittedClaim)}
                  className="flex-1 py-3 px-4 bg-whatsapp-green hover:brightness-95 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  Enviar Copia por WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="py-3 px-6 bg-ocean-deep hover:bg-[#163866] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            /* CLAIM SUBMISSION FORM */
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Indecopi Definitions banner */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-ocean-deep/5 border border-ocean-deep/15 rounded-2xl p-4 text-xs">
                <div className="border-r-0 md:border-r border-gray-200 md:pr-4">
                  <div className="flex items-center gap-1.5 font-bold text-ocean-deep">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>¿Qué es un RECLAMO?</span>
                  </div>
                  <p className="text-gray-600 mt-1 leading-relaxed text-[11px]">
                    Disconformidad relacionada a los <b>productos o servicios adquiridos</b> (calidad de comida, precios facturados, pedidos incompletos, etc.).
                  </p>
                </div>
                <div className="md:pl-2">
                  <div className="flex items-center gap-1.5 font-bold text-ocean-deep">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>¿Qué es una QUEJA?</span>
                  </div>
                  <p className="text-gray-600 mt-1 leading-relaxed text-[11px]">
                    Malestar o descontento respecto a la <b>atención al público o servicio</b> (demoras en atención, trato del personal, etc.), que no guarda relación directa con el producto.
                  </p>
                </div>
              </div>

              {/* SECCIÓN 1: DATOS DEL CONSUMIDOR */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <span className="w-6 h-6 rounded-full bg-sunset-coral text-white font-extrabold flex items-center justify-center text-xs">
                    1
                  </span>
                  <h3 className="font-bold text-sm uppercase tracking-wide text-ocean-deep">
                    Identificación del Consumidor Reclamante
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Nombres y Apellidos Completos *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Carlos Mendoza Quispe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-sunset-coral font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Tipo de Documento *
                    </label>
                    <select
                      value={docType}
                      onChange={(e) => setDocType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-sunset-coral font-semibold"
                    >
                      <option value="DNI">DNI (Documento Nacional de Identidad)</option>
                      <option value="CE">Carné de Extranjería (CE)</option>
                      <option value="Pasaporte">Pasaporte</option>
                      <option value="RUC">RUC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Número de Documento *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Número de documento"
                      value={docNumber}
                      onChange={(e) => setDocNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-sunset-coral font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Teléfono / WhatsApp de Contacto *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej: 987654321"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-sunset-coral font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Correo Electrónico (para notificación) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-sunset-coral font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Domicilio (Dirección, Distrito, Ciudad) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Av. Benavides 1234, Dpto 402, Miraflores, Lima"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-sunset-coral font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isMinor}
                        onChange={(e) => setIsMinor(e.target.checked)}
                        className="w-4 h-4 text-sunset-coral rounded border-gray-300"
                      />
                      <span className="text-xs font-semibold text-gray-700">
                        El consumidor reclamante es menor de edad
                      </span>
                    </label>

                    {isMinor && (
                      <div className="mt-2.5 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                        <label className="block text-[11px] font-bold text-amber-900 uppercase mb-1">
                          Nombre completo del Padre, Madre o Tutor *
                        </label>
                        <input
                          type="text"
                          required={isMinor}
                          placeholder="Nombre y apellido del apoderado legal"
                          value={parentName}
                          onChange={(e) => setParentName(e.target.value)}
                          className="w-full px-3.5 py-2 bg-white border border-amber-300 rounded-lg text-xs focus:outline-none focus:border-sunset-coral font-medium"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SECCIÓN 2: IDENTIFICACIÓN DEL BIEN CONTRATADO */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <span className="w-6 h-6 rounded-full bg-sunset-coral text-white font-extrabold flex items-center justify-center text-xs">
                    2
                  </span>
                  <h3 className="font-bold text-sm uppercase tracking-wide text-ocean-deep">
                    Identificación del Bien Contratado
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Tipo de Bien *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setGoodType("producto")}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          goodType === "producto"
                            ? "bg-ocean-deep text-white border-ocean-deep shadow-xs"
                            : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">restaurant</span>
                        Producto
                      </button>
                      <button
                        type="button"
                        onClick={() => setGoodType("servicio")}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          goodType === "servicio"
                            ? "bg-ocean-deep text-white border-ocean-deep shadow-xs"
                            : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">room_service</span>
                        Servicio
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Sede donde ocurrió el consumo / pedido *
                    </label>
                    <select
                      value={sedeKey}
                      onChange={(e) => setSedeKey(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-sunset-coral font-medium"
                    >
                      {SEDES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.suffix})
                        </option>
                      ))}
                      <option value="web">Web Delivery / Pedido Online General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Monto Reclamado en Soles (S/.)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs">S/.</span>
                      <input
                        type="number"
                        step="0.10"
                        min="0"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-sunset-coral font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Descripción del Plato o N° de Boleta
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Ceviche Mixto / Boleta B001-00234"
                      value={goodDescription}
                      onChange={(e) => setGoodDescription(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-sunset-coral font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* SECCIÓN 3: DETALLE DE LA RECLAMACIÓN */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <span className="w-6 h-6 rounded-full bg-sunset-coral text-white font-extrabold flex items-center justify-center text-xs">
                    3
                  </span>
                  <h3 className="font-bold text-sm uppercase tracking-wide text-ocean-deep">
                    Detalle de la Reclamación y Pedido
                  </h3>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1.5">
                    Selecciona el tipo de reclamación *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                      claimType === "reclamo"
                        ? "border-red-500 bg-red-50/50"
                        : "border-gray-200 bg-gray-50 hover:bg-gray-100/70"
                    }`}>
                      <input
                        type="radio"
                        name="claimType"
                        value="reclamo"
                        checked={claimType === "reclamo"}
                        onChange={() => setClaimType("reclamo")}
                        className="mt-1 text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">RECLAMO</span>
                        <span className="text-[11px] text-gray-500 block leading-tight mt-0.5">
                          Disconformidad con el plato o producto adquirido.
                        </span>
                      </div>
                    </label>

                    <label className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                      claimType === "queja"
                        ? "border-amber-500 bg-amber-50/50"
                        : "border-gray-200 bg-gray-50 hover:bg-gray-100/70"
                    }`}>
                      <input
                        type="radio"
                        name="claimType"
                        value="queja"
                        checked={claimType === "queja"}
                        onChange={() => setClaimType("queja")}
                        className="mt-1 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">QUEJA</span>
                        <span className="text-[11px] text-gray-500 block leading-tight mt-0.5">
                          Malestar con la atención o servicio brindado.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                    Detalle de los Hechos (Descripción clara y precisa) *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe con el mayor detalle posible lo ocurrido, incluyendo hora aproximada, personal involucrado si lo hubiera, y cualquier circunstancia relevante..."
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    className="w-full p-3.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-sunset-coral font-medium leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                    Pedido Concreto del Consumidor (Solución solicitada) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Indica con exactitud qué solución esperas por parte de Terminal Pesquero (ej: reposición del plato, devolución del importe, disculpas formales, etc.)..."
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    className="w-full p-3.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-sunset-coral font-medium leading-relaxed"
                  />
                </div>
              </div>

              {/* SECCIÓN 4: DECLARACIONES Y TÉRMINOS LEGALES */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2.5">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-sunset-coral rounded border-gray-300"
                  />
                  <span className="text-[11px] text-gray-700 leading-tight">
                    Declaro ser el titular o apoderado del servicio y que la información brindada es fidedigna y veraz conforme al <b>Código de Protección y Defensa del Consumidor (Ley N° 29571)</b>.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={acceptDataPolicy}
                    onChange={(e) => setAcceptDataPolicy(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-sunset-coral rounded border-gray-300"
                  />
                  <span className="text-[11px] text-gray-700 leading-tight">
                    Autorizo el tratamiento de mis datos personales según la <b>Ley N° 29733 (Ley de Protección de Datos Personales)</b> con el único fin de tramitar y responder a este reclamo o queja.
                  </span>
                </label>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-3 border border-gray-300 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-3 bg-sunset-coral hover:bg-[#e08d2d] disabled:opacity-50 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Registrando Hoja...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">send</span>
                      Enviar Hoja de Reclamación
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
