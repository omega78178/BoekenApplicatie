import { apiFetch } from "./apiFetch";

export type LoginRequest = {
  email: string;
  password: string; // exact de veldnaam uit de documentatie
};

export type LoginResponse = {
  data: {
    access_token: string;
    token_type: string;
    expires_in: number; // aantal seconden tot het token verloopt
  };
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
