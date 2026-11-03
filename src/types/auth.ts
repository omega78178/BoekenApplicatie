export type Role = "admin";
export interface User {
  email: string;
  role: Role;
}
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
