//Example Room scene component
"use client";
import DoorButton from "@/components/shared/DoorTransition";
import DoorTransition from "@/components/shared/DoorTransition";

export default function Graveyard() {
  return (
    <div className="absolute inset-0 bg-[url('/assets/images/graveyard-night.png')] bg-cover bg-top-left">
      {/* <DoorButton buttonText="Enter the house" /> */}
      // Dolls — old wooden door
      <DoorTransition
        buttonText="Open the door"
        doorImage="/assets/images/wooden-door.png"
      />
    </div>
  );
}
