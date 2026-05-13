export interface ApiError {
    message: string;
    status?: number;
}

export interface PaymentError extends ApiError {
    declineCode?: string
    field?: string
}

// Custom application error class
export class AppError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'AppError'
    this.status = status
  }
}

