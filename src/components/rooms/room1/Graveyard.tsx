//Example Room scene component
"use client";
import { useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";
import { Howl } from "howler";
import DoorButton from "@/components/shared/Button";

export default function Graveyard() {

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
    <div className="absolute inset-0 bg-[url('/assets/images/graveyard.png')] bg-cover">
      <DoorButton buttonText="Enter the house" />
    </div>
  );
}
