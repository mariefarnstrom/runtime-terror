"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";

interface DoorTransitionProps {
  buttonText: string;
  doorImage?: string;
  animated?: boolean;
  positionClass?: string;
}

export default function DoorTransition({
  buttonText,
  doorImage,
  animated = true,
  positionClass = "bottom-45 left-1/2 -translate-x-1/2 md:bottom-35",
}: DoorTransitionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { goToNextRoom } = useGameStore();

  const handleClick = (): void => {
    if (animated) {
      setIsOpen(true);
      // Wait for animation to finish before going to next room
      setTimeout(goToNextRoom, 1200);
    } else {
      // For arrow mode, go to next room immediately
      goToNextRoom();
    }
  };

  return (
    <div
      style={{ perspective: "1200px" }}
      className={`absolute ${positionClass} flex flex-col items-center justify-center gap-4`}
    >
      {animated ? (
        <>
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
        </>
      ) : (
        /* Arrow mode - static display */
        <div
          onClick={handleClick}
          className="flex flex-col items-center justify-center gap-4 cursor-pointer group"
        >
          <div 
            className="text-6xl text-gray-400"
            style={{
              animation: "bounce-diagonal 1s infinite",
            }}
          >
            ↗
          </div>
          {doorImage && (
            <img src={doorImage} alt="" className="w-48 h-48 object-cover" />
          )}
        </div>
      )}

      <p
        className={`font-fell text-grey text-sm tracking-widest animate-pulse transition-opacity ${!animated || !isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        {buttonText}
      </p>
    </div>
  );
}
