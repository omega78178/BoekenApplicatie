import deleteIcon from "../../assets/icon-delete.svg";

type ConfirmDeleteModalProps = {
  name: string | null; // naam van wat je verwijdert; null = modal dicht
  onCancel: () => void; // "Nee, toch niet" of klik naast de modal
  onConfirm: () => void; // "Ja, verwijder"
  busy?: boolean; // true terwijl het verwijderen bezig is
};

export default function ConfirmDeleteModal({
  name,
  onCancel,
  onConfirm,
  busy = false,
}: ConfirmDeleteModalProps) {
  if (name === null) return null; // niets te verwijderen → niets tonen

  return (
    // Donkere achtergrond over de hele pagina; klik erop = annuleren.
    // overflow-y-auto + m-auto op het venster: gecentreerd, en scrollbaar als het scherm te laag is
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 bg-black/50 overflow-y-auto p-4 flex"
    >
      {/* Het venster; stopPropagation = klik hierin sluit hem NIET */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="m-auto w-full max-w-115 p-6 sm:p-10 bg-surface rounded-xl shadow-hard outline-2 -outline-offset-2 outline-ink flex flex-col items-center gap-6"
      >
        {/* Rood rondje met prullenbak */}
        <div className="size-16 bg-coral rounded-full outline-2 -outline-offset-2 outline-ink flex justify-center items-center">
          <img src={deleteIcon} alt="" className="size-8" />
        </div>

        <h2 className="text-ink text-3xl sm:text-5xl font-semibold font-display leading-tight sm:leading-10 text-center">
          Weet je het zeker?
        </h2>

        <p className="text-center text-ink-soft text-base font-normal leading-6 break-words">
          "{name}" verdwijnt voorgoed uit de kast. Dit kun je niet ongedaan
          maken.
        </p>

        {/* Knoppen: op mobiel onder elkaar (Ja, verwijder bovenaan), vanaf tablet naast elkaar */}
        <div className="w-full sm:w-auto flex flex-col-reverse sm:flex-row sm:justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="px-6 py-3 rounded-full outline-2 -outline-offset-2 outline-ink text-ink text-base font-bold leading-4 cursor-pointer transition-all duration-150 hover:bg-paper-deep disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Nee, toch niet
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="px-6 py-3 bg-coral rounded-full shadow-hard-sm outline-2 -outline-offset-2 outline-ink flex justify-center items-center gap-2 text-ink text-base font-bold leading-4 cursor-pointer transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0"
          >
            <img src={deleteIcon} alt="" className="size-5" />
            {busy ? "Bezig…" : "Ja, verwijder"}
          </button>
        </div>
      </div>
    </div>
  );
}
