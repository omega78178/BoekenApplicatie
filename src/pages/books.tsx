import { useState } from "react";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import CardGrid from "../components/ui/CardGrid";
import PageStatus from "../components/ui/PageStatus";
import BookCard from "../components/books/BookCard";
import BookModal from "../components/modals/BookModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import { useBooks } from "../hooks/useBooks";
import { useDeleteItem } from "../hooks/useDeleteItem";
import { deleteBook } from "../api/books";
import { addMyBookId, onlyMyBooks, removeMyBookId } from "../utils/myBookIds";
import type { Book as BookType } from "../types/book";

export default function Book() {
  const [isOpen, setIsOpen] = useState(false); // boek-modal staat eerst dicht
  const [bookToEdit, setBookToEdit] = useState<BookType | null>(null); // null = nieuw boek, anders bewerken

  // Alle boeken komen uit de eigen hook, daarna alleen jouw eigen boeken
  const { books: allBooks, setBooks, loading, error, setError, loadBooks } =
    useBooks();
  const books = onlyMyBooks(allBooks);

  // Alles rond verwijderen zit in een eigen hook
  const deleter = useDeleteItem<BookType>({
    remove: async (book) => {
      await deleteBook(book.id);
      removeMyBookId(book.id); // ook uit "mijn boeken" halen
    },
    onDeleted: (deleted) => {
      // Direct uit de state halen, zodat de kaart meteen verdwijnt
      setBooks((current) => current.filter((b) => b.id !== deleted.id));
      setError("");
    },
    onError: setError,
  });

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHeader
        title="boeken"
        count={loading ? undefined : books.length}
        searchText="Zoek op titel…"
        buttonText="Nieuw boek"
        onButtonClick={() => openBookModal(null)}
      />

      <PageStatus
        loading={loading}
        error={error}
        isEmpty={books.length === 0}
        emptyText='Nog geen boeken. Klik op "Nieuw boek" om er een toe te voegen.'
      />

      <CardGrid>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={openBookModal}
            onDelete={deleter.askDelete}
          />
        ))}
      </CardGrid>

      <BookModal
        open={isOpen}
        book={bookToEdit}
        onClose={() => setIsOpen(false)}
        onSaved={handleSaved}
      />

      <ConfirmDeleteModal
        name={deleter.itemToDelete?.name ?? null}
        onCancel={deleter.cancelDelete}
        onConfirm={deleter.confirmDelete}
        busy={deleter.deleting}
      />
    </div>
  );
}
