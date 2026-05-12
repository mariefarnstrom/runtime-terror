"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";

interface DoorTransitionProps {
  buttonText: string;
  doorImage?: string;
}

export default function DoorTransition({
  buttonText,
  doorImage,
}: DoorTransitionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { goToNextRoom } = useGameStore();

  const handleClick = (): void => {
    setIsOpen(true);
    // Wait for animation to finish before going to next room
    setTimeout(goToNextRoom, 1200);
  };

  return (
    <div
      style={{ perspective: "1200px" }}
      className="absolute bottom-45 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-4
      md:bottom-35"
    >
      {/* Background visible behind door when it opens */}
      <div className="absolute inset-2 w-40 h-75 bg-black bg-cover bg-center" />

      <motion.div
        onClick={!isOpen ? handleClick : undefined}
        animate={{ rotateY: isOpen ? -110 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          transformOrigin: "left center",
          transformStyle: "preserve-3d",
        }}
        className="relative w-48 h-80 cursor-pointer"
      >
        {doorImage ? (
          <img src={doorImage} alt="" className="w-full h-full object-cover" />
        ) : (
          // CSS door fallback
          <div className="absolute inset-0 bg-linear-to-b from-stone-900 to-stone-950 border-2 border-stone-700 rounded-t-lg flex flex-col items-center justify-center gap-6">
            <div className="w-36 h-24 border border-stone-700 rounded opacity-40" />
            <div className="w-36 h-32 border border-stone-700 rounded opacity-40" />
            <div className="absolute right-4 top-1/2 w-3 h-3 rounded-full bg-yellow-700" />
          </div>
        )}
      </motion.div>

      {!isOpen && (
        <p className="font-fell text-grey text-sm tracking-widest animate-pulse">
          {buttonText}
        </p>
      )}
    </div>
  );
}
