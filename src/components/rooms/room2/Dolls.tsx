import RockingChair from "@/components/effects/RockingChair";
import DoorTransition from "@/components/shared/DoorTransition";
import { useEffect } from "react";
import { useAudioStore } from "@/store/useAudioStore";
import { useGameStore } from "@/store/useGameStore";

export default function Dolls() {
  //Example of how to use the useEffectSounds hook
  /* const trigger = useEffectSounds({ effect: "jumpscare-piano" }); */
  const { play } = useAudioStore();
  const currentRoom = useGameStore((s) => s.currentRoom);

  useEffect(() => {
    if (currentRoom !== "dolls") return;

    const interval = setInterval(() => {
      const shouldPlay = Math.random() < 0.4;

      if (shouldPlay) {
        play("doll-laugh");
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [currentRoom, play]);

  return (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat
      bg-[url('/assets/images/dolls-bg.jpg')]"
    >
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <RockingChair />

      {/* Spiders — cellar door */}
      <DoorTransition
        buttonText="Go further"
        doorImage="/assets/images/cellar-door.png"
      />
    </div>
  );
}
