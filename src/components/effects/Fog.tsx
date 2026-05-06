"use client";

import { motion } from "framer-motion";

export default function Fog() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Slow diagonal drift from bottom left */}
      <motion.div
        className="absolute bottom-0 left-0 w-[140%] h-32 bg-white/30 rounded-full blur-3xl"
        animate={{ x: ["-50%", "30%", "-50%"], y: ["0%", "-5%", "0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Drifts in from right, rises slightly */}
      <motion.div
        className="absolute bottom-12 right-0 w-full h-24 bg-white/30 rounded-full blur-2xl"
        animate={{ x: ["20%", "-30%", "20%"], y: ["0%", "-8%", "0%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Mid layer, opposite diagonal */}
      <motion.div
        className="absolute bottom-24 left-0 w-3/4 h-20 bg-white/20 rounded-full blur-3xl"
        animate={{ x: ["-40%", "15%", "-40%"], y: ["0%", "6%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Top layer drifts in from right */}
      <motion.div
        className="absolute bottom-16 right-0 w-2/3 h-28 bg-white/50 rounded-full blur-3xl"
        animate={{ x: ["15%", "-35%", "15%"], y: ["-4%", "4%", "-4%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-36 left-0 w-[140%] h-32 bg-white/30 rounded-full blur-3xl"
        animate={{ x: ["-50%", "30%", "-50%"], y: ["0%", "-5%", "0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
