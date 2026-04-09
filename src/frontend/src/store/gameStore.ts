import { create } from "zustand";

interface GameState {
  currentTab: string;
  favorites: string[];
  isMusicPlaying: boolean;
  audioContext: AudioContext | null;
  setTab: (tab: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  setMusicPlaying: (playing: boolean) => void;
  setAudioContext: (ctx: AudioContext | null) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentTab: "home",
  favorites: [],
  isMusicPlaying: false,
  audioContext: null,

  setTab: (tab) => set({ currentTab: tab }),

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id],
    })),

  isFavorite: (id) => get().favorites.includes(id),

  setMusicPlaying: (playing) => set({ isMusicPlaying: playing }),

  setAudioContext: (ctx) => set({ audioContext: ctx }),
}));
