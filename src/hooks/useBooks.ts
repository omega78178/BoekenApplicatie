import { useEffect, useState } from "react";
import { getBooks } from "../api/books";
import type { Book } from "../types/book";

// ── Eigen hook: haalt ALLE boeken op en houdt laden/fout bij ──
// Filteren (bv. alleen jouw eigen boeken) doet de pagina zelf,
// want de auteurspagina heeft alle boeken nodig om te tellen.
export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Boeken ophalen bij de API
  function loadBooks() {
    getBooks()
      .then((data) => {
        setBooks(data);
        setError("");
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Boeken laden mislukt"),
      )
      .finally(() => setLoading(false));
  }

  // 1x bij het openen van de pagina die deze hook gebruikt
  useEffect(() => {
    loadBooks();
  }, []);

  // Alles teruggeven wat een pagina nodig kan hebben
  return { books, setBooks, loading, error, setError, loadBooks };
}
