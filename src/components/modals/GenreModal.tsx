import { useEffect, useState } from "react";
import { isUnauthorized } from "../../api/apiFetch";
import { useToast } from "../../hooks/ToastContext";
import { createGenre, updateGenre } from "../../api/genres";
import type { Genre } from "../../types/genre";
import FormModal from "./FormModal";
import { hintClass, inputClass, labelClass } from "../ui/formStyles";

// ── Eén modal voor zowel "Nieuw genre" als "Genre bewerken" ──
// genre = null  → nieuw genre aanmaken
// genre = {...} → dat genre bewerken (velden zijn al ingevuld)

type GenreModalProps = {
  open: boolean;
  genre: Genre | null; // null = nieuw, anders bewerken
  onClose: () => void;
  onSaved?: (genre: Genre | undefined) => void;
};

export default function GenreModal({
  open,
  genre,
  onClose,
  onSaved,
}: GenreModalProps) {
  const { showToast } = useToast();
  const isEdit = genre !== null;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Elke keer als de modal opengaat: velden vullen (bewerken) of leegmaken (nieuw)
  useEffect(() => {
    if (!open) return;

    setName(genre?.name ?? "");
    setDescription(genre?.description ?? "");
    setError("");
  }, [open, genre]);

  const handleSubmit = async () => {
    // Geen jaartal-check nodig: naam en beschrijving zijn allebei gewoon tekst
    const body = {
      name: name,
      description: description,
    };

    setSaving(true);
    try {
      // Bewerken → PUT, nieuw → POST
      const saved = isEdit
        ? await updateGenre(genre.id, body)
        : await createGenre(body);
      onSaved?.(saved);
      onClose(); // gelukt → modal dicht
      showToast("success", "Opgeslagen!", `"${name}" staat netjes bij de genres.`);
    } catch (err) {
      if (isUnauthorized(err)) {
        // 401/403: de API zegt dat je dit niet mag → gele toast
        showToast(
          "unauthorized",
          "Alleen voor admins",
          `${err.status} · Log in als administrator om "${name}" op te slaan.`,
        );
      } else {
        setError(
          err instanceof Error ? err.message : "Genre kon niet worden opgeslagen",
        );
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormModal
      open={open}
      type="genre"
      title={isEdit ? "Genre bewerken" : "Nieuw genre"}
      error={error}
      saving={saving}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* Naam */}
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Naam</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Roman"
          required
          className={inputClass}
        />
      </label>

      {/* Beschrijving: textarea, want dit is een langere tekst */}
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Beschrijving</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Een lang verhalend prozawerk…"
          rows={3}
          required
          className={`${inputClass} resize-none`}
        />
        <span className={hintClass}>Een korte uitleg van het genre.</span>
      </label>
    </FormModal>
  );
}
