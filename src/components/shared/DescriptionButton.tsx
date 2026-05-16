"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DescriptionButtonProps {
  description: string;
}

export default function DescriptionButton({
  description,
}: DescriptionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-50 flex items-start gap-2">
      {/* Description box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-red-dark/90 border border-white text-white font-fell text-xl p-4 rounded max-w-60"
            role="tooltip"
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Room description"
        aria-expanded={isOpen}
        className="w-8 h-8 rounded-full border border-white text-white font-fell flex items-center justify-center bg-red-dark/80 shrink-0"
      >
        ?
      </button>
    </div>
  );
}
