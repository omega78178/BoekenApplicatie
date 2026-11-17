import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import TextField from "../ui/TextField";
import { hintClass } from "../ui/formStyles";
import { useAuth } from "../../hooks/Authcontext";

// Het loginformulier: alle state en login-logica staan hier bij elkaar
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) {
      navigate("/book");
    } else {
      setError("E-mailadres of wachtwoord is onjuist");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
        value={email}
        onChange={setEmail}
        placeholder="admin@admin.com"
      />
      <TextField
        label="Wachtwoord"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="••••••••"
      />

      <Button type="submit" className="self-stretch">
        Inloggen
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
