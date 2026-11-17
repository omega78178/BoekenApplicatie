import { createContext, useContext, useState, type ReactNode } from "react";
import Toast, { type ToastType } from "../components/ui/Toast";

// ── Toasts overal in de app kunnen tonen ──
// Werkt net als AuthContext: de Provider staat om de hele app heen (main.tsx),
// en in elke component kun je met useToast() een melding laten zien:
//
//   const { showToast } = useToast();
//   showToast("success", "Opgeslagen!", '"De Avonden" staat weer netjes in de kast.');

type ToastItem = {
  id: number; // uniek nummer, zodat React weet welke toast welke is
  type: ToastType;
  title: string;
  message: string;
};

type ToastContextType = {
  showToast: (type: ToastType, title: string, message: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

const TOAST_DURATION = 4000; // na 4 seconden verdwijnt een toast vanzelf

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Eén toast weghalen (via het kruisje of na 4 seconden)
  function removeToast(id: number) {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }

  // Een nieuwe toast toevoegen
  function showToast(type: ToastType, title: string, message: string) {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, type, title, message }]);
    setTimeout(() => removeToast(id), TOAST_DURATION);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Boven alles (ook boven modals: z-50).
          Mobiel: onderaan over de volle breedte. Vanaf tablet: rechtsonder. */}
      <div className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-60 flex flex-col items-stretch sm:items-end gap-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast moet binnen <ToastProvider> gebruikt worden");
  }
  return context;
}
