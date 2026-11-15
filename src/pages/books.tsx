import { useEffect, useState } from "react";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import Entitycard from "../components/Entitycard";
import BookModal from "../components/BookModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { deleteBook, getBooks } from "../api/books";
import type { Book as BookType } from "../types/book";

// ── Onthouden welke boeken je zelf hebt aangemaakt ──
// localStorage kan alleen tekst bewaren, dus de lijst met id's
// zetten we om naar JSON-tekst en weer terug.
const MY_BOOKS_KEY = "myBookIds";

function getMyBookIds(): number[] {
  return JSON.parse(localStorage.getItem(MY_BOOKS_KEY) ?? "[]");
}

function addMyBookId(id: number) {
  const ids = getMyBookIds();
  localStorage.setItem(MY_BOOKS_KEY, JSON.stringify([...ids, id]));
}

function removeMyBookId(id: number) {
  const ids = getMyBookIds().filter((bookId) => bookId !== id);
  localStorage.setItem(MY_BOOKS_KEY, JSON.stringify(ids));
}

export default function Book() {
  const [isOpen, setIsOpen] = useState(false); // boek-modal staat eerst dicht
  const [bookToEdit, setBookToEdit] = useState<BookType | null>(null); // null = nieuw boek, anders bewerken
  const [books, setBooks] = useState<BookType[]>([]); // jouw boeken
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookToDelete, setBookToDelete] = useState<BookType | null>(null); // null = verwijder-modal dicht
  const [deleting, setDeleting] = useState(false); // bezig met verwijderen?

  // Alle boeken ophalen, en alleen die van jou overhouden
  function loadBooks() {
    getBooks()
      .then((data) => {
        const myIds = getMyBookIds();
        setBooks(data.filter((book) => myIds.includes(book.id)));
        setError("");
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Boeken laden mislukt"),
      )
      .finally(() => setLoading(false));
  }

  // 1x bij het openen van de pagina
  useEffect(() => {
    loadBooks();
  }, []);

  // Modal openen voor een nieuw boek (book = null) of om te bewerken
  function openBookModal(book: BookType | null) {
    setBookToEdit(book);
    setIsOpen(true);
  }

  // Na het opslaan: bij een nieuw boek het id onthouden, daarna lijst opnieuw ophalen
  function handleSaved(savedBook: BookType | undefined) {
    if (!bookToEdit && savedBook) {
      addMyBookId(savedBook.id);
    }
    loadBooks();
  }

  // Verwijderen: na "Ja, verwijder" in de modal → naar de API → uit de lijst halen
  async function confirmDelete() {
    if (!bookToDelete) return;
    setDeleting(true); // knoppen uitzetten, zodat je niet 2x klikt
    try {
      await deleteBook(bookToDelete.id);
      removeMyBookId(bookToDelete.id);
      // Direct uit de state halen, zodat de kaart meteen verdwijnt
      setBooks((current) => current.filter((b) => b.id !== bookToDelete.id));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verwijderen mislukt");
    } finally {
      setDeleting(false);
      setBookToDelete(null); // modal dicht
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-canvas">
      <Header />
      <PageHeader
        title="boeken"
        searchText="Zoek op titel…"
        buttonText="Nieuw boek"
        onButtonClick={() => openBookModal(null)}
      />

      {loading && (
        <p className="px-8 text-ink-soft font-['DM_Sans']">Laden…</p>
      )}
      {error && <p className="px-8 text-coral font-['DM_Sans']">{error}</p>}
      {!loading && !error && books.length === 0 && (
        <p className="px-8 text-ink-soft font-['DM_Sans']">
          Nog geen boeken. Klik op "Nieuw boek" om er een toe te voegen.
        </p>
      )}

      {/* 4 kaarten per rij die de volle breedte van de container vullen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-8 py-8">
        {books.map((book) => (
          <Entitycard
            key={book.id}
            type="book"
            title={book.name}
            subtitle={`${book.author?.name ?? "Onbekende auteur"} · ${book.year}`}
            extra={book.genres?.map((genre) => genre.name).join(", ") ?? ""}
            onEdit={() => openBookModal(book)} // opent de modal in bewerk-modus
            onDelete={() => setBookToDelete(book)} // opent de verwijder-modal
          />
        ))}
      </div>

      <BookModal
        open={isOpen}
        book={bookToEdit}
        onClose={() => setIsOpen(false)}
        onSaved={handleSaved}
      />

      <ConfirmDeleteModal
        name={bookToDelete ? bookToDelete.name : null}
        onCancel={() => {
          if (!deleting) setBookToDelete(null); // niet sluiten terwijl hij bezig is
        }}
        onConfirm={confirmDelete}
        busy={deleting}
      />
    </div>
  );
}
