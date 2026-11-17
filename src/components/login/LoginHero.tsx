import Logo from "../layout/Logo";
import LoginIllustration from "./LoginIllustration";

// Linkerkant van de loginpagina: blauw vlak met logo, illustratie en welkomsttekst
function LoginHero() {
  return (
    <div className="flex-1 px-6 py-10 lg:px-12 lg:py-16 xl:px-20 gap-8 bg-cobalt border-b-2 lg:border-b-0 lg:border-r-2 border-ink flex flex-col justify-between items-start">
      <div className="inline-flex items-center gap-3">
        <Logo />
      </div>

      {/* Schaalt mee met de beschikbare ruimte, maar wordt nooit groter dan 560px */}
      <LoginIllustration className="hidden lg:block w-full max-w-140" />

      <h2 className="text-white text-4xl lg:text-5xl xl:text-7xl font-semibold font-display leading-tight xl:leading-18">
        Welkom terug,
        <br />
        <span className="italic">boekenwurm.</span>
      </h2>
    </div>
  );
}

export default LoginHero;
