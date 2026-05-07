'use client'

import EnterForm from "@/components/home-page/enter-form";
import Fog from "@/components/effects/Fog";
import { ApiError } from "@/types/errors";
import { useState } from "react";
import { processPayment } from "@/lib/payment";

export default function Home() {
  const [error, setError] = useState<ApiError | null>(null)

  const handlePayment = async (name: string) => {
    setError(null)

    const result = await processPayment({
      seller: process.env.SELLER || 'default-seller',
      buyer: name,
      amount: 100,
    })

    if (!result.success) {
      setError({ message: result.error?.message ?? 'Payment failed', status: result.error?.status })
    }
  }
  
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background — lowest layer */}
      <div className="absolute inset-0 bg-[url('/assets/images/Home-bg.png')] bg-cover" />

      {/* Fog — above background */}
      <Fog />

      {/* Content — top layer */}
      <div className="relative z-10 flex flex-col gap-6 w-full h-full items-center">
        <h1 className="text-red-800 text-5xl leading-normal">Runtime terror</h1>
        <div className="w-80vw max-w-80 justify-end">
          <EnterForm onSubmit={handlePayment} />
          {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
        </div>
      </div>
    </div>
  );
}
