export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store", // important for dynamic data in App Router
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "API Error");
    throw new Error(errorText);
  }

  return res.json() as Promise<T>;
}
