/** Client HTTP générique pour l'API générée (voir .env.example : VITE_API_URL). */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) {
    const message = await res.text().catch(() => '');
    throw new Error(message || `Erreur API (${res.status})`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const apiClient = {
  list: <T>(resource: string) => request<T[]>(`/${resource}`),
  get: <T>(resource: string, id: string | number) => request<T>(`/${resource}/${id}`),
  create: <T>(resource: string, body: unknown) =>
    request<T>(`/${resource}`, { method: 'POST', body: JSON.stringify(body) }),
  update: <T>(resource: string, id: string | number, body: unknown) =>
    request<T>(`/${resource}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (resource: string, id: string | number) =>
    request<void>(`/${resource}/${id}`, { method: 'DELETE' }),
};
