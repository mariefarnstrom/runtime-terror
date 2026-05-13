'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { TIVOLI_MODE } from "@/lib/gameConfig";
import { useGameStore } from "@/store/useGameStore";

export default function EndPage() {
  const router = useRouter();

  const handleTivoliReturn = () => {
    useGameStore.getState().resetGame();
    // TODO: Replace with actual tivoli site URL and 
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Congratulations! You've escaped the Hunted House!</h1>

      {TIVOLI_MODE ? (
        <button
          onClick={handleTivoliReturn}
          className="text-red-800 underline mt-4 px-4 py-2 hover:opacity-80"
        >
          Back to Tivoli
        </button>
      ) : (
        <Link href="/" className="text-red-800 underline mt-4">
          Play again
        </Link>
      )}
    </div>
  );
}