"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import Image from "next/image";

type ZombieHandProps = {
  triggerOnMount: boolean;
  onEmergeComplete?: () => void;
};

const handVariants: Variants = {
  hidden: {
    y: 300,
    rotate: -8,
    opacity: 0,
  },
  emerge: {
    y: [160, 140, 90, 60, 50, 40, 10],
    rotate: [-8, -8, -12, -6, -6, -6, -6],
    opacity: [0, 1, 1, 1, 1, 1, 1],
    transition: {
      duration: 3.2,
      ease: "easeInOut",
      times: [0, 0.3, 0.45, 0.7, 0.85, 0.9, 1],
    },
  },
};

export default function ZombieHand({ triggerOnMount = false, onEmergeComplete }: ZombieHandProps) {
  const controls = useAnimation();
  const hasTriggered = useRef(false);

  const startAnimation = async () => {
    if (hasTriggered.current) return;

    hasTriggered.current = true;
    await controls.start("emerge");
    onEmergeComplete?.();
  };

  useEffect(() => {
    if (!triggerOnMount) return;

    const timeout = setTimeout(startAnimation, 1200);
    return () => clearTimeout(timeout);
  }, [triggerOnMount, startAnimation]);

  return (
    <div className="absolute top-[52%] left-[14%] z-30 w-32.5 h-32.5 overflow-hidden pointer-events-none">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={handVariants}
        aria-hidden="true"
      >
        <Image
          src="/assets/images/zombie-hand.png"
          alt="Zombie Hand"
          width={130}
          height={130}
          draggable={false}
          className="h-full w-full object-contain skew-1"
        />
      </motion.div>
    </div>
  );
}