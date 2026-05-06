//Example Room scene component
import { useGameStore } from "@/store/useGameStore";

// I Graveyard.tsx — når state direkt utan props
export default function Graveyard() {
  const { /* increaseFear, */ goToNextRoom } = useGameStore();

  const handleGateOpen = () => {
    /* increaseFear(20); */
    goToNextRoom();
  };

  return <button onClick={handleGateOpen}>Open the gate</button>;
}
