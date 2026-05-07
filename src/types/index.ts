// Room, Scare, Player, GameState types

export interface ApiError {
    message: string;
    status?: number;
}

export interface ApiResponse<T> {
    data: T | null;
    error: ApiError | null;
}

export type Transaction = {
    seller: string;
    buyer: string;
    amount: number;
};

export type TransactionBuyer = Pick<Transaction, "buyer">;

