"use client";

import { motion } from "framer-motion";

interface BatProps {
  src: string;
  startX: string;
  startY: string;
  animateX: string[];
  animateY: string[];
  duration: number;
  size: number;
}

function Bat({
  src,
  startX,
  startY,
  animateX,
  animateY,
  duration,
  size,
}: BatProps) {
  return (
    <motion.div
      className="absolute"
      style={{ left: startX, top: startY }}
      animate={{ x: animateX, y: animateY }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      <img src={src} alt="" width={size} height={size} />
    </motion.div>
  );
}

export default function Bats() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Bat
        src="/assets/images/bat-with-raised-wings-svgrepo-com.svg"
        startX="65%"
        startY="20%"
        animateX={["-20%", "25%", "-20%"]}
        animateY={["0%", "-15%", "0%"]}
        duration={5}
        size={24}
      />
      <Bat
        src="/assets/images/bat-svgrepo-com (1).svg"
        startX="70%"
        startY="25%"
        animateX={["10%", "-25%", "10%"]}
        animateY={["-10%", "15%", "-10%"]}
        duration={4}
        size={18}
      />
      <Bat
        src="/assets/images/bat-svgrepo-com.svg"
        startX="75%"
        startY="18%"
        animateX={["-15%", "20%", "-15%"]}
        animateY={["5%", "-20%", "5%"]}
        duration={6}
        size={20}
      />
      <Bat
        src="/assets/images/bat-in-medium-size-variant-silhouette-svgrepo-com.svg"
        startX="68%"
        startY="28%"
        animateX={["15%", "-20%", "15%"]}
        animateY={["-8%", "12%", "-8%"]}
        duration={4.5}
        size={22}
      />
    </div>
  );
}
