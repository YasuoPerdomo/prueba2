import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface ToastMessage {
  id: string;
  text: string;
  type: "success" | "info" | "warning";
}

interface CustomToastProps {
  toasts: ToastMessage[];
}

export default function CustomToast({ toasts }: CustomToastProps) {
  return (
    <div className="fixed bottom-6 left-6 z-[200] max-w-sm w-full space-y-2 pointer-events-none font-sans">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: "spring", damping: 18 }}
            className={`p-3.5 rounded-xl border shadow-lg flex items-center gap-3 bg-white ${
              toast.type === "success"
                ? "border-emerald-100 bg-emerald-50/90 text-emerald-900"
                : toast.type === "warning"
                ? "border-amber-100 bg-amber-50/90 text-amber-900"
                : "border-blue-100 bg-blue-50/90 text-blue-900"
            }`}
          >
            {/* Icon */}
            <span className="material-symbols-outlined text-[22px] shrink-0">
              {toast.type === "success"
                ? "check_circle"
                : toast.type === "warning"
                ? "warning"
                : "info"}
            </span>

            {/* Msg */}
            <p className="text-xs font-bold leading-normal flex-grow">
              {toast.text}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
