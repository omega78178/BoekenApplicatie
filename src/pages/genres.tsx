import { useEffect, useState } from "react";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import Entitycard from "../components/Entitycard";
import GenreModal from "../components/GenreModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { getGenres, deleteGenre } from "../api/genres";
import { useBooks } from "../hooks/useBooks";
import { isUnauthorized } from "../api/apiFetch";
import { useToast } from "../hooks/ToastContext";
import { useAuth } from "../hooks/Authcontext";
// "as GenreType" omdat deze pagina zelf al Genre heet (net als bij books.tsx)
import type { Genre as GenreType } from "../types/genre";

export default function Genre() {
  const { showToast } = useToast();
  // Alleen admins mogen toevoegen, bewerken en verwijderen
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  // ── State: hooks moeten BINNEN de component staan ──
  const [isOpen, setIsOpen] = useState(false); // genre-modal staat eerst dicht
  const [genreToEdit, setGenreToEdit] = useState<GenreType | null>(null); // null = nieuw genre, anders bewerken
  const [genreToDelete, setGenreToDelete] = useState<GenreType | null>(null); // null = verwijder-modal dicht
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false); // bezig met verwijderen?

  // Alle boeken uit de eigen hook, nodig om boeken per genre te tellen
  const { books } = useBooks();

  // Genres ophalen (de boeken komen al uit useBooks)
  function loadGenres() {
    getGenres()
      .then((genreList) => {
        setGenres(genreList);
        setError("");
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Laden mislukt"),
      )
      .finally(() => setLoading(false));
  }

  // 1x bij het openen van de pagina
  useEffect(() => {
    loadGenres();
  }, []);

  // Modal openen voor een nieuw genre (genre = null) of om te bewerken
  function openGenreModal(genre: GenreType | null) {
    setGenreToEdit(genre);
    setIsOpen(true);
  }

  // Verwijderen: na "Ja, verwijder" in de modal → naar de API → uit de lijst halen
  async function confirmDelete() {
    if (!genreToDelete) return;
    setDeleting(true); // knoppen uitzetten, zodat je niet 2x klikt
    try {
      await deleteGenre(genreToDelete.id);
      // Direct uit de state halen, zodat de kaart meteen verdwijnt
      setGenres((current) =>
        current.filter((g) => g.id !== genreToDelete.id),
      );
      setError("");
      showToast("success", "Verwijderd", `"${genreToDelete.name}" is uit de kast gehaald.`);
    } catch (err) {
      if (isUnauthorized(err)) {
        // 401/403: de API zegt dat je dit niet mag → gele toast
        showToast(
          "unauthorized",
          "Alleen voor admins",
          `${err.status} · Log in als administrator om "${genreToDelete.name}" te verwijderen.`,
        );
      } else {
        setError(err instanceof Error ? err.message : "Verwijderen mislukt");
      }
    } finally {
      setDeleting(false);
      setGenreToDelete(null); // modal dicht
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-canvas">
      <Header />
      <PageHeader
        title="genres"
        count={loading ? undefined : genres.length} // echt aantal uit de API
        searchText="Zoek op genre…"
        buttonText={isAdmin ? "Nieuw genre" : undefined} // geen tekst = geen knop
        onButtonClick={() => openGenreModal(null)}
      />

      {loading && <p className="px-8 text-ink-soft font-['DM_Sans']">Laden…</p>}
      {error && <p className="px-8 text-coral font-['DM_Sans']">{error}</p>}
      {!loading && !error && genres.length === 0 && (
        <p className="px-8 text-ink-soft font-['DM_Sans']">
          Nog geen genres. Klik op "Nieuw genre" om er een toe te voegen.
        </p>
      )}

      {/* 4 kaarten per rij die de volle breedte van de container vullen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-8 py-8">
        {genres.map((genre) => {
          // Tel hoeveel boeken dit genre hebben.
          // Een boek kan meerdere genres hebben, dus: zit dit genre ergens in book.genres?
          const bookCount = books.filter((book) =>
            book.genres?.some((g) => g.id === genre.id),
          ).length;

          return (
            <Entitycard
              key={genre.id}
              type="genre"
              title={genre.name}
              subtitle={genre.description}
              extra={`${bookCount} ${bookCount === 1 ? "boek" : "boeken"}`}
              onEdit={isAdmin ? () => openGenreModal(genre) : undefined} // alleen admin: bewerken
              onDelete={isAdmin ? () => setGenreToDelete(genre) : undefined} // alleen admin: verwijderen
            />
          );
        })}
      </div>

      <GenreModal
        open={isOpen}
        genre={genreToEdit}
        onClose={() => setIsOpen(false)}
        onSaved={() => loadGenres()} // lijst opnieuw ophalen
      />

      <ConfirmDeleteModal
        name={genreToDelete ? genreToDelete.name : null}
        onCancel={() => {
          if (!deleting) setGenreToDelete(null); // niet sluiten terwijl hij bezig is
        }}
        onConfirm={confirmDelete}
        busy={deleting}
      />
    </div>
  );
}
