//Game state store using Zustand

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAudioStore } from "@/store/useAudioStore";


export type RoomId = 'graveyard' | 'dolls' | 'spiders' | 'clown'

export const ROOMS: RoomId[] = ['graveyard', 'dolls', 'spiders', 'clown']

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
      currentRoom: 'graveyard',
      fearLevel: 0,
      isComplete: false,

      // Functions that uppdates state
      goToNextRoom: () => {
        const { currentRoom } = get();
        const nextIndex = ROOMS.indexOf(currentRoom) + 1;
        if (nextIndex < ROOMS.length) {
          set({ currentRoom: ROOMS[nextIndex] });
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
          currentRoom: 'graveyard',
          isComplete: false,
        });
      },
    }),
    {
      name: "haunted-house-room",

    }
  )
);
