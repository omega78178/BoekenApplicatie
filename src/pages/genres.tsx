import { useState } from "react";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import CardGrid from "../components/ui/CardGrid";
import PageStatus from "../components/ui/PageStatus";
import GenreCard from "../components/genres/GenreCard";
import GenreModal from "../components/modals/GenreModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import { deleteGenre } from "../api/genres";
import { useBooks } from "../hooks/useBooks";
import { useGenres } from "../hooks/useGenres";
import { useDeleteItem } from "../hooks/useDeleteItem";
// "as GenreType" omdat deze pagina zelf al Genre heet (net als bij books.tsx)
import type { Genre as GenreType } from "../types/genre";

// Iedereen ziet de knoppen. Ben je geen admin, dan weigert de API (401)
// en verschijnt de gele toast "Alleen voor admins".
export default function Genre() {
  const [isOpen, setIsOpen] = useState(false); // genre-modal staat eerst dicht
  const [genreToEdit, setGenreToEdit] = useState<GenreType | null>(null); // null = nieuw genre, anders bewerken

  const { genres, setGenres, loading, error, setError, loadGenres } = useGenres();
  const { books } = useBooks(); // nodig om boeken per genre te tellen

  // Alles rond verwijderen zit in een eigen hook
  const deleter = useDeleteItem<GenreType>({
    remove: (genre) => deleteGenre(genre.id),
    onDeleted: (deleted) => {
      // Direct uit de state halen, zodat de kaart meteen verdwijnt
      setGenres((current) => current.filter((g) => g.id !== deleted.id));
      setError("");
    },
    onError: setError,
  });

  // Modal openen voor een nieuw genre (genre = null) of om te bewerken
  function openGenreModal(genre: GenreType | null) {
    setGenreToEdit(genre);
    setIsOpen(true);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHeader
        title="genres"
        count={loading ? undefined : genres.length}
        searchText="Zoek op genre…"
        buttonText="Nieuw genre"
        onButtonClick={() => openGenreModal(null)}
      />

      <PageStatus
        loading={loading}
        error={error}
        isEmpty={genres.length === 0}
        emptyText='Nog geen genres. Klik op "Nieuw genre" om er een toe te voegen.'
      />

      <CardGrid>
        {genres.map((genre) => (
          <GenreCard
            key={genre.id}
            genre={genre}
            books={books}
            onEdit={openGenreModal}
            onDelete={deleter.askDelete}
          />
        ))}
      </CardGrid>

      <GenreModal
        open={isOpen}
        genre={genreToEdit}
        onClose={() => setIsOpen(false)}
        onSaved={() => loadGenres()} // lijst opnieuw ophalen
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
