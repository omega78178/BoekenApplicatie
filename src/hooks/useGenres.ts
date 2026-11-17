import { useEffect, useState } from "react";
import { getGenres } from "../api/genres";
import type { Genre } from "../types/genre";

// ── Eigen hook: haalt alle genres op en houdt laden/fout bij ──
// (werkt precies zoals useBooks)
export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Genres ophalen bij de API
  function loadGenres() {
    getGenres()
      .then((data) => {
        setGenres(data);
        setError("");
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Genres laden mislukt"),
      )
      .finally(() => setLoading(false));
  }

  // 1x bij het openen van de pagina die deze hook gebruikt
  useEffect(() => {
    loadGenres();
  }, []);

  return { genres, setGenres, loading, error, setError, loadGenres };
}
