import { useGameStore } from "@/store/useGameStore";

type DoorButtonProps = {
    buttonText: string;
}

export default function DoorButton({ buttonText }: DoorButtonProps) {
    const { /* increaseFear, */ goToNextRoom } = useGameStore();

    const handleDoorOpen = (): void => {
        /* increaseFear(20); */
        goToNextRoom();
    };

    return (
        <button onClick={handleDoorOpen} className="bg-red-800">
            {buttonText}
        </button>
    );
}