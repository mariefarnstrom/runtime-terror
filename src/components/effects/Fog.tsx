"use client";

import { motion } from "framer-motion";

export default function Fog() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute bottom-0 left-0 w-[120%] h-32 bg-white/30 rounded-full blur-3xl"
        animate={{ x: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-8 left-0 w-full h-24 bg-white/5 rounded-full blur-2xl"
        animate={{ x: ["5%", "-5%", "5%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-4 right-0 w-3/4 h-20 bg-white/8 rounded-full blur-3xl"
        animate={{ x: ["0%", "-8%", "0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
