import { createContext, useContext, useState, type ReactNode } from "react";
import { loginRequest } from "../api/auth";
import type { AuthContextType, User } from "../types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Inloggen: true als het lukt, false als het mislukt
  async function login(email: string, password: string): Promise<boolean> {
    try {
      const data = await loginRequest(email, password); // vraag naar de API
      localStorage.setItem("token", data.token); // token bewaren
      setUser({ email: email, role: "admin" }); // gebruiker onthouden
      return true;
    } catch {
      // apiFetch gooit een fout bij een fout wachtwoord of als de API onbereikbaar is
      return false;
    }
  }
  // Uitloggen: alles weer leegmaken
  function logout() {
    localStorage.removeItem("token");
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
