import { useEffect, useState } from "react";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import Entitycard from "../components/Entitycard";
import AuthorModal from "../components/AuthorModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { getAuthors, deleteAuthor } from "../api/authors";
import { useBooks } from "../hooks/useBooks";
import { isUnauthorized } from "../api/apiFetch";
import { useToast } from "../hooks/ToastContext";
import type { Author } from "../types/author";

export default function Auteur() {
  const { showToast } = useToast();
  // ── State: hooks moeten BINNEN de component staan ──
  const [isOpen, setIsOpen] = useState(false); // auteur-modal staat eerst dicht
  const [authorToEdit, setAuthorToEdit] = useState<Author | null>(null); // null = nieuwe auteur, anders bewerken
  const [authorToDelete, setAuthorToDelete] = useState<Author | null>(null); // null = verwijder-modal dicht
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false); // bezig met verwijderen?

  // Alle boeken uit de eigen hook, nodig om boeken per auteur te tellen
  const { books } = useBooks();

  // Auteurs ophalen (de boeken komen al uit useBooks)
  function loadAuthors() {
    getAuthors()
      .then((authorList) => {
        setAuthors(authorList);
        setError("");
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Laden mislukt"),
      )
      .finally(() => setLoading(false));
  }

  // 1x bij het openen van de pagina
  useEffect(() => {
    loadAuthors();
  }, []);

  // Modal openen voor een nieuwe auteur (author = null) of om te bewerken
  function openAuthorModal(author: Author | null) {
    setAuthorToEdit(author);
    setIsOpen(true);
  }

  // Verwijderen: na "Ja, verwijder" in de modal → naar de API → uit de lijst halen
  async function confirmDelete() {
    if (!authorToDelete) return;
    setDeleting(true); // knoppen uitzetten, zodat je niet 2x klikt
    try {
      await deleteAuthor(authorToDelete.id);
      // Direct uit de state halen, zodat de kaart meteen verdwijnt
      setAuthors((current) => current.filter((a) => a.id !== authorToDelete.id));
      setError("");
      showToast("success", "Verwijderd", `"${authorToDelete.name}" is uit de kast gehaald.`);
    } catch (err) {
      if (isUnauthorized(err)) {
        // 401/403: de API zegt dat je dit niet mag → gele toast
        showToast(
          "unauthorized",
          "Alleen voor admins",
          `${err.status} · Log in als administrator om "${authorToDelete.name}" te verwijderen.`,
        );
      } else {
        setError(err instanceof Error ? err.message : "Verwijderen mislukt");
      }
    } finally {
      setDeleting(false);
      setAuthorToDelete(null); // modal dicht
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-canvas">
      <Header />
      <PageHeader
        title="auteurs"
        count={loading ? undefined : authors.length} // echt aantal uit de API
        searchText="Zoek op auteur…"
        buttonText="Nieuwe auteur"
        onButtonClick={() => openAuthorModal(null)}
      />

      {loading && (
        <p className="px-8 text-ink-soft font-['DM_Sans']">Laden…</p>
      )}
      {error && <p className="px-8 text-coral font-['DM_Sans']">{error}</p>}
      {!loading && !error && authors.length === 0 && (
        <p className="px-8 text-ink-soft font-['DM_Sans']">
          Nog geen auteurs. Klik op "Nieuwe auteur" om er een toe te voegen.
        </p>
      )}

      {/* 4 kaarten per rij die de volle breedte van de container vullen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-8 py-8">
        {authors.map((author) => {
          // Tel hoeveel boeken bij deze auteur horen
          const bookCount = books.filter(
            (book) => book.author?.id === author.id,
          ).length;

          return (
            <Entitycard
              key={author.id}
              type="author"
              title={author.name}
              subtitle={`Geboren in ${author.birth_year}`}
              extra={`${bookCount} ${bookCount === 1 ? "boek" : "boeken"}`}
              onEdit={() => openAuthorModal(author)} // opent de modal in bewerk-modus
              onDelete={() => setAuthorToDelete(author)} // opent de verwijder-modal
            />
          );
        })}
      </div>

      <AuthorModal
        open={isOpen}
        author={authorToEdit}
        onClose={() => setIsOpen(false)}
        onSaved={() => loadAuthors()} // lijst opnieuw ophalen
      />

      <ConfirmDeleteModal
        name={authorToDelete ? authorToDelete.name : null}
        onCancel={() => {
          if (!deleting) setAuthorToDelete(null); // niet sluiten terwijl hij bezig is
        }}
        onConfirm={confirmDelete}
        busy={deleting}
      />
    </div>
  );
}
