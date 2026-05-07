import EnterForm from "@/components/home-page/enter-form";
import Fog from "@/components/effects/Fog";
import { ApiError } from "@/types/errors";
import { fetcher } from "@/lib/fetcher";
import { PaymentResponse } from "@/types/index";
import { useState } from "react";

export default function Home() {
    const [error, setError] = useState<ApiError | null>(null)

  const handlePayment = async () => {
    setError(null)

    const result = await fetcher<PaymentResponse>('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seller: "<SELLER_ID>", buyer: "<BUYER_ID>", amount: 10 }),
    })

    if (!result.success) {
      setError(result.error)
      return
    }

    if (result.data.error) {
      setError(result.data.error)
      return
    }

    console.log('Payment successful, access token:', result.data.accessToken)
  }
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background — lowest layer */}
      <div className="absolute inset-0 bg-[url('/assets/images/Home-bg.png')] bg-cover" />

      {/* Fog — above background */}
      <Fog />

      {/* Content — top layer */}
      <div className="relative z-10 flex flex-col w-full items-center">
        <h1 className="text-red-800 text-5xl leading-normal">Runtime terror</h1>
        <EnterForm />
      </div>
    </div>
  );
}
