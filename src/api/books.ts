import { apiFetch } from "./apiFetch";
import type { Book, NewBook } from "../types/book";

// De API verpakt alles in { data: ... }
export async function getBooks(): Promise<Book[]> {
  const result = await apiFetch<{ data: Book[] }>("/books");
  return result.data;
}

// Geeft het nieuwe boek terug, of undefined als de API niets terugstuurt (204)
export async function createBook(book: NewBook): Promise<Book | undefined> {
  const result = await apiFetch<{ data: Book } | undefined>("/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, // admin-token
    },
    body: JSON.stringify(book),
  });
  return result?.data; // ?. = geen crash als result leeg is
}

// ── Een boek verwijderen ───────────────────────
// Geeft meestal 204 terug (gelukt, geen inhoud) — apiFetch vangt dat op
export async function deleteBook(id: number): Promise<void> {
  await apiFetch<void>(`/books/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // admin-token
    },
  });
}

// ── Een boek bewerken ──────────────────────────
// Zelfde body als bij aanmaken, maar dan met PUT naar /books/{id}
export async function updateBook(id: number, book: NewBook): Promise<Book | undefined> {
  const result = await apiFetch<{ data: Book } | undefined>(`/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, // admin-token
    },
    body: JSON.stringify(book),
  });
  return result?.data;
}
