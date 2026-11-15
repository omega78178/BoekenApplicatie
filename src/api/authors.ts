import { apiFetch } from "./apiFetch";
import type { Author, NewAuthor } from "../types/author";

// De API verpakt alles in { data: ... }
export async function getAuthors(): Promise<Author[]> {
  const result = await apiFetch<{ data: Author[] }>("/authors");
  return result.data;
}

export async function createAuthor(
  author: NewAuthor,
): Promise<Author | undefined> {
  const result = await apiFetch<{ data: Author } | undefined>("/authors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(author),
  });
  return result?.data;
}

// ── Een auteur bewerken ────────────────────────
// Zelfde body als bij aanmaken, maar dan met PUT naar /authors/{id}
export async function updateAuthor(
  id: number,
  author: NewAuthor,
): Promise<Author | undefined> {
  const result = await apiFetch<{ data: Author } | undefined>(
    `/authors/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(author),
    },
  );
  return result?.data;
}

export async function deleteAuthor(id: number): Promise<void> {
  await apiFetch<void>(`/authors/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
