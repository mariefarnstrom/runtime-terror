//Game state store using Zustand

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAudioStore } from "@/store/useAudioStore";
import { ROOM_AMBIENT, SOUND_MAP } from "@/lib/audio";
import { SoundId } from "@/lib/audio";

export type RoomId = "graveyard" | "dolls" | "spiders" | "clown";

export const ROOMS: RoomId[] = ["graveyard", "dolls", "spiders", "clown"];

interface GameStore {
  //state
  currentRoom: RoomId;
  isComplete: boolean;

  //actions
  goToNextRoom: () => void;
  completeGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>()(
  // Persist middleware saves the game state to localStorage, allowing the player to continue from the same room even after a page reload or when returning to the site later.
  persist(
    (set, get) => ({
      // Start values
      currentRoom: "graveyard",
      fearLevel: 0,
      isComplete: false,

      // Functions that uppdates state
      goToNextRoom: () => {
        const { currentRoom } = get();
        const nextIndex = ROOMS.indexOf(currentRoom) + 1;

        if (nextIndex < ROOMS.length) {
          const nextRoom = ROOMS[nextIndex];
          const nextAmbient = ROOM_AMBIENT[nextRoom];

          // Fade out all sounds except the next room's ambient
          const { instances } = useAudioStore.getState();
          const currentAmbient = useAudioStore.getState().currentAmbient;

          Object.entries(instances).forEach(([soundId, instance]) => {
            // Skip current and next ambient — handled by crossfade
            if (soundId === currentAmbient || soundId === nextAmbient) return;
            if (instance?.id !== undefined) {
              const config = SOUND_MAP[soundId as SoundId];
              const targetVolume = config.volume ?? 1;
              instance.howl.fade(targetVolume, 0, 1000, instance.id);
              instance.howl.once("fade", () => instance.howl.stop());
            }
          });

          set({ currentRoom: nextRoom });
        } else {
          set({ isComplete: true });
          const currentAmbient = useAudioStore.getState().currentAmbient;
          if (currentAmbient) {
            useAudioStore.getState().fadeOut(currentAmbient, 2000);
          }
        }
      },

      completeGame: () => set({ isComplete: true }),

      resetGame: () => {
        const currentAmbient = useAudioStore.getState().currentAmbient;
        if (currentAmbient) {
          useAudioStore.getState().stop(currentAmbient);
        }
        set({
          currentRoom: "graveyard",
          isComplete: false,
        });
      },
    }),
    {
      name: "haunted-house-room",
    },
  ),
);
