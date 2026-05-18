"use client";
import Fog from "@/components/effects/Fog";
import DoorTransition from "@/components/shared/DoorTransition";
import ZombieHand from "@/components/rooms/room1/ZombieHand";
import { useState } from "react";

export default function Graveyard() {
  const [doorOpen, setDoorOpen] = useState(false);

  function handleDoorOpen() {
    setDoorOpen(true);
  }

  return (
    <div className="absolute inset-0 bg-[url('/assets/images/graveyard-night.png')] bg-cover bg-position-[center_left_-250px] md:bg-center">
      {/* <DoorButton buttonText="Enter the house" /> */}
      <Fog />
      <DoorTransition
        buttonText="Enter the house"
        doorImage="/assets/images/wooden-door.png"
        positionClass="bottom-90 right-10"
        sizeClass="h-40 w-24"
      />
      <ZombieHand 
      triggerOnMount={true}
      onEmergeComplete={handleDoorOpen} />
    </div>
  );
}
