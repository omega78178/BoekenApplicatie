import { apiFetch } from "./apiFetch";
import type { Genre, NewGenre } from "../types/genre";

// De API verpakt alles in { data: ... }
export async function getGenres(): Promise<Genre[]> {
  const result = await apiFetch<{ data: Genre[] }>("/genres");
  return result.data;
}

export async function createGenre(genre: NewGenre): Promise<Genre | undefined> {
  const result = await apiFetch<{ data: Genre } | undefined>("/genres", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(genre),
  });
  return result?.data;
}

// ── Een genre bewerken ─────────────────────────
// Zelfde body als bij aanmaken, maar dan met PUT naar /genres/{id}
export async function updateGenre(
  id: number,
  genre: NewGenre,
): Promise<Genre | undefined> {
  const result = await apiFetch<{ data: Genre } | undefined>(`/genres/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(genre),
  });
  return result?.data;
}

export async function deleteGenre(id: number): Promise<void> {
  await apiFetch<void>(`/genres/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
