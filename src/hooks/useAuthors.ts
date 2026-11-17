import { useEffect, useState } from "react";
import { getAuthors } from "../api/authors";
import type { Author } from "../types/author";

// ── Eigen hook: haalt alle auteurs op en houdt laden/fout bij ──
// (werkt precies zoals useBooks en useGenres)
export function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Auteurs ophalen bij de API
  function loadAuthors() {
    getAuthors()
      .then((data) => {
        setAuthors(data);
        setError("");
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Auteurs laden mislukt"),
      )
      .finally(() => setLoading(false));
  }

  // 1x bij het openen van de pagina die deze hook gebruikt
  useEffect(() => {
    loadAuthors();
  }, []);

  return { authors, setAuthors, loading, error, setError, loadAuthors };
}
