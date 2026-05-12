"use client";
import EnterForm from "@/components/home-page/enter-form";
import Fog from "@/components/effects/Fog";
import { ApiError } from "@/types/errors";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Bats from "@/components/effects/Bats";
import HelpOverlay from "@/components/shared/HelpOverlay";
import { useUrlParams } from "@/hooks/useUrlParams";
import { UnauthorizedModal } from "@/components/shared/UnauthorizedModal";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
  const [devAccessLoading, setDevAccessLoading] = useState(false);
  const ENTRY_PRICE = Number(process.env.NEXT_PUBLIC_ENTRY_PRICE) || 3;

  const { identityToken } = useUrlParams();

  if (identityToken) {
    console.log("Identity Token from URL:", identityToken);
  }

  const handlePayment = async (identityToken: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identity_token: identityToken,
          amount: ENTRY_PRICE,
          amusement_uuid: process.env.NEXT_PUBLIC_SELLER || "default-seller",
        }),
      });

      const data = await res.json();

      if (res.status === 401) {
        setShowUnauthorizedModal(true);
        return;
      }

      if (!res.ok) {
        setError({
          message: data.error?.message ?? "Payment failed",
          status: res.status,
        });
        return;
      }

      if (data.success) {
        router.push("/haunted-house");
      } else {
        setError({
          message: data.error?.message ?? "Payment failed",
          status: data.error?.status,
        });
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDevAccess = async () => {
    setDevAccessLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/access", { method: "POST" });

      if (!res.ok) {
        throw new Error("Could not create access cookie");
      }

      router.push("/haunted-house");
    } catch {
      setError({ message: "Dev access failed. Could not set cookie." });
    } finally {
      setDevAccessLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background — lowest layer */}
      <div className="absolute inset-0 bg-[url('/assets/images/Home-bg.png')] bg-cover bg-bottom" />
      <Bats />
      {/* Fog — above background */}
      <Fog />
      {/* Content — top layer */}
      <div className="relative z-20 flex flex-col w-full items-center">
        <h1 className="font-eater text-red-800 text-5xl leading-normal">
          Runtime terror
        </h1>
        <div className="flex flex-col h-full items-center self-start">
          <div className="bg-black/40 p-6 m-10 rounded flex flex-col w-100 ">
            <div className="flex items-start gap-2">
              <div className="flex flex-col gap-4">
                <h2 className="font-fell text-grey text-xl">
                  Are you a scaredy cat — or do you laugh in the face of horror?
                </h2>
                <h2 className="font-fell text-grey text-xl">
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
              <EnterForm
                onSubmit={handlePayment}
                identityToken={identityToken}
                isLoading={isLoading}
              />
              {error && (
                <p className="text-red-500 mt-4">Error: {error.message}</p>
              )}
            </div>
            {process.env.NODE_ENV !== "production" && (
              <button
                type="button"
                onClick={handleDevAccess}
                disabled={devAccessLoading}
                className="text-white underline mt-4 disabled:opacity-50"
              >
                {devAccessLoading ? "Setting dev access..." : "Enter house (dev cookie test)"}
              </button>
            )}
          </div>
        </div>
      </div>

      <UnauthorizedModal
        isOpen={showUnauthorizedModal}
        onClose={() => setShowUnauthorizedModal(false)}
      />
    </div>
  );
}
