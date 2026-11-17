// src/components/layout/Logo.tsx
import logo from "../../assets/logo.svg";

type LogoProps = {
  variant?: "light" | "dark";
};

export default function Logo({ variant = "light" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-ink";

  return (
    <div className="inline-flex items-center gap-2 sm:gap-3">
      {/* alt="": de naam staat er als tekst naast, dus het plaatje is decoratie */}
      <img src={logo} alt="" className="size-9 sm:size-11 shrink-0" />

      <span className={`${textColor} text-xl sm:text-2xl font-semibold font-display whitespace-nowrap`}>
        Buro<span className="italic">ogappeltjes</span>
      </span>
    </div>
  );
}
