import type { ReactNode } from "react";
import cornerBook from "../../assets/corner-book.svg";
import cornerAuthor from "../../assets/corner-author.svg";
import cornerGenre from "../../assets/corner-genre.svg";
import { labelClass } from "../ui/formStyles";

// ── Herbruikbare modal voor ALLE formulieren (nieuw/bewerken van boek, auteur, genre) ──
// Deze component regelt alleen de "schil": achtergrond, venster, hoekje, badge,
// titel, foutmelding en de knoppen. De velden zelf geef je mee als children.

type EntityType = "book" | "author" | "genre";

// Tailwind heeft volledige class-namen nodig, dus geen `bg-${type}`
const entityStyles: Record<EntityType, { bg: string; corner: string; label: string }> = {
  book: { bg: "bg-book", corner: cornerBook, label: "Boek" },
  author: { bg: "bg-author", corner: cornerAuthor, label: "Auteur" },
  genre: { bg: "bg-genre", corner: cornerGenre, label: "Genre" },
};

type FormModalProps = {
  open: boolean; // is de modal zichtbaar?
  type: EntityType; // bepaalt kleur van hoekje + badge
  title: string; // bv. "Nieuw boek" of "Auteur bewerken"
  error?: string; // algemene foutmelding bovenaan
  saving?: boolean; // true terwijl het opslaan bezig is
  onClose: () => void;
  onSubmit: () => void; // wordt aangeroepen bij "Opslaan" (preventDefault is al gedaan)
  children: ReactNode; // de formuliervelden
};

export default function FormModal({
  open,
  type,
  title,
  error,
  saving = false,
  onClose,
  onSubmit,
  children,
}: FormModalProps) {
  if (!open) return null;

  const style = entityStyles[type];

  const close = () => {
    if (!saving) onClose(); // niet sluiten terwijl hij bezig is
  };

  return (
    // Donkere achtergrond over de hele pagina; klik erop = sluiten.
    // overflow-y-auto + m-auto op het venster: gecentreerd, en scrollbaar als het scherm te laag is
    <div
      onClick={close}
      className="fixed inset-0 z-50 bg-black/50 overflow-y-auto p-4 flex"
    >
      {/* Het witte venster; stopPropagation = klik hierin sluit hem NIET */}
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="relative m-auto w-full max-w-150 p-6 sm:p-10 bg-surface rounded-xl shadow-hard flex flex-col gap-6 overflow-hidden"
      >
        {/* Folded corner rechtsboven, kleur per type */}
        <img src={style.corner} alt="" className="size-12 sm:size-16 absolute right-0 top-0" />
        {/* Rand als laag bovenop het hoekje, net als bij Entitycard */}
        <div className="absolute inset-0 rounded-xl border-2 border-ink pointer-events-none" />

        {/* Kop: badge + titel */}
        <div className="flex flex-col items-start gap-2">
          <div
            className={`px-3 py-1 ${style.bg} rounded-full outline-thin outline-ink`}
          >
            <div className={labelClass}>{style.label}</div>
          </div>
          <h2 className="pr-10 text-ink text-3xl sm:text-5xl font-semibold font-display leading-tight sm:leading-10">
            {title}
          </h2>
        </div>

        {error && (
          <p className="text-error text-sm font-medium">{error}</p>
        )}

        {/* Hier komen de velden die je meegeeft */}
        {children}

        {/* Knoppen: op mobiel onder elkaar (Opslaan bovenaan), vanaf tablet naast elkaar */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={close}
            disabled={saving}
            className="px-6 py-3 rounded-full outline-2 -outline-offset-2 outline-ink text-ink text-base font-bold leading-4 cursor-pointer transition-all duration-150 hover:bg-paper-deep disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Annuleren
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-cobalt rounded-full shadow-hard-sm outline-2 -outline-offset-2 outline-ink flex justify-center items-center gap-2 text-white text-base font-bold leading-4 cursor-pointer transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0"
          >
            {/* Vinkje-icoon */}
            <svg viewBox="0 0 20 20" className="size-5" fill="none">
              <path d="M16.67 5L7.5 14.17 3.33 10" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {saving ? "Bezig…" : "Opslaan"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Kleine foutmelding onder een veld, met uitroepteken-icoon
export function FieldError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <span className="inline-flex items-center gap-1 text-ink text-sm font-medium leading-5">
      <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="none">
        <circle cx="8" cy="8" r="6.67" strokeWidth="2" className="stroke-coral" />
        <path d="M8 5.33V8M8 10.67h.01" strokeWidth="2" strokeLinecap="round" className="stroke-coral" />
      </svg>
      {message}
    </span>
  );
}
