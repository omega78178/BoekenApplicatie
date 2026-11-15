import { apiFetch } from "./apiFetch";
import type { Genre } from "../types/genre";

// De API verpakt alles in { data: ... }
export async function getGenres(): Promise<Genre[]> {
  const result = await apiFetch<{ data: Genre[] }>("/genres");
  return result.data;
}
