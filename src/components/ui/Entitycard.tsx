import foldedBook from "../../assets/corner-book.svg";
import foldedAuthor from "../../assets/corner-author.svg";
import foldedGenre from "../../assets/corner-genre.svg";
import editIcon from "../../assets/icon-edit.svg";
import deleteIcon from "../../assets/icon-delete.svg";

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

// Gedeelde stijl voor de twee kleine knoppen (bewerken / verwijderen)
const iconButtonClass =
  "p-2 rounded-xl shadow-hard-sm outline-2 -outline-offset-2 outline-ink flex cursor-pointer transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

type EntitycardProps = {
  type: EntityType;
  title?: string; // grote titel, bv. boektitel
  subtitle?: string; // regel eronder, bv. "Gerard Reve · 1947"
  extra?: string; // derde regel, bv. genres
  onEdit?: () => void; // wat er gebeurt als je op het potloodje klikt
  onDelete?: () => void; // wat er gebeurt als je op de prullenbak klikt
};

// De standaardwaarden zijn voorbeeldtekst voor als je nog geen data hebt.
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
    // w-full + h-full: de kaart vult zijn vakje in het raster,
    // dus hij is nooit breder dan de kolom en alle kaarten in een rij zijn even hoog
    <div
      data-type={type}
      className="w-full h-full min-w-0 p-5 sm:p-6 relative bg-surface rounded-xl shadow-hard outline-2 -outline-offset-2 outline-ink flex flex-col items-start gap-4 overflow-hidden"
    >
      {/* Folded corner rechtsboven, kleur per type (geel / roze / groen) */}
      <img src={style.corner} alt="" className="size-14 right-0 top-0 absolute" />
      {/* Kaartrand als laag bovenop het hoekje, zodat de kleur de zwarte rand niet bedekt */}
      <div className="absolute inset-0 rounded-xl border-2 border-ink pointer-events-none" />

      <div
        className={`px-3 py-1 ${style.bg} rounded-full outline-thin outline-ink inline-flex items-center gap-1`}
      >
        <span className="text-ink text-xs font-medium font-mono uppercase leading-4 tracking-wide">
          {style.label}
        </span>
      </div>

      {/* pr-10: titel loopt niet onder het hoekje door. break-words: lange woorden breken af */}
      <h3 className="self-stretch pr-10 text-ink text-xl sm:text-2xl font-semibold font-display leading-7 break-words">
        {title}
      </h3>

      <div className="self-stretch flex flex-col items-start gap-1">
        {subtitle && (
          <p className="self-stretch text-ink-soft text-sm font-medium leading-5 break-words">
            {subtitle}
          </p>
        )}
        {extra && (
          <p className="text-ink-soft text-sm font-medium leading-5 break-words">
            {extra}
          </p>
        )}
      </div>

      {/* Lijntje + knoppen alleen tonen als er minstens één knop is.
          mt-auto: knoppen staan altijd onderaan, ook als de kaart hoger is door z'n buren */}
      {(onEdit || onDelete) && (
        <div className="self-stretch mt-auto flex flex-col gap-4">
          <div className="h-0.5 bg-line" />
          <div className="flex justify-end gap-2">
            {onEdit && (
              <button
                type="button"
                data-action="Edit"
                onClick={onEdit}
                aria-label="Bewerken"
                className={`${iconButtonClass} bg-surface`}
              >
                <img src={editIcon} alt="" className="size-5" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                data-action="Delete"
                onClick={onDelete}
                aria-label="Verwijderen"
                className={`${iconButtonClass} bg-coral-soft`}
              >
                <img src={deleteIcon} alt="" className="size-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
