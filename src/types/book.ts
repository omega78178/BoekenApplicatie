import type { Author } from "./author";
import type { Genre } from "./genre";

// Wat de API terugstuurt
export type Book = {
  id: number;
  name: string; // de titel van het boek
  year: number;
  author: Author;
  genres: Genre[]; // een boek kan meerdere genres hebben
};

// Wat je opstuurt om een boek te maken of te bewerken
export type NewBook = {
  name: string;
  year: number;
  author_id: number;
  genre_ids: number[]; // lijst met genre-id's, bv. [2] of [2, 5]
};
