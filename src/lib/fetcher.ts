import { ApiError } from '@/types/errors'
import { parseError } from '@/lib/parseError'

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError }


// Generic fetcher function to handle API requests and responses so all API calls can use the same standardized format for success and error handling
export async function fetcher<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers, // Allow overriding headers if needed
      }
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: {
          message: data.error ?? 'Request failed',
          status: res.status,
        },
      }
    }

    return { success: true, data: data as T }
  } catch (error: unknown) {
    return { success: false, error: parseError(error) }
  }
}