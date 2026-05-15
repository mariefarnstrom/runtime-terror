"use client";

import { motion } from "framer-motion";
import BatSprite from "./BatSprite";

interface BatProps {
  startX: string;
  startY: string;
  animateX: string[];
  animateY: string[];
  duration: number;
  depth: number; // 0 = far away, 1 = close
}

function Bat({
  startX,
  startY,
  animateX,
  animateY,
  duration,
  depth,
}: BatProps) {
  // Scale between 0.3 (far) and 1.2 (close)
  const scale = 0.3 + depth * 0.9;
  // Opacity between 0.4 (far) and 1 (close)
  const opacity = 0.4 + depth * 0.6;
  // Random delay between 0 and 0.6s (one full flap cycle)
  const flapDelay = Math.random() * 0.6;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: startX,
        top: startY,
        opacity,
        zIndex: Math.round(depth * 20),
        transformOrigin: "top left",
      }}
      animate={{ x: animateX, y: animateY, scale }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <BatSprite flapDelay={flapDelay} />
    </motion.div>
  );
}

export default function Bats() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Starts left of screen, flies across to right */}
      <Bat
        /* src="/assets/images/bat-in-medium-size-variant-silhouette-svgrepo-com.svg" */
        startX="0%"
        startY="0%"
        animateX={["-200px", "110vw"]}
        animateY={["400px", "-200px"]}
        duration={4}
        depth={1.2}
      />

      <Bat
        /*  src="/assets/images/bat-in-medium-size-variant-silhouette-svgrepo-com.svg" */
        startX="0%"
        startY="0%"
        animateX={["-200px", "110vw"]}
        animateY={["320px", "-280px"]}
        duration={5}
        depth={0.3}
      />

      <Bat
        /* src="/assets/images/bat-in-medium-size-variant-silhouette-svgrepo-com.svg" */
        startX="0%"
        startY="0%"
        animateX={["-200px", "110vw"]}
        animateY={["450px", "-150px"]}
        duration={6}
        depth={0.5}
      />
    </div>
  );
}
