import { siteConfig } from '@/config/site';

export class APIError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'APIError';
  }
}

export async function apiFetchClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Gracefully clear duplicate slash issues during route concatenation
  const normalizedBase = siteConfig.apiBaseUrl.replace(/\/$/, '');
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const targetUrl = `${normalizedBase}${normalizedEndpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(targetUrl, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let message = `API Request Exception [${response.status}]`;
    try {
      const errorJson = await response.json();
      message = errorJson.error || message;
    } catch {
      // Fallback
    }
    throw new APIError(message, response.status);
  }

  return response.json() as Promise<T>;
}
