const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_SECRET = import.meta.env.VITE_API_SECRET;
const API_SANDBOX = import.meta.env.VITE_API_SANDBOX;

// Eigen fout-type: onthoudt ook de statuscode (bv. 401),
// zodat je in de pagina kunt kijken WAT er mis ging.
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// true als de API zegt: "je mag dit niet" (401 = niet ingelogd, 403 = geen rechten)
export function isUnauthorized(err: unknown): err is ApiError {
  return err instanceof ApiError && (err.status === 401 || err.status === 403);
}

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
    // Probeer de foutmelding van de API te lezen (bv. { "message": "..." })
    let message = "";
    try {
      const body = await response.json();
      message = body.message ?? "";
    } catch {
      // geen JSON teruggekregen, dan alleen de statuscode tonen
    }
    throw new ApiError(
      response.status,
      `Verzoek mislukt (${response.status})${message ? ": " + message : ""}`,
    );
  }

  // 204 = gelukt, maar zonder inhoud: dan valt er geen JSON te lezen
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
