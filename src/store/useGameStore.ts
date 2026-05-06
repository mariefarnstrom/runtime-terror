//Game state store using Zustand

import { create } from "zustand";

interface GameStore {
  //state
  currentRoomIndex: number;
  /* fearLevel: number; */
  isComplete: boolean;

  //actions
  goToNextRoom: () => void;
  /* increaseFear: (amount: number) => void; */
  completeGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  // Start values
  currentRoomIndex: 0,
  fearLevel: 0,
  isComplete: false,

  // Functions that uppdates state
  goToNextRoom: () =>
    set((state) => ({
      currentRoomIndex: state.currentRoomIndex + 1,
    })),

  /*  increaseFear: (amount) =>
    set((state) => ({
      fearLevel: Math.min(100, state.fearLevel + amount)
    })), */

  completeGame: () => set({ isComplete: true }),

  resetGame: () =>
    set({
      currentRoomIndex: 0,
      /* fearLevel: 0, */
      isComplete: false,
    }),
}));
