// src/components/Logo.tsx
import logo from "../assets/Logo.svg";

export default function Logo() {
  return (
    <div className="size- inline-flex justify-start items-center gap-3">
      <img
        src={logo}
        alt="Achtergrond"
        className="w-full h-full object-cover"
      />
      ;
      <div className="justify-start">
        <span className="text-text-inverse text-2xl text-white font-semibold font-['Fraunces']">
          Buro
        </span>
        <span className="text-text-inverse text-2xl text-white font-semibold font-['Fraunces'] italic">
          ogappeltjes
        </span>
      </div>
    </div>
  );
}
