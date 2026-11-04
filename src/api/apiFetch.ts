const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_SECRET = import.meta.env.VITE_API_SECRET;
const API_SANDBOX = import.meta.env.VITE_API_SANDBOX;

// Algemene fetch-helper: voegt de base URL en de vaste headers toe
// en gooit een fout als het verzoek mislukt.
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "X-Api-Secret": API_SECRET,
      "X-Sandbox": API_SANDBOX,
      Accept: "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error("Verzoek mislukt: " + response.status);
  }

  return response.json();
}
