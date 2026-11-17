import Logo from "./Logo";
import Badge from "../ui/Badge";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Authcontext";
import lockIcon from "../../assets/icon-lock.svg";
import logoutIcon from "../../assets/icon-logout.svg";

const navItems = [
  {
    to: "/book",
    label: "Boeken",
    bg: "bg-book",
    icon: "size-3.5 left-px top-px",
  },
  {
    to: "/auteur",
    label: "Auteurs",
    bg: "bg-author",
    icon: "size-3.5 left-px top-px rounded-full",
  },
  {
    to: "/genre",
    label: "Genres",
    bg: "bg-genre",
    icon: "w-3.5 h-3 left-px top-px",
    shape: "triangle",
  },
];

// Indeling:
//  mobiel/laptop:  [logo ............ knoppen]
//                  [boeken auteurs genres    ]
//  groot scherm (xl): alles op één regel → [logo  navigatie  knoppen]
// Dat doen we met "order": de volgorde op het scherm verandert, de code niet.
export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleClick() {
    if (user) {
      logout(); // nu log je ook echt uit
    }
    navigate("/login");
  }

  const buttonText = user ? "Uitloggen" : "Inloggen als admin";

  return (
    <header className="w-full px-6 py-4 lg:px-20 lg:py-5 border-b-2 border-ink flex flex-wrap justify-between items-center gap-4">
      <div className="order-1">
        <Logo variant="dark" />
      </div>

      {/* Navigatie: op mobiel 3 gelijke kolommen over de volle breedte,
          vanaf tablet gewoon naast elkaar, op xl tussen logo en knoppen */}
      <nav className="order-3 w-full xl:order-2 xl:w-auto grid grid-cols-3 sm:flex sm:items-center gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-2 sm:px-4 py-2 rounded-full outline-3 -outline-offset-3 outline-ink flex justify-center items-center gap-1.5 sm:gap-2 ${
                isActive ? `${item.bg} shadow-hard-sm` : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                {item.shape === "triangle" ? (
                  <svg viewBox="0 0 16 16" className="size-4">
                    <polygon
                      points="8,2 15,14 1,14"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      className={`stroke-ink ${
                        isActive ? "fill-surface" : "fill-genre"
                      }`}
                    />
                  </svg>
                ) : (
                  <div className="size-4 relative">
                    <div
                      className={`${item.icon} absolute border-2 border-ink ${
                        isActive ? "bg-surface" : item.bg
                      }`}
                    />
                  </div>
                )}
                <span
                  className={`text-sm sm:text-base font-bold leading-4 ${
                    isActive ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="order-2 xl:order-3 flex items-center gap-3 sm:gap-4">
        {user && <Badge />}
        <button
          type="button"
          onClick={handleClick}
          aria-label={buttonText} // op mobiel is alleen het icoon zichtbaar
          className={`cursor-pointer px-3 sm:px-6 py-3 rounded-full outline-3 -outline-offset-3 outline-ink flex items-center gap-2 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
            user ? "bg-canvas" : "bg-sunny"
          }`}
        >
          {/* Ingelogd: uitlog-icoon, niet ingelogd: slotje */}
          <img src={user ? logoutIcon : lockIcon} alt="" className="size-5" />
          <span className="hidden sm:inline text-ink text-base font-bold leading-4">
            {buttonText}
          </span>
        </button>
      </div>
    </header>
  );
}
