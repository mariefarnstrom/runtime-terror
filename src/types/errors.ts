export interface ApiError {
    message: string;
    status?: number;
}

export interface PaymentError extends ApiError {
    declineCode?: string
    field?: string
}

export class AppError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'AppError'
    this.status = status
  }
}

export interface ApiResponse<T> {
    data: T | null;
    error: ApiError | null;
}