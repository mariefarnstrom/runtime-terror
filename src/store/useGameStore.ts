//Game state store using Zustand

import { create } from "zustand";
import { useAudioStore } from "@/store/useAudioStore";


export type RoomId = 'graveyard' | 'dolls' | 'spiders' | 'clown'

export const ROOMS: RoomId[] = ['graveyard', 'dolls', 'spiders', 'clown']

interface GameStore {
  //state
  currentRoom: RoomId;
  /* fearLevel: number; */
  isComplete: boolean;

  //actions
  goToNextRoom: () => void;
  /* increaseFear: (amount: number) => void; */
  completeGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
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

  /*  increaseFear: (amount) =>
    set((state) => ({
      fearLevel: Math.min(100, state.fearLevel + amount)
    })), */

  completeGame: () => set({ isComplete: true }),

  resetGame: () => {
    const currentAmbient = useAudioStore.getState().currentAmbient;
    if (currentAmbient) {
      useAudioStore.getState().stop(currentAmbient);
    }
    set({
      currentRoom: 'graveyard',
      /* fearLevel: 0, */
      isComplete: false,
    });
  },
}));
