import rond from "../../assets/header-circle.svg";
import vierkant from "../../assets/header-square.svg";
import driehoekje from "../../assets/header-triangle.svg";
import Button from "../ui/Button";

// Welk vormpje bij welke pagina hoort
const icons: Record<string, string> = {
  auteurs: rond,
  boeken: vierkant,
  genres: driehoekje,
};

// Enkelvoud, voor "1 boek" in plaats van "1 boeken"
const singular: Record<string, string> = {
  auteurs: "auteur",
  boeken: "boek",
  genres: "genre",
};

type PageHeaderProps = {
  title: string;
  count?: number; // aantal items uit de API; undefined = nog aan het laden
  searchText: string;
  buttonText?: string;
  onButtonClick?: () => void; // wat er gebeurt als je op de knop klikt
};

// Indeling:
//  mobiel:  titel, daaronder zoekveld (volle breedte) en knop
//  laptop+: titel links, zoekveld + knop rechts
export default function PageHeader({
  title,
  count,
  searchText,
  buttonText,
  onButtonClick,
}: PageHeaderProps) {
  return (
    <div className="w-full px-6 py-8 lg:px-20 lg:py-12 flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
      <div className="flex flex-col items-start gap-3">
        <div className="text-ink-soft text-xs font-medium font-mono uppercase leading-4 tracking-wide">
          Collectie
          {count !== undefined &&
            ` · ${count} ${count === 1 ? (singular[title] ?? title) : title}`}
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Titel groeit mee: 48px op mobiel → 60px tablet → 72px laptop */}
          <h1 className="text-ink text-5xl sm:text-6xl lg:text-7xl font-semibold font-display leading-none lg:leading-18">
            Alle <em className="italic">{title}</em>
          </h1>
          {icons[title] && (
            <img src={icons[title]} alt="" className="size-10 sm:size-12 lg:size-16 shrink-0" />
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Zoekveld: volle breedte op mobiel, vaste breedte vanaf tablet */}
        <div className="w-full sm:w-72 px-4 py-3 bg-surface rounded-xl outline-2 -outline-offset-2 outline-ink text-ink text-base font-normal leading-6">
          {searchText}
        </div>
        {buttonText && (
          <Button onClick={onButtonClick} className="whitespace-nowrap">
            {/* Plus-icoon */}
            <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true">
              <path d="M10 4v12M4 10h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
