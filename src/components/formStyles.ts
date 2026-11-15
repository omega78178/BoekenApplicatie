// Gedeelde stijlen voor formulieren in modals (boeken, auteurs, genres)

export const labelClass =
  "text-ink text-xs font-medium font-['DM_Mono'] uppercase leading-4 tracking-wide";

export const hintClass =
  "text-ink-soft text-sm font-medium font-['DM_Sans'] leading-5";

// Normaal: dunne zwarte rand. Focus: dikke blauwe rand + schaduw (de "Focus"-state uit het design)
export const inputClass =
  "w-full px-4 py-3 bg-surface rounded-xl outline-2 -outline-offset-2 outline-ink text-ink text-base font-normal font-['DM_Sans'] leading-6 focus:outline-3 focus:-outline-offset-3 focus:outline-cobalt focus:shadow-[2px_2px_0px_0px_rgba(22,19,15,1.00)]";

// "Error"-state uit het design: roze achtergrond en rode rand
export const inputErrorClass =
  "w-full px-4 py-3 bg-coral-soft rounded-xl outline-2 -outline-offset-2 outline-coral text-ink text-base font-normal font-['DM_Sans'] leading-6";
