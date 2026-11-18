import { z } from "zod";

export const loginSchema = z.object({
  // Eerst kijken of er iets is ingevuld, daarna (.pipe) of het een echt e-mailadres is.
  // Zo krijg je bij een leeg veld een andere melding dan bij "abc".
  email: z
    .string()
    .trim()
    .min(1, "Vul je e-mailadres in.")
    .pipe(z.email("Dit is geen geldig e-mailadres.")),
  password: z.string().min(1, "Vul je wachtwoord in."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
