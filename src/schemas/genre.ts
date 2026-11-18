import { z } from "zod";

export const genreSchema = z.object({
  name: z.string().trim().min(1, "Vul een naam in."),
  description: z.string().trim().min(1, "Vul een beschrijving in."),
});

export type GenreForm = z.infer<typeof genreSchema>;
