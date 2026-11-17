import type { Book } from "../types/book";

// ── Onthouden welke boeken je zelf hebt aangemaakt ──
// localStorage kan alleen tekst bewaren, dus de lijst met id's
// zetten we om naar JSON-tekst en weer terug.
const MY_BOOKS_KEY = "myBookIds";

export function getMyBookIds(): number[] {
  return JSON.parse(localStorage.getItem(MY_BOOKS_KEY) ?? "[]");
}

export function addMyBookId(id: number) {
  const ids = getMyBookIds();
  localStorage.setItem(MY_BOOKS_KEY, JSON.stringify([...ids, id]));
}

export function removeMyBookId(id: number) {
  const ids = getMyBookIds().filter((bookId) => bookId !== id);
  localStorage.setItem(MY_BOOKS_KEY, JSON.stringify(ids));
}

// Uit een lijst boeken alleen jouw eigen boeken overhouden
export function onlyMyBooks(books: Book[]): Book[] {
  const myIds = getMyBookIds();
  return books.filter((book) => myIds.includes(book.id));
}
