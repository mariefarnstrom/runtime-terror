//Zustand state to switch between the different rooms
"use client";

import { RoomId, useGameStore } from "@/store/useGameStore";
import Graveyard from "@/components/rooms/room1/Graveyard";
import Dolls from "@/components/rooms/room2/Dolls";
import Spiders from "@/components/rooms/room3/Spiders";
import Clown from "@/components/rooms/room4/Clown";
import { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";

const ROOMS: Record<RoomId, ComponentType> = {
  graveyard: Graveyard,
  dolls: Dolls,
  spiders: Spiders,
  clown: Clown
};


export default function HauntedHousePage() {
  const router = useRouter();
  const currentRoom = useGameStore(s => s.currentRoom);
  const isComplete = useGameStore(s => s.isComplete);
  const CurrentRoom = ROOMS[currentRoom];

  useEffect(() => {
    if (isComplete) {
      router.push("/haunted-house/end");
    }
  }, [isComplete, router]);

  return <CurrentRoom key={currentRoom} />;
}
