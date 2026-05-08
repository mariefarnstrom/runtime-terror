"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function RockingChair() {
  return (
    <motion.div
      className="absolute bottom-10 left-20"
      animate={{ rotate: [-3, 3, -3] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ originY: 1 }}
    >
      <Image
        src="/assets/images/rocking-doll.png"
        alt=""
        width={200}
        height={200}
      />
    </motion.div>
  );
}
