"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAudioStore } from "@/store/useAudioStore";

const phrases = [
  "I've been waiting for you...",
  "Do you want to play?",
  "Don't leave me alone...",
];

export default function RockingChair() {
  const [isTalking, setIsTalking] = useState(false);
  const [isJumpscare, setIsJumpscare] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const { play, fadeIn, stop } = useAudioStore();

  useEffect(() => {
    fadeIn("music-box", 2000);
    return () => stop("music-box");
  }, []);

  const handleClick = (): void => {
    const willJumpscare = Math.random() < 0.3;

    if (willJumpscare) {
      play("loud-jumpscare");
      setIsJumpscare(true);
      setTimeout(() => setIsJumpscare(false), 1000);
    } else {
      play("doll-voice");
      setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
      setIsTalking(true);
      setTimeout(() => setIsTalking(false), 3000);
    }
  };

  return (
    <>
      {/* Jumpscare */}
      <AnimatePresence>
        {isJumpscare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.05 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <img
              src="/assets/images/jumpscare-face.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-15 left-1/2 -translate-x-1/2 cursor-pointer"
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ originY: 1 }}
        onClick={handleClick}
      >
        {/* Speech bubble */}
        <AnimatePresence>
          {isTalking && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-black text-sm px-4 py-2 rounded-lg whitespace-nowrap font-fell"
            >
              {currentPhrase}
            </motion.div>
          )}
        </AnimatePresence>

        <Image
          className="items-center"
          src="/assets/images/rocking-doll.png"
          alt=""
          width={200}
          height={200}
        />

        {/* Click prompt */}
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center text-grey text-xs font-fell tracking-widest mt-2"
        >
          Click me...
        </motion.p>
      </motion.div>
    </>
  );
}
