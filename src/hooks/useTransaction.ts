"use client";

import { useState } from "react";
import { ApiError } from "@/types/errors";
import { PaymentResponse, Transaction } from "@/types";

const ENTRY_PRICE = Number(process.env.NEXT_PUBLIC_ENTRY_PRICE) || 3;

type UseTransactionOptions = {
  onSuccess?: () => void;
  onUnauthorized?: () => void;
  onError?: (error: ApiError) => void;
};

export function useTransaction({
  onSuccess,
  onUnauthorized,
  onError,
}: UseTransactionOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);

  const submitTransaction = async (identityToken: string) => {
    if (!identityToken) {
      onError?.({
        message: "Missing identity token",
      });
      return;
    }

    setIsLoading(true);

    try {
      const transaction: Transaction = {
        identity_token: identityToken,
        amount: ENTRY_PRICE,
        api_key: process.env.NEXT_PUBLIC_API_KEY || "default-seller",
      };

      const res = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      const data = (await res.json()) as PaymentResponse;

      if (res.status === 401) {
        onUnauthorized?.();
        return;
      }

      if (!res.ok) {
        onError?.({
          message: data.error?.message ?? "Payment failed",
          status: res.status,
        });
        return;
      }

      if (data.success) {
        onSuccess?.();
        return;
      }

      onError?.({
        message: data.error?.message ?? "Payment failed",
        status: data.error?.status,
      });
    } catch (error) {
      onError?.({
        message: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitTransaction,
    isLoading,
  };
}