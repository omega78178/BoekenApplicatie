import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import TextField from "../ui/TextField";
import { hintClass } from "../ui/formStyles";
import { useAuth } from "../../hooks/Authcontext";
import { loginSchema, type LoginFormValues } from "../../schemas/login";

// Het loginformulier: alle state en login-logica staan hier bij elkaar
function LoginForm() {
  const [error, setError] = useState(""); // fout van de API (verkeerd wachtwoord)
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // isSubmitting = true zolang onSubmit bezig is
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // Draait ALLEEN als zod alles goedkeurt (beide velden ingevuld, geldig e-mailadres)
  const onSubmit = async (data: LoginFormValues) => {
    setError("");
    const ok = await login(data.email, data.password);
    if (ok) {
      navigate("/book");
    } else {
      setError("E-mailadres of wachtwoord is onjuist");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate // browser-popups uit, zodat je de meldingen van zod ziet
      className="w-full max-w-sm p-6 lg:p-10 bg-surface rounded-xl shadow-hard outline-2 -outline-offset-2 outline-ink flex flex-col items-start gap-6"
    >
      <div className="flex flex-col items-start gap-2">
        <Badge />
        <h1 className="text-ink text-5xl font-semibold font-display leading-10">
          Inloggen
        </h1>
      </div>

      {error && <p className="text-error text-sm font-medium">{error}</p>}

      <TextField
        label="E-mailadres"
        type="email"
        {...register("email")}
        error={errors.email?.message}
        placeholder="admin@admin.com"
      />
      <TextField
        label="Wachtwoord"
        type="password"
        {...register("password")}
        error={errors.password?.message}
        placeholder="••••••••"
      />

      <Button type="submit" disabled={isSubmitting} className="self-stretch">
        {isSubmitting ? "Bezig…" : "Inloggen"}
      </Button>

      <p className={hintClass}>
        Zonder login kun je alles bekijken. Genres toevoegen, wijzigen of
        verwijderen mag alleen een admin.
      </p>

      <Link
        to="/book"
        onClick={() => logout()}
        className="text-cobalt text-base font-bold leading-4"
      >
        Verder zonder inloggen →
      </Link>
    </form>
  );
}

export default LoginForm;
