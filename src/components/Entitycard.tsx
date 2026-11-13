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
};

export default function Entitycard({ type }: EntitycardProps) {
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
        De Avonden
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-1">
        <div className="self-stretch justify-start text-text-muted text-sm font-medium font-['DM_Sans'] leading-5">
          Gerard Reve · 1947
        </div>
        <div className="justify-start text-text-muted text-sm font-medium font-['DM_Sans'] leading-5">
          Roman
        </div>
      </div>
      <div className="self-stretch h-0.5 bg-border-subtle" />
      <div className="self-stretch inline-flex justify-end items-start gap-2">
        <div
          data-action="Edit"
          className="size- p-2 bg-bg-surface rounded-xl shadow-[2px_2px_0px_0px_rgba(22,19,15,1.00)] outline outline-2 outline-offset-[-2px] bg-white outline-border-strong flex justify-start items-start"
        >
          <img src={editIcon} alt="Bewerken" className="size-5" />
        </div>
        <div
          data-action="Delete"
          className="size- p-2 bg-feedback-error-soft rounded-xl shadow-[2px_2px_0px_0px_rgba(22,19,15,1.00)] outline outline-2 outline-offset-[-2px] bg-coral-soft outline-border-strong flex justify-start items-start"
        >
          <img src={deleteIcon} alt="Verwijderen" className="size-5" />
        </div>
      </div>
    </div>
  );
}
