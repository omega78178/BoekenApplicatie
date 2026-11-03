// src/components/Logo.tsx
import logo from "../assets/Logo.svg";

type LogoProps = {
  variant?: "light" | "dark";
};

export default function Logo({ variant = "light" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-black";

  return (
    <div className="size- inline-flex justify-start items-center gap-3">
      <img
        src={logo}
        alt="Achtergrond"
        className="w-full h-full object-cover"
      />

      <div className="justify-start">
        <span
          className={`${textColor} text-2xl font-semibold font-['Fraunces']`}
        >
          Buro
        </span>
        <span
          className={`${textColor} text-2xl font-semibold font-['Fraunces'] italic`}
        >
          ogappeltjes
        </span>
      </div>
    </div>
  );
}
