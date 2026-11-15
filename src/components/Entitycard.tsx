import foldedBook from "../assets/corner-book.svg";
import foldedAuthor from "../assets/corner-author.svg";
import foldedGenre from "../assets/corner-genre.svg";
import editIcon from "../assets/icon-edit.svg";
import deleteIcon from "../assets/icon-delete.svg";

type EntityType = "book" | "author" | "genre";

// Tailwind heeft volledige class-namen nodig, dus geen `bg-${type}`
const entityStyles: Record<
  EntityType,
  { bg: string; corner: string; label: string }
> = {
  book: { bg: "bg-book", corner: foldedBook, label: "Boek" },
  author: { bg: "bg-author", corner: foldedAuthor, label: "Auteur" },
  genre: { bg: "bg-genre", corner: foldedGenre, label: "Genre" },
};

type EntitycardProps = {
  type: EntityType;
  title?: string; // grote titel, bv. boektitel
  subtitle?: string; // regel eronder, bv. "Gerard Reve · 1947"
  extra?: string; // derde regel, bv. genres
  onEdit?: () => void; // wat er gebeurt als je op het potloodje klikt
  onDelete?: () => void; // wat er gebeurt als je op de prullenbak klikt
};

// De standaardwaarden zijn voorbeeldtekst voor de auteurs- en genrespagina,
// die nog niet aan de API gekoppeld zijn.
export default function Entitycard({
  type,
  title = "De Avonden",
  subtitle = "Gerard Reve · 1947",
  extra = "Roman",
  onEdit,
  onDelete,
}: EntitycardProps) {
  const style = entityStyles[type];

  return (
    <div
      data-type={type}
      className="w-72 p-6 relative bg-bg-surface rounded-xl shadow-[4px_4px_0px_0px_rgba(22,19,15,1.00)] outline outline-2 outline-offset-[-2px] outline-border-strong inline-flex flex-col justify-start items-start gap-4 overflow-hidden"
    >
      {/* Folded corner rechtsboven, kleur per type (geel / roze / groen) */}
      <img
        src={style.corner}
        alt=""
        className="size-14 right-0 top-0 absolute"
      />
      {/* Kaartrand als laag bovenop het hoekje, zodat de kleur de zwarte rand niet bedekt */}
      <div className="absolute inset-0 rounded-xl border-2 border-ink pointer-events-none" />
      <div
        data-type={type}
        className={`px-3 py-1 ${style.bg} rounded-[999px] outline outline-[1.50px] outline-offset-[-1.50px] outline-ink inline-flex justify-start items-center gap-1`}
      >
        <div className="justify-start text-text-primary text-xs font-medium font-['DM_Mono'] uppercase leading-4 tracking-wide">
          {style.label}
        </div>
      </div>
      <div className="self-stretch justify-start text-text-primary text-2xl font-semibold font-['Fraunces'] leading-7">
        {title}
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-1">
        {subtitle && (
          <div className="self-stretch justify-start text-text-muted text-sm font-medium font-['DM_Sans'] leading-5">
            {subtitle}
          </div>
        )}
        {extra && (
          <div className="justify-start text-text-muted text-sm font-medium font-['DM_Sans'] leading-5">
            {extra}
          </div>
        )}
      </div>
      <div className="self-stretch h-0.5 bg-border-subtle" />
      <div className="self-stretch inline-flex justify-end items-start gap-2">
        <button
          type="button"
          data-action="Edit"
          onClick={onEdit}
          className="p-2 bg-white rounded-xl shadow-[2px_2px_0px_0px_rgba(22,19,15,1.00)] outline-2 -outline-offset-2 outline-ink flex cursor-pointer transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(22,19,15,1.00)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <img src={editIcon} alt="Bewerken" className="size-5" />
        </button>
        <button
          type="button"
          data-action="Delete"
          onClick={onDelete}
          className="p-2 bg-coral-soft rounded-xl shadow-[2px_2px_0px_0px_rgba(22,19,15,1.00)] outline-2 -outline-offset-2 outline-ink flex cursor-pointer transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(22,19,15,1.00)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <img src={deleteIcon} alt="Verwijderen" className="size-5" />
        </button>
      </div>
    </div>
  );
}
