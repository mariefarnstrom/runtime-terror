//Zustand state to switch between the different rooms
"use client";

import { useGameStore } from "@/store/useGameStore";
import Graveyard from "@/components/rooms/room1/Room1Scene";
import Dolls from "@/components/rooms/room2/Room2Scene";
/* export default function HuntedHouse() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Hunted House</h1>
    </div>
  );
} */

// I haunted-house/page.tsx
export default function HauntedHousePage() {
  const { currentRoomIndex, goToNextRoom } = useGameStore();

  const rooms = [Graveyard, Dolls /* Heights, Clown */];
  const CurrentRoom = rooms[currentRoomIndex];

  return <CurrentRoom />;
}
