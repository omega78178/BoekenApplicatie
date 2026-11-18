import { z } from "zod";

export const authorSchema = z.object({
  name: z.string().trim().min(1, "Vul een naam in."),
  birth_year: z
    .number({ error: "Vul een geboortejaar in, bijv. 1923." })
    .int("Een jaartal heeft geen komma.")
    .min(1000, "Vul 4 cijfers in.")
    .max(new Date().getFullYear(), "Dat jaar moet nog komen."),
});

export type AuthorForm = z.infer<typeof authorSchema>;
