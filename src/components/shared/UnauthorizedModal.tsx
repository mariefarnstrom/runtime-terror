"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type UnauthorizedModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function UnauthorizedModal({ isOpen, onClose }: UnauthorizedModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="unauthorized-title"
        >
          <div className="relative max-w-md w-full bg-brown-dark border border-grey p-8 rounded">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-grey hover:text-white transition"
            >
              ✕
            </button>

            <h2
              id="unauthorized-title"
              className="font-glitch text-grey text-xl mb-4"
            >
              Payment not authorized
            </h2>
            <div className="flex flex-col gap-3">
              <p className="font-fell text-grey">
                Your token is expired or invalid. Please return to the main tivoli site and try again.
              </p>
            </div>
            <Link
                href="/"
                className="mt-6 inline-block text-red-800 underline focus-visible:outline-2 focus-visible:outline-red-500 focus-visible:outline-offset-4"
              >
                Return to main site
              </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
