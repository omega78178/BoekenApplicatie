import { useState } from "react";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import CardGrid from "../components/ui/CardGrid";
import PageStatus from "../components/ui/PageStatus";
import AuthorCard from "../components/authors/AuthorCard";
import AuthorModal from "../components/modals/AuthorModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import { deleteAuthor } from "../api/authors";
import { useBooks } from "../hooks/useBooks";
import { useAuthors } from "../hooks/useAuthors";
import { useDeleteItem } from "../hooks/useDeleteItem";
import type { Author } from "../types/author";

export default function Auteur() {
  const [isOpen, setIsOpen] = useState(false); // auteur-modal staat eerst dicht
  const [authorToEdit, setAuthorToEdit] = useState<Author | null>(null); // null = nieuwe auteur, anders bewerken

  const { authors, setAuthors, loading, error, setError, loadAuthors } = useAuthors();
  const { books } = useBooks(); // nodig om boeken per auteur te tellen

  // Alles rond verwijderen zit in een eigen hook
  const deleter = useDeleteItem<Author>({
    remove: (author) => deleteAuthor(author.id),
    onDeleted: (deleted) => {
      // Direct uit de state halen, zodat de kaart meteen verdwijnt
      setAuthors((current) => current.filter((a) => a.id !== deleted.id));
      setError("");
    },
    onError: setError,
  });

  // Modal openen voor een nieuwe auteur (author = null) of om te bewerken
  function openAuthorModal(author: Author | null) {
    setAuthorToEdit(author);
    setIsOpen(true);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHeader
        title="auteurs"
        count={loading ? undefined : authors.length}
        searchText="Zoek op auteur…"
        buttonText="Nieuwe auteur"
        onButtonClick={() => openAuthorModal(null)}
      />

      <PageStatus
        loading={loading}
        error={error}
        isEmpty={authors.length === 0}
        emptyText='Nog geen auteurs. Klik op "Nieuwe auteur" om er een toe te voegen.'
      />

      <CardGrid>
        {authors.map((author) => (
          <AuthorCard
            key={author.id}
            author={author}
            books={books}
            onEdit={openAuthorModal}
            onDelete={deleter.askDelete}
          />
        ))}
      </CardGrid>

      <AuthorModal
        open={isOpen}
        author={authorToEdit}
        onClose={() => setIsOpen(false)}
        onSaved={() => loadAuthors()} // lijst opnieuw ophalen
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
