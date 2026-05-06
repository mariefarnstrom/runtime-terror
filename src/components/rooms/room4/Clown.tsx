import { useGameStore } from "@/store/useGameStore";

export default function Clown() {
  const { /* increaseFear, */ goToNextRoom } = useGameStore();

  const handleGateOpen = (): void => {
    /* increaseFear(20); */
    goToNextRoom();
  };

  return <button onClick={handleGateOpen}>Open the gate</button>;
}
