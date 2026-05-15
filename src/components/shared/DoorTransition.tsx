"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { createPortal } from "react-dom";

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
  const [fadeState, setFadeState] = useState<"idle" | "fadingOut" | "fadingIn">("idle");
  const [mounted, setMounted] = useState(false);
  const { goToNextRoom } = useGameStore();

  const DOOR_ANIMATION_DURATION = animated ? 1200 : 0;
  const FADE_OUT_DURATION = 800;
  const FADE_IN_DURATION = 800;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (): void => {
    setIsOpen(true);

    // Wait for door animation before starting room transition
    setTimeout(() => {
      // Fade OUT current room
      setFadeState("fadingOut");

      // After fade out completes
      setTimeout(() => {
        goToNextRoom();

        // Fade IN new room
        setFadeState("fadingIn");

        // Remove overlay after fade in
        setTimeout(() => {
          setFadeState("idle");
        }, FADE_IN_DURATION);

      }, FADE_OUT_DURATION);

    }, DOOR_ANIMATION_DURATION);

  };

  return (
    <>
      {/* Fade overlay rendered to body as portal */}
      {mounted && fadeState !== "idle" &&
        createPortal(
          <motion.div
            initial={{
              opacity: fadeState === "fadingOut" ? 0 : 1
            }}
            animate={{
              opacity: fadeState === "fadingOut" ? 1 : 0
            }}

            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
            className="fixed inset-0 bg-black pointer-events-none"
            style={{ zIndex: 9999 }}
          />,
          document.body
        )
      }

      <div
        style={{ perspective: "1200px" }}
        className={`absolute ${positionClass} flex flex-col items-center justify-center gap-4`}
      >
        {animated ? (
          <>
            {/* Background visible behind door when it opens */}
            <div className="absolute inset-2 w-40 h-75 bg-black bg-cover bg-center" />

            <motion.button
              onClick={!isOpen ? handleClick : undefined}
              aria-label="Go to next room"
              animate={{ rotateY: isOpen ? -110 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
              }}
              className="relative w-48 h-80 cursor-pointer"
            >
              {doorImage ? (
                <img src={doorImage} alt="Door" className="w-full h-full object-cover" />
              ) : (
                // CSS door fallback
                <div className="absolute inset-0 bg-linear-to-b from-stone-900 to-stone-950 border-2 border-stone-700 rounded-t-lg flex flex-col items-center justify-center gap-6">
                  <div className="w-36 h-24 border border-stone-700 rounded opacity-40" />
                  <div className="w-36 h-32 border border-stone-700 rounded opacity-40" />
                  <div className="absolute right-4 top-1/2 w-3 h-3 rounded-full bg-yellow-700" />
                </div>
              )}
            </motion.button>
          </>
        ) : (
          /* Arrow mode - static display */
          <button
            onClick={handleClick}
            aria-label="Go to next room"
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
              <img src={doorImage} alt="Room entrance" className="w-48 h-48 object-cover" />
            )}
          </button>
        )}

        <p
          className={`font-fell text-grey text-sm tracking-widest animate-pulse transition-opacity ${!animated || !isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          {buttonText}
        </p>
      </div>
    </>
  );
}
