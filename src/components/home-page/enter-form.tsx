"use client";
import { useState } from "react";

type EnterFormProps = {
  onSubmit: (identityToken: string) => Promise<void>;
  identityToken: string | null;
  isLoading: boolean;
};

export default function EnterForm({ onSubmit, identityToken, isLoading }: EnterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identityToken) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(identityToken);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isSubmitting || isLoading || !identityToken;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-300/60 p-6 rounded shadow-md flex flex-col items-center w-full"
    >
      <button
        type="submit"
        disabled={isDisabled}
        className="border border-black rounded px-4 py-2 cursor-pointer hover:bg-red-700 hover:text-white transition focus:ring-2 focus:ring-red-700 focus:outline-none disabled:opacity-50"
      >
        {isSubmitting || isLoading ? "Processing..." : "Pay Entry Fee"}
      </button>
      {isDisabled && !identityToken && (
        <p className="text-red-500 text-sm mt-2">
          Unable to start payment: Identity token is missing. Return to the main tivoli site and try again.
        </p>
      )}
    </form>
  );
}
