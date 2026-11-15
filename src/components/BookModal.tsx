import { useEffect, useState } from "react";
import { createBook, updateBook } from "../api/books";
import { getAuthors } from "../api/authors";
import { getGenres } from "../api/genres";
import type { Book } from "../types/book";
import type { Author } from "../types/author";
import type { Genre } from "../types/genre";
import FormModal, { FieldError } from "./FormModal";
import { hintClass, inputClass, inputErrorClass, labelClass } from "./formStyles";

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
  const isEdit = book !== null;

  const [name, setName] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [genreId, setGenreId] = useState("");
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // De keuzes voor de dropdowns
  const [authors, setAuthors] = useState<Author[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  // Elke keer als de modal opengaat:
  // 1. velden vullen (bewerken) of leegmaken (nieuw)
  // 2. auteurs en genres ophalen
  useEffect(() => {
    if (!open) return;

    setName(book?.name ?? "");
    setAuthorId(book?.author ? String(book.author.id) : "");
    setGenreId(book?.genres?.[0] ? String(book.genres[0].id) : ""); // eerste genre
    setYear(book ? String(book.year) : "");
    setYearError("");
    setError("");

    Promise.all([getAuthors(), getGenres()])
      .then(([authorList, genreList]) => {
        setAuthors(authorList);
        setGenres(genreList);
      })
      .catch(() => setError("Auteurs en genres konden niet geladen worden"));
  }, [open, book]);

  const handleSubmit = async () => {
    // Jaartal controleren voordat we iets naar de API sturen
    if (!/^\d{4}$/.test(year)) {
      setYearError("Vul een jaartal in, bijv. 1947.");
      return;
    }
    setYearError("");

    // Precies de vorm van de request body uit de documentatie
    const body = {
      name: name,
      year: Number(year),
      author_id: Number(authorId),
      genre_ids: genreId ? [Number(genreId)] : [], // API wil een lijst
    };

    setSaving(true);
    try {
      // Bewerken → PUT, nieuw → POST
      const saved = isEdit ? await updateBook(book.id, body) : await createBook(body);
      onSaved?.(saved);
      onClose(); // gelukt → modal dicht
    } catch (err) {
      setError(err instanceof Error ? err.message : "Boek kon niet worden opgeslagen");
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
      onSubmit={handleSubmit}
    >
      {/* Titel */}
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Titel</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="De Avonden"
          required
          className={inputClass}
        />
        <span className={hintClass}>Zoals op de kaft.</span>
      </label>

      {/* Auteur: je ziet de naam, maar de value is het id */}
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Auteur</span>
        <select
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
          className={`${inputClass} cursor-pointer`}
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
      </label>

      {/* Genre + Jaar naast elkaar */}
      <div className="flex gap-4">
        <label className="flex-1 flex flex-col gap-2">
          <span className={labelClass}>Genre</span>
          <select
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
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
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="1947"
            className={yearError ? inputErrorClass : inputClass}
          />
          <FieldError message={yearError} />
        </label>
      </div>
    </FormModal>
  );
}
