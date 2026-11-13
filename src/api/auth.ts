import { apiFetch } from "./apiFetch";

export type LoginRequest = {
  email: string;
  password: string; // exact de veldnaam uit de documentatie
};

export type LoginResponse = {
  // wat de API teruggeeft, bijv. token
  token: string;
};

export function loginRequest(
  email: string,
  password: string,
): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}
