"use client";

import { useAudioStore } from "@/store/useAudioStore";

interface MuteButtonProps {
    positionClass?: string;
}

export default function MuteButton({
    positionClass = "right-4",
}: MuteButtonProps) {
    const { isMuted, setMuted } = useAudioStore();

    const toggleMute = () => {
        setMuted(!isMuted);
    };

    return (
        <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            className={`text-white text-xl hover:opacity-70 transition-opacity z-1000 fixed top-4 ${positionClass}`}
        >
            {isMuted ? "🔇" : "🔊"}
        </button>
    );
}