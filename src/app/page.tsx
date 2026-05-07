'use client'
import EnterForm from "@/components/home-page/enter-form";
import Fog from "@/components/effects/Fog";
import { ApiError } from "@/types/errors";
import { useState } from "react";
import { processPayment } from "@/lib/payment";
import Link from "next/link";
import Bats from "@/components/effects/Bats";

export default function Home() {
  const [error, setError] = useState<ApiError | null>(null)
  const ENTRY_PRICE = Number(process.env.NEXT_PUBLIC_ENTRY_PRICE) || 3;


  const handlePayment = async (name: string) => {
    setError(null)

    const result = await processPayment({
      seller: process.env.NEXT_PUBLIC_SELLER || 'default-seller',
      buyer: name,
      amount: ENTRY_PRICE,
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

      <Bats />

      {/* Content — top layer */}
      <div className="relative z-10 flex flex-col gap-8 w-full h-full items-center">
        <h1 className="text-red-800 text-5xl leading-normal">Runtime terror</h1>
        <h3 className="text-white text-2xl">Enter the house for {ENTRY_PRICE}€</h3>
        <div className="w-80vw max-w-80 justify-end">
          <EnterForm onSubmit={handlePayment} />
          {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
        </div>
        <Link href="/haunted-house" className="text-white underline mt-4">Enter house (for testing)</Link>
      </div>
    </div>
  );
}
