"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";

interface SpiderDropProps {
  allWebsRemoved: boolean;
}

export default function SpiderDrop({ allWebsRemoved }: SpiderDropProps) {
  // Must be inside the component
  const dropDelay = useMemo(() => Math.random() * 3 + 1, []);

  return (
    <AnimatePresence>
      {allWebsRemoved && (
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-50"
          style={{ transformOrigin: "top center" }}
          initial={{ y: "-1000%", rotate: 0 }}
          animate={{
            y: ["-1000%", "-40vh"],
            rotate: [0.5, -1.5, 1.5, -1, 1, -0.5, 0.5, 0],
          }}
          transition={{
            y: {
              duration: 1.5,
              ease: "easeIn",
              delay: dropDelay,
            },
            rotate: {
              duration: 12,
              ease: "easeInOut",
              delay: dropDelay + 1.5,
              times: [0, 0.15, 0.35, 0.5, 0.65, 0.8, 0.9, 1],
            },
          }}
        >
          <Image
            src="/assets/images/spider2.png"
            alt=""
            width={300}
            height={300}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
