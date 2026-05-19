import { PaymentError, ApiError } from "./errors";

export type Transaction = {
  identity_token: string;
  amount: number;
  api_key: string;
};

export type PaymentResponse = {
  success: boolean
  error?: PaymentError
}

export interface PaymentResult {
  success: boolean
  error?: string
  declineCode?: string
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}