import deleteIcon from "../assets/icon-delete.svg";

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
    // Donkere achtergrond over de hele pagina; klik erop = annuleren
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    >
      {/* Het venster; stopPropagation = klik hierin sluit hem NIET */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[460px] p-10 bg-surface rounded-xl shadow-[4px_4px_0px_0px_rgba(22,19,15,1.00)] outline-2 -outline-offset-2 outline-ink flex flex-col items-center gap-6"
      >
        {/* Rood rondje met prullenbak */}
        <div className="size-16 bg-coral rounded-full outline-2 -outline-offset-2 outline-ink flex justify-center items-center">
          <img src={deleteIcon} alt="" className="size-8" />
        </div>

        <h2 className="text-ink text-5xl font-semibold font-['Fraunces'] leading-10 text-center">
          Weet je het zeker?
        </h2>

        <p className="text-center text-ink-soft text-base font-normal font-['DM_Sans'] leading-6">
          "{name}" verdwijnt voorgoed uit de kast. Dit kun je niet ongedaan
          maken.
        </p>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="px-6 py-3 rounded-full outline-2 -outline-offset-2 outline-ink text-ink text-base font-bold font-['DM_Sans'] leading-4 cursor-pointer transition-all duration-150 hover:bg-paper-deep disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Nee, toch niet
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="px-6 py-3 bg-coral rounded-full shadow-[2px_2px_0px_0px_rgba(22,19,15,1.00)] outline-2 -outline-offset-2 outline-ink flex items-center gap-2 text-ink text-base font-bold font-['DM_Sans'] leading-4 cursor-pointer transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(22,19,15,1.00)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0"
          >
            <img src={deleteIcon} alt="" className="size-5" />
            {busy ? "Bezig…" : "Ja, verwijder"}
          </button>
        </div>
      </div>
    </div>
  );
}
