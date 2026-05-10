"use client";
import EnterForm from "@/components/home-page/enter-form";
import Fog from "@/components/effects/Fog";
import { ApiError } from "@/types/errors";
import { useState } from "react";
import { processPayment } from "@/lib/payment";
import Link from "next/link";
import Bats from "@/components/effects/Bats";
import HelpOverlay from "@/components/shared/HelpOverlay";

export default function Home() {
  const [error, setError] = useState<ApiError | null>(null);
  const ENTRY_PRICE = Number(process.env.NEXT_PUBLIC_ENTRY_PRICE) || 3;

  const handlePayment = async (name: string) => {
    setError(null);

    const result = await processPayment({
      seller: process.env.NEXT_PUBLIC_SELLER || "default-seller",
      buyer: name,
      amount: ENTRY_PRICE,
    });

    if (!result.success) {
      setError({
        message: result.error?.message ?? "Payment failed",
        status: result.error?.status,
      });
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background — lowest layer */}
      <div className="absolute inset-0 bg-[url('/assets/images/Home-bg.png')] bg-cover bg-bottom" />

      {/* Fog — above background */}
      <Fog />

      <Bats />

      {/* Content — top layer */}
      <div className="relative z-10 flex flex-col w-full items-center">
        <h1 className="font-eater text-red-800 text-5xl leading-normal">
          Runtime terror
        </h1>

        <div className="bg-white/40 p-6 rounded">
          <div className="flex items-start gap-2">
            <div>
              <h2 className="font-fell text-xl">
                Are you a scaredy cat — or do you laugh in the face of horror?
              </h2>
              <h2 className="font-fell text-xl">
                Enter Runtime Terror and find out if you can handle what's
                inside.
              </h2>
            </div>
            <HelpOverlay />
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full h-full items-center">
          <h3 className="text-white text-xl">
            Enter the house for {ENTRY_PRICE}€
          </h3>
          <div className="w-[80vw] max-w-80 justify-end">
            <EnterForm onSubmit={handlePayment} />
            {error && (
              <p className="text-red-500 mt-4">Error: {error.message}</p>
            )}
          </div>
          <Link href="/haunted-house" className="text-white underline mt-4">
            Enter house (for testing)
          </Link>
        </div>
      </div>
    </div>
  );
}
