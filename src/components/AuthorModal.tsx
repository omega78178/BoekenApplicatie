import { useEffect, useState } from "react";
import { createAuthor, updateAuthor } from "../api/authors";
import type { Author } from "../types/author";
import FormModal, { FieldError } from "./FormModal";
import {
  hintClass,
  inputClass,
  inputErrorClass,
  labelClass,
} from "./formStyles";

// ── Eén modal voor zowel "Nieuwe auteur" als "Auteur bewerken" ──
// author = null  → nieuwe auteur aanmaken
// author = {...} → die auteur bewerken (velden zijn al ingevuld)

type AuthorModalProps = {
  open: boolean;
  author: Author | null; // null = nieuw, anders bewerken
  onClose: () => void;
  onSaved?: (author: Author | undefined) => void;
};

export default function AuthorModal({
  open,
  author,
  onClose,
  onSaved,
}: AuthorModalProps) {
  const isEdit = author !== null;

  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [yearError, setYearError] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Elke keer als de modal opengaat: velden vullen (bewerken) of leegmaken (nieuw)
  useEffect(() => {
    if (!open) return;

    setName(author?.name ?? "");
    setBirthYear(author ? String(author.birth_year) : "");
    setYearError("");
    setError("");
  }, [open, author]);

  const handleSubmit = async () => {
    // Geboortejaar controleren voordat we iets naar de API sturen
    if (!/^\d{4}$/.test(birthYear)) {
      setYearError("Vul een geboortejaar in, bijv. 1923.");
      return;
    }
    setYearError("");

    const body = {
      name: name,
      birth_year: Number(birthYear),
    };

    setSaving(true);
    try {
      // Bewerken → PUT, nieuw → POST
      const saved = isEdit
        ? await updateAuthor(author.id, body)
        : await createAuthor(body);
      onSaved?.(saved);
      onClose(); // gelukt → modal dicht
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Auteur kon niet worden opgeslagen",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormModal
      open={open}
      type="author"
      title={isEdit ? "Auteur bewerken" : "Nieuwe auteur"}
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
          placeholder="Gerard Reve"
          required
          className={inputClass}
        />
        <span className={hintClass}>Voor- en achternaam.</span>
      </label>

      {/* Geboortejaar */}
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Geboortejaar</span>
        <input
          type="number"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          placeholder="1923"
          className={yearError ? inputErrorClass : inputClass}
        />
        <FieldError message={yearError} />
      </label>
    </FormModal>
  );
}