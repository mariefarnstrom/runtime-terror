import { useAudioStore } from "@/store/useAudioStore";
import { useEffect } from "react";
import { EffectSoundId } from "@/lib/audio";

type Props = {
  effect: EffectSoundId
}

export function useEffectSounds({ effect }: Props) {
    const play = useAudioStore((state) => state.play)

    const trigger = () => {
        play(effect)
    }

    return trigger
}
