import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isUnauthorized } from "../../api/apiFetch";
import { useToast } from "../../hooks/ToastContext";
import { createBook, updateBook } from "../../api/books";
import { getAuthors } from "../../api/authors";
import { getGenres } from "../../api/genres";
import type { Book } from "../../types/book";
import type { Author } from "../../types/author";
import type { Genre } from "../../types/genre";
import { bookSchema, type BookForm } from "../../schemas/book";
import FormModal, { FieldError } from "./FormModal";
import { hintClass, inputClass, inputErrorClass, labelClass } from "../ui/formStyles";

// ── Eén modal voor zowel "Nieuw boek" als "Boek bewerken" ──
// book = null  → nieuw boek aanmaken
// book = {...} → dat boek bewerken (velden zijn al ingevuld)

type BookModalProps = {
  open: boolean;
  book: Book | null;
  onClose: () => void;
  onSaved?: (book: Book | undefined) => void; // krijgt het opgeslagen boek mee
};

export default function BookModal({ open, book, onClose, onSaved }: BookModalProps) {
  const { showToast } = useToast();
  const isEdit = book !== null;

  const [error, setError] = useState(""); // algemene fout van de API
  const [saving, setSaving] = useState(false);

  // De keuzes voor de dropdowns
  const [authors, setAuthors] = useState<Author[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BookForm>({
    resolver: zodResolver(bookSchema),
  });

  // Elke keer als de modal opengaat:
  // 1. velden vullen (bewerken) of leegmaken (nieuw)
  // 2. auteurs en genres ophalen
  useEffect(() => {
    if (!open) return;

    reset({
      name: book?.name ?? "",
      author_id: book?.author ? String(book.author.id) : "",
      genre_id: book?.genres?.[0] ? String(book.genres[0].id) : "", // eerste genre
      year: book?.year,
    });
    setError("");

    Promise.all([getAuthors(), getGenres()])
      .then(([authorList, genreList]) => {
        setAuthors(authorList);
        setGenres(genreList);
      })
      .catch(() => setError("Auteurs en genres konden niet geladen worden"));
  }, [open, book, reset]);

  // Draait ALLEEN als zod alles goedkeurt; data is dan al gecontroleerd
  const onSubmit = async (data: BookForm) => {
    // Precies de vorm van de request body uit de documentatie
    const body = {
      name: data.name,
      year: data.year,
      author_id: Number(data.author_id),
      genre_ids: data.genre_id ? [Number(data.genre_id)] : [], // API wil een lijst
    };

    setSaving(true);
    try {
      // Bewerken → PUT, nieuw → POST
      const saved = isEdit ? await updateBook(book.id, body) : await createBook(body);
      onSaved?.(saved);
      onClose(); // gelukt → modal dicht
      showToast("success", "Opgeslagen!", `"${data.name}" staat weer netjes in de kast.`);
    } catch (err) {
      if (isUnauthorized(err)) {
        // 401/403: de API zegt dat je dit niet mag → gele toast
        showToast(
          "unauthorized",
          "Alleen voor admins",
          `${err.status} · Log in als administrator om "${data.name}" op te slaan.`,
        );
      } else {
        setError(err instanceof Error ? err.message : "Boek kon niet worden opgeslagen");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormModal
      open={open}
      type="book"
      title={isEdit ? "Boek bewerken" : "Nieuw boek"}
      error={error}
      saving={saving}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Titel */}
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Titel</span>
        <input
          {...register("name")}
          placeholder="De Avonden"
          className={errors.name ? inputErrorClass : inputClass}
        />
        <span className={hintClass}>Zoals op de kaft.</span>
        <FieldError message={errors.name?.message} />
      </label>

      {/* Auteur: je ziet de naam, maar de value is het id.
          value={watch(...)}: de auteurs komen pas later binnen van de API,
          zo blijft bij bewerken toch de juiste auteur gekozen. */}
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Auteur</span>
        <select
          {...register("author_id")}
          value={watch("author_id")}
          className={`${errors.author_id ? inputErrorClass : inputClass} cursor-pointer`}
        >
          <option value="" disabled>
            Kies een auteur…
          </option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <span className={hintClass}>Kies uit de bestaande auteurs.</span>
        <FieldError message={errors.author_id?.message} />
      </label>

      {/* Genre en jaar: onder elkaar op mobiel, naast elkaar vanaf tablet */}
      <div className="flex flex-col sm:flex-row gap-4">
        <label className="flex-1 flex flex-col gap-2">
          <span className={labelClass}>Genre</span>
          <select
            {...register("genre_id")}
            value={watch("genre_id")} // zelfde reden als bij auteur
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">Geen genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex-1 flex flex-col gap-2">
          <span className={labelClass}>Jaar</span>
          <input
            type="number"
            {...register("year", { valueAsNumber: true })} // maakt van de tekst een getal
            placeholder="1947"
            className={errors.year ? inputErrorClass : inputClass}
          />
          <FieldError message={errors.year?.message} />
        </label>
      </div>
    </FormModal>
  );
}
