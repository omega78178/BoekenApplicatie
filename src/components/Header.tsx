import Logo from "../components/Logo";
import Badge from "../components/Badge";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Authcontext";
import lockIcon from "../assets/icon-lock.svg";
import logoutIcon from "../assets/icon-logout.svg";

const navItems = [
  {
    to: "/book",
    label: "Boeken",
    bg: "bg-book",
    icon: "size-3.5 left-[1px] top-[1px]",
  },
  {
    to: "/auteur",
    label: "Auteurs",
    bg: "bg-author",
    icon: "size-3.5 left-[1px] top-[1px] rounded-full",
  },
  {
    to: "/genre",
    label: "Genres",
    bg: "bg-genre",
    icon: "w-3.5 h-3 left-[1px] top-[1.50px]",
    shape: "triangle",
  },
];

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleClick() {
    if (user) {
      logout(); // nu log je ook echt uit
    }
    navigate("/login");
  }

  return (
    <header>
      <div className="w-full px-6 py-4 lg:px-20 lg:py-5 bg-bg-canvas border-b-2 border-border-strong flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="size- inline-flex justify-start items-center gap-3">
            <Logo variant="dark" />
          </div>
        </div>
        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-[999px] outline-3 -outline-offset-3 outline-ink flex items-center gap-2 ${
                  isActive
                    ? `${item.bg} shadow-[2px_2px_0px_0px_rgba(22,19,15,1.00)]`
                    : ""
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
                  <div
                    className={`text-base font-bold font-['DM_Sans'] leading-4 ${
                      isActive ? "text-text-primary" : "text-text-muted"
                    }`}
                  >
                    {item.label}
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {user && <Badge />}
          <button
            type="button"
            onClick={handleClick}
            data-show-icon="true"
            data-variant="Ghost"
            className={`cursor-pointer px-6 py-3 rounded-[999px] outline-3 -outline-offset-3 outline-ink flex items-center gap-2 ${
              user ? "bg-canvas" : "bg-sunny"
            }`}
          >
            {/* Ingelogd: uitlog-icoon, niet ingelogd: slotje */}
            <img
              src={user ? logoutIcon : lockIcon}
              alt=""
              className="size-5"
            />
            <div className="text-text-primary text-base font-bold font-['DM_Sans'] leading-4">
              {user ? "Uitloggen" : "Inloggen als admin"}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
