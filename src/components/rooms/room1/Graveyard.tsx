//Example Room scene component
"use client";
import DoorButton from "@/components/shared/Button";

export default function Graveyard() {

  return (
    <div className="absolute inset-0 bg-[url('/assets/images/graveyard.png')] bg-cover">
      <DoorButton buttonText="Enter the house" />
    </div>
  );
}
