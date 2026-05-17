/* import DoorButton from "@/components/shared/DoorTransition";

export default function Clown() {
  return (
    <div className="absolute inset-0 bg-[url('/assets/images/clown.png')] bg-cover">
      <DoorButton buttonText="Exit house" />
    </div>
  );
} */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DoorTransition from "@/components/shared/DoorTransition";
import { useAudioStore } from "@/store/useAudioStore";

type Balloon = {
  id: number;
  x: number;
  y: number;
};

const MAX_MISSED = 5; // Clown fills screen after 5 missed balloons

export default function Clown() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [missed, setMissed] = useState(0);
  const [clownVisible, setClownVisible] = useState(false);
  const [isDoorVisible, setIsDoorVisible] = useState(false);
  const { play } = useAudioStore();

  // Spawn a new balloon every few seconds
  // Stop spawning balloons when door is visible
  useEffect(() => {
    if (clownVisible || isDoorVisible) return;

    const interval = setInterval(() => {
      const newBalloon: Balloon = {
        id: Date.now(),
        x: Math.random() * 80 + 10, // 10–90% from left
        y: Math.random() * 70 + 10, // 10–80% from top
      };
      setBalloons((prev) => [...prev, newBalloon]);

      // Auto-remove balloon after 3 seconds if not clicked
      setTimeout(() => {
        setBalloons((prev) => prev.filter((b) => b.id !== newBalloon.id));
        setMissed((prev) => {
          const next = prev + 1;
          if (next >= MAX_MISSED) {
            setClownVisible(true);
          }
          return next;
        });
      }, 3000);
    }, 2000);

    return () => clearInterval(interval);
  }, [clownVisible, isDoorVisible]);

  const handleBalloonClick = (id: number): void => {
    play("danger");
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  const handleClownDone = (): void => {
    setClownVisible(false);
    setIsDoorVisible(true);
  };

  // Clown scale based on missed balloons
  const clownScale = 0.1 + (missed / MAX_MISSED) * 0.5;

  return (
    <div className="absolute inset-0 bg-black ">
      {/* Clown — grows with each missed balloon */}
      <motion.img
        src="/assets/images/clown1.png"
        alt=""
        className="absolute bottom-1/4 translate-x-1/2 max-w-full max-h-full object-contain md:bottom-0 left-1/2 translate-none"
        animate={{
          scale: clownVisible ? 2 : clownScale,
          opacity: missed > 0 ? 1 : 0,
          // Slide off screen to the right when door is visible
          x: isDoorVisible ? "100vw" : "-50%",
        }}
        transition={{
          duration: isDoorVisible ? 1 : clownVisible ? 2 : 0.5,
          ease: "easeInOut",
        }}
        onAnimationComplete={() => {
          if (clownVisible && !isDoorVisible) {
            play("clown-laugh");
            // Show door after clown fills screen
            setTimeout(handleClownDone, 3000);
          }
        }}
      />

      {/* Balloons */}
      <AnimatePresence>
        {balloons.map((balloon) => (
          <motion.button
            key={balloon.id}
            onClick={() => handleBalloonClick(balloon.id)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            style={{ left: `${balloon.x}%`, top: `${balloon.y}%` }}
            className="absolute text-5xl cursor-pointer"
            aria-label="Pop balloon"
          >
            <img
              src="/assets/images/balloon3.png"
              alt=""
              width={80}
              height={80}
            />
          </motion.button>
        ))}
      </AnimatePresence>

      {isDoorVisible && <DoorTransition buttonText="Escape..." />}
    </div>
  );
}
