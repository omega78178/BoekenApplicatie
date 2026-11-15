// ── Eén toast-melding (het design) ──
// type bepaalt de kleur + het icoontje links:
//   "success"      → groen met vinkje   (bv. "Opgeslagen!")
//   "unauthorized" → geel met slotje    (bv. "Alleen voor admins")

export type ToastType = "success" | "unauthorized";

type ToastProps = {
  type: ToastType;
  title: string;
  message: string;
  onClose: () => void;
};

// Tailwind heeft volledige class-namen nodig, dus geen `bg-${type}`
const toastStyles: Record<ToastType, string> = {
  success: "bg-success",
  unauthorized: "bg-warning",
};

export default function Toast({ type, title, message, onClose }: ToastProps) {
  return (
    <div
      role="status"
      data-type={type}
      className="w-96 max-w-[calc(100vw-3rem)] bg-surface rounded-xl shadow-[4px_4px_0px_0px_rgba(22,19,15,1.00)] outline-2 -outline-offset-2 outline-ink flex items-stretch overflow-hidden"
    >
      {/* Gekleurd vlak links met icoon */}
      <div
        className={`p-4 ${toastStyles[type]} border-r-2 border-ink flex items-center`}
      >
        {type === "success" ? (
          // Vinkje
          <svg viewBox="0 0 20 20" className="size-5" fill="none">
            <path d="M16.67 5L7.5 14.17 3.33 10" className="stroke-ink" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          // Slotje
          <svg viewBox="0 0 20 20" className="size-5" fill="none">
            <rect x="3.33" y="9.17" width="13.33" height="8.33" rx="1.5" className="stroke-ink" strokeWidth="2" />
            <path d="M6.67 9.17V5.83a3.33 3.33 0 0 1 6.66 0v3.34" className="stroke-ink" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Tekst */}
      <div className="flex-1 px-4 py-3 flex flex-col gap-1">
        <div className="text-ink text-base font-bold font-['DM_Sans'] leading-4">
          {title}
        </div>
        <div className="text-ink-soft text-sm font-medium font-['DM_Sans'] leading-5">
          {message}
        </div>
      </div>

      {/* Sluit-kruisje */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Melding sluiten"
        className="p-3 self-start cursor-pointer"
      >
        <svg viewBox="0 0 16 16" className="size-4" fill="none">
          <path d="M12 4L4 12M4 4l8 8" className="stroke-ink" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
