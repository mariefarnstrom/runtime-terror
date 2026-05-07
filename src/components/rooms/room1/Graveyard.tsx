//Example Room scene component
"use client";
import { useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";
import { Howl } from "howler";

// I Graveyard.tsx — når state direkt utan props
export default function Graveyard() {
  const { /* increaseFear, */ goToNextRoom } = useGameStore();

  const handleGateOpen = (): void => {
    /* increaseFear(20); */
    goToNextRoom();
  };

  useEffect(() => {
    const sound = new Howl({
      src: ["/assets/audio/ambient/howlingWind.mp3"],
      loop: true,
      autoplay: false,
    });
    sound.play();
    return () => {
      sound.stop();
      sound.unload();
    };
  }, []);

  return (
    <div>
      <button onClick={handleGateOpen}>Open the gate</button>
    </div>
  );
}
