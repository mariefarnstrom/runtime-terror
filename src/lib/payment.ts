// Payment logic, types, helper functions

import { ApiError, ApiResponse, Transaction } from "../types";

export async function createTransaction(transaction: Transaction): Promise<ApiResponse<unknown>> {
    try {
        const response = await fetch("/api/transaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ buyer: transaction.buyer, seller: transaction.seller, amount: transaction.amount }),
        });
        const data: unknown = await response.json();

        if (!response.ok) {
            return {
                data: null,
                error: {
                    message: `Transaction request failed with status ${response.status}`,
                    status: response.status,
                },
            };
        }

        return { data, error: null };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return { data: null, error: { message } };
    }
}
