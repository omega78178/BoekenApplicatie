import { createContext, useContext, useState, type ReactNode } from "react";
import { loginRequest } from "../api/auth";
import type { AuthContextType, User } from "../types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Inloggen: true als het lukt, false als het mislukt
  async function login(email: string, password: string): Promise<boolean> {
    try {
      const data = await loginRequest(email, password); // vraag naar de API
      // Het token zit in { data: { access_token: "..." } }
      localStorage.setItem("token", data.data.access_token); // token bewaren
      const newUser: User = { email: email, role: "admin" }; // 1. object maken
      localStorage.setItem("user", JSON.stringify(newUser)); // 2. bewaren in localStorage
      setUser(newUser); // 3. in de state zetten
      return true;
    } catch {
      // apiFetch gooit een fout bij een fout wachtwoord of als de API onbereikbaar is
      return false;
    }
  }
  // Uitloggen: alles weer leegmaken
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }
  // tussen useState en return

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth moet binnen <AuthProvider> gebruikt worden");
  }
  return context;
}
