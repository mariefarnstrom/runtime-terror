"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HelpOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Help button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Help"
        className="w-8 h-8 rounded-full border border-grey text-grey font-fell flex items-center justify-center cursor-pointer"
      >
        ?
      </button>

      {/* Overlay */}
      {/* Uses AnimatePresence to wait for exit animation to finish before unmounting */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-title"
          >
            <div className="relative max-w-md w-full bg-brown-dark border border-grey p-8 rounded">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close help"
                className="absolute top-4 right-4 text-grey"
              >
                ✕
              </button>

              <h2
                id="help-title"
                className="font-glitch text-grey text-xl mb-4"
              >
                How to play
              </h2>
              <div className="flex flex-col gap-3">
                <p className="font-fell text-grey">
                  Enter your user ID to buy a ticket and enter the haunted
                  house.
                </p>

                <p className="font-fell text-grey">
                  Make your way through each room and see how scared you really
                  are.
                </p>

                <p className="font-fell text-grey">
                  Click on objects to interact with them.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
