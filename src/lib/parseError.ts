import { ApiError } from "@/types/errors";

// Parse an unknown error into a standardized ApiError format
export function parseError(error: unknown): ApiError {
  if (error instanceof Error) {
    return { message: error.message }
  }
  if (typeof error === 'string') {
    return { message: error }
  }
  return { message: 'An unknown error occurred' }
}

// Type guard to check if an error is an ApiError
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ApiError).message === 'string'
  )
}