import { useEffect, useState } from "react";
import { isUnauthorized } from "../../api/apiFetch";
import { useToast } from "../../hooks/ToastContext";
import { createAuthor, updateAuthor } from "../../api/authors";
import type { Author } from "../../types/author";
import FormModal, { FieldError } from "./FormModal";
import { authorSchema, type AuthorForm } from "../../schemas/author";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  hintClass,
  inputClass,
  inputErrorClass,
  labelClass,
} from "../ui/formStyles";

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
  const { showToast } = useToast();
  const isEdit = author !== null;

  const [error, setError] = useState(""); // algemene fout van de API (blijft)
  const [saving, setSaving] = useState(false); // blijft

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthorForm>({
    resolver: zodResolver(authorSchema),
  });

  // Elke keer als de modal opengaat: velden vullen (bewerken) of leegmaken (nieuw)
  useEffect(() => {
    if (!open) return;

    // reset() vult de velden (bewerken) of maakt ze leeg (nieuw), en wist oude zod-fouten
    reset({ name: author?.name ?? "", birth_year: author?.birth_year });
    setError("");
  }, [open, author, reset]);

  // Draait ALLEEN als zod alles goedkeurt; data is dan al gecontroleerd
  const onSubmit = async (data: AuthorForm) => {
    setSaving(true);
    try {
      // Bewerken → PUT, nieuw → POST
      const saved = isEdit
        ? await updateAuthor(author.id, data)
        : await createAuthor(data);
      onSaved?.(saved);
      onClose(); // gelukt → modal dicht
      showToast(
        "success",
        "Opgeslagen!",
        `"${data.name}" staat netjes bij de auteurs.`,
      );
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
          err instanceof Error
            ? err.message
            : "Auteur kon niet worden opgeslagen",
        );
      }
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
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Naam */}
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Naam</span>
        <input
          {...register("name")}
          placeholder="Gerard Reve"
          className={errors.name ? inputErrorClass : inputClass}
        />
        <span className={hintClass}>Voor- en achternaam.</span>
        <FieldError message={errors.name?.message} />
      </label>

      {/* Geboortejaar */}
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Geboortejaar</span>
        <input
          type="number"
          {...register("birth_year", { valueAsNumber: true })}
          placeholder="1923"
          className={errors.birth_year ? inputErrorClass : inputClass}
        />
        <FieldError message={errors.birth_year?.message} />
      </label>
    </FormModal>
  );
}
