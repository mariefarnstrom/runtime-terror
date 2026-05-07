import { PaymentError, ApiError } from "./errors";

export type Transaction = {
    seller: string;
    buyer: string;
    amount: number;
};

export type TransactionBuyer = Pick<Transaction, "buyer">;

export type PaymentResponse = {
  success: boolean
  accessToken?: string
  error?: PaymentError
}

export interface PaymentResult {
  success: boolean
  accessToken?: string
  error?: string
  declineCode?: string
}

export interface ApiResponse<T> {
    data: T | null;
    error: ApiError | null;
}