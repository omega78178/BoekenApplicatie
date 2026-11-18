import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isUnauthorized } from "../../api/apiFetch";
import { useToast } from "../../hooks/ToastContext";
import { createGenre, updateGenre } from "../../api/genres";
import type { Genre } from "../../types/genre";
import { genreSchema, type GenreForm } from "../../schemas/genre";
import FormModal, { FieldError } from "./FormModal";
import {
  hintClass,
  inputClass,
  inputErrorClass,
  labelClass,
} from "../ui/formStyles";

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

  const [error, setError] = useState(""); // algemene fout van de API
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GenreForm>({
    resolver: zodResolver(genreSchema),
  });

  // Elke keer als de modal opengaat: velden vullen (bewerken) of leegmaken (nieuw)
  useEffect(() => {
    if (!open) return;

    // reset() vult de velden en wist oude zod-fouten
    reset({ name: genre?.name ?? "", description: genre?.description ?? "" });
    setError("");
  }, [open, genre, reset]);

  // Draait ALLEEN als zod alles goedkeurt; data is dan al gecontroleerd
  const onSubmit = async (data: GenreForm) => {
    setSaving(true);
    try {
      // Bewerken → PUT, nieuw → POST
      const saved = isEdit
        ? await updateGenre(genre.id, data)
        : await createGenre(data);
      onSaved?.(saved);
      onClose(); // gelukt → modal dicht
      showToast("success", "Opgeslagen!", `"${data.name}" staat netjes bij de genres.`);
    } catch (err) {
      if (isUnauthorized(err)) {
        // 401/403: de API zegt dat je dit niet mag → gele toast
        showToast(
          "unauthorized",
          "Alleen voor admins",
          `${err.status} · Log in als administrator om "${data.name}" op te slaan.`,
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
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Naam */}
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Naam</span>
        <input
          {...register("name")}
          placeholder="Roman"
          className={errors.name ? inputErrorClass : inputClass}
        />
        <FieldError message={errors.name?.message} />
      </label>

      {/* Beschrijving: textarea, want dit is een langere tekst */}
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Beschrijving</span>
        <textarea
          {...register("description")}
          placeholder="Een lang verhalend prozawerk…"
          rows={3}
          className={`${errors.description ? inputErrorClass : inputClass} resize-none`}
        />
        <span className={hintClass}>Een korte uitleg van het genre.</span>
        <FieldError message={errors.description?.message} />
      </label>
    </FormModal>
  );
}
