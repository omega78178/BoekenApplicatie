import { apiFetch } from "./apiFetch";

export type Book = {
  id: number;
  title: string;
  author: string;
};

export function getBooks(): Promise<Book[]> {
  return apiFetch<Book[]>("/books");
}
