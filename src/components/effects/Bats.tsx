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
        startX="0%"
        startY="0%"
        animateX={["-200px", "110vw", "-200px"]}
        animateY={["500px", "-100px", "500px"]}
        duration={12}
        size={24}
      />
      {/* Starts left of screen, flies across to right */}
      <Bat
        src="/assets/images/bat-in-medium-size-variant-silhouette-svgrepo-com.svg"
        startX="0%"
        startY="0%"
        animateX={["-200px", "110vw", "-200px"]}
        animateY={["500px", "-100px", "500px"]}
        duration={10}
        size={24}
      />
      <Bat
        src="/assets/images/bat-svgrepo-com.svg"
        startX="0%"
        startY="0%"
        animateX={["-200px", "110vw", "-200px"]}
        animateY={["500px", "-100px", "500px"]}
        duration={9}
        size={24}
      />
      <Bat
        src="/assets/images/bat-in-medium-size-variant-silhouette-svgrepo-com.svg"
        startX="0%"
        startY="0%"
        animateX={["-200px", "110vw", "-200px"]}
        animateY={["500px", "-100px", "500px"]}
        duration={11}
        size={24}
      />
      <Bat
        src="/assets/images/bat-in-medium-size-variant-silhouette-svgrepo-com.svg"
        startX="0%"
        startY="0%"
        animateX={["-200px", "110vw", "-200px"]}
        animateY={["500px", "-100px", "500px"]}
        duration={9}
        size={24}
      />
      <Bat
        src="/assets/images/bat-in-medium-size-variant-silhouette-svgrepo-com.svg"
        startX="0%"
        startY="0%"
        animateX={["-200px", "110vw", "-200px"]}
        animateY={["500px", "-100px", "500px"]}
        duration={11}
        size={24}
      />
      <Bat
        src="/assets/images/bat-in-medium-size-variant-silhouette-svgrepo-com.svg"
        startX="0%"
        startY="0%"
        animateX={["-200px", "110vw", "-200px"]}
        animateY={["500px", "-100px", "500px"]}
        duration={8}
        size={24}
      />
      <Bat
        src="/assets/images/bat-in-medium-size-variant-silhouette-svgrepo-com.svg"
        startX="0%"
        startY="0%"
        animateX={["-200px", "110vw", "-200px"]}
        animateY={["500px", "-100px", "500px"]}
        duration={12}
        size={24}
      />
    </div>
  );
}
