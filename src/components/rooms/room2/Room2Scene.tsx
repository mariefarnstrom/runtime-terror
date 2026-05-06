//Example Room scene component

import { useGameStore } from "@/store/useGameStore";

// I Dolls.tsx — når state direkt utan props
export default function Dolls() {
  const { /* increaseFear, */ goToNextRoom } = useGameStore();

  const handleDoorOpen = () => {
    /* increaseFear(20); */
    goToNextRoom();
  };

  return <button onClick={handleDoorOpen}>Open the door</button>;
}
