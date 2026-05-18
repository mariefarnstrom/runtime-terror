"use client";
import Fog from "@/components/effects/Fog";
import DoorTransition from "@/components/shared/DoorTransition";
import Image from "next/image";

export default function Graveyard() {
  return (
    <div className="absolute inset-0 bg-[url('/assets/images/graveyard-night.png')] bg-cover bg-top-left">
      {/* <DoorButton buttonText="Enter the house" /> */}
      <Fog />
      <DoorTransition
        buttonText="Open the door"
        doorImage="/assets/images/wooden-door.png"
        positionClass="bottom-120 left-1/2 -translate-x-1/2"
      />
      <Image
        src="/assets/images/zombie-hand.png"
        alt="Zombie Hand"
        width={200}
        height={200}
        className="absolute bottom-15 right-15 skew-2"
      />
    </div>
  );
}
