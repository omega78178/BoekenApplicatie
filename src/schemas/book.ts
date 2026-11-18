import { z } from "zod";

// Let op: de dropdowns geven altijd tekst ("3"), daarom zijn author_id en genre_id hier strings.
// In BookModal maken we er bij het opslaan getallen van.
export const bookSchema = z.object({
  name: z.string().trim().min(1, "Vul een titel in."),
  author_id: z.string().min(1, "Kies een auteur."),
  genre_id: z.string(), // "" = geen genre, dat mag
  year: z
    .number({ error: "Vul een jaartal in, bijv. 1947." })
    .int("Een jaartal heeft geen komma.")
    .min(1000, "Vul 4 cijfers in.")
    .max(new Date().getFullYear(), "Dat jaar moet nog komen."),
});

export type BookForm = z.infer<typeof bookSchema>;
