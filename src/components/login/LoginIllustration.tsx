import paperYellow from "../../assets/login-paper-yellow.svg";
import paperPink from "../../assets/login-paper-pink.svg";
import circle from "../../assets/login-circle.svg";
import triangle from "../../assets/login-triangle.svg";

// ── Illustratie op de loginpagina (raster + 4 figuren) ──
// Alles staat in één <svg> met een viewBox. Binnenin reken je met een
// "tekenvel" van 562 × 362 (de maten uit het design). De getallen bij
// x/y/width/height zijn plekken op dat tekenvel, géén schermpixels.
// Geef je de svg een breedte (bv. w-full), dan schaalt alles evenredig mee.
function LoginIllustration({ className = "" }: { className?: string }) {
  return (
    // preserveAspectRatio: altijd in verhouding schalen (meet), links uitgelijnd (xMin)
    // en verticaal in het midden (YMid). Zo past hij in de breedte én de hoogte.
    <svg
      viewBox="0 0 562 362"
      preserveAspectRatio="xMinYMid meet"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Eén rastervakje van 40 × 40, dat zich herhaalt */}
        <pattern id="login-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          {/* Verticale lijn: 1 dik, met een zachte overgang */}
          <rect x="0" width="1" height="40" fill="white" fillOpacity="0.1" />
          <rect x="1" width="2" height="40" fill="url(#login-grid-fade)" />
          {/* Horizontale lijn: 3 dik */}
          <rect y="0" width="40" height="3" fill="white" fillOpacity="0.1" />
        </pattern>
        <linearGradient id="login-grid-fade">
          <stop offset="0" stopColor="white" stopOpacity="0.1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Raster binnen de rand, daarna de rand zelf (wit op 20%) */}
      <rect x="2" y="2" width="558" height="358" fill="url(#login-grid)" />
      <rect
        x="1"
        y="1"
        width="560"
        height="360"
        fill="none"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="2"
      />

      {/* Figuren */}
      <image href={paperYellow} x="46" y="90" width="190" height="224" />
      <image href={paperPink} x="252" y="62" width="184" height="219" />
      <image href={circle} x="420" y="210" width="123" height="123" />
      <image href={triangle} x="360" y="40" width="143" height="113" />
    </svg>
  );
}

export default LoginIllustration;
