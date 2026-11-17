type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string; // extra classes, bv. "self-stretch" voor een volle breedte
};

// Primaire knop uit het design: cobalt, harde schaduw, "springt" bij hover
function Button({
  children,
  type = "button",
  onClick,
  disabled,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 bg-cobalt rounded-full shadow-hard-sm outline-2 -outline-offset-2 outline-ink inline-flex justify-center items-center gap-2 text-white text-base font-bold leading-4 cursor-pointer transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
