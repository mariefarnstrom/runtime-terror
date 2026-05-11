//Example Room scene component
"use client";
import DoorButton from "@/components/shared/Button";

export default function Graveyard() {
  return (
    <div className="absolute inset-0 bg-[url('/assets/images/graveyard-night.png')] bg-cover bg-top-left">
      <DoorButton buttonText="Enter the house" />
    </div>
  );
}
