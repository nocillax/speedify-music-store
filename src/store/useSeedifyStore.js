import { create } from "zustand";

const { VITE_DEFAULT_SEED, VITE_DEFAULT_LIKES, VITE_DEFAULT_LANGUAGE } =
  import.meta.env;

const API_BASE_URL = import.meta.env.DEV ? "http://localhost:3001" : "";

const useSeedifyStore = create((set, get) => ({
  seed: parseInt(VITE_DEFAULT_SEED) || 58933423,
  avgLikes: parseFloat(VITE_DEFAULT_LIKES) || 2.12,
  language: VITE_DEFAULT_LANGUAGE || "en",
  viewMode: "table",
  currentPage: 1,
  songsPerPage: 10,
  songs: [],
  expandedSongId: null,
  setSeed: (seed) => {
    set({ seed, currentPage: 1 });
    get().regenerateSongs();
  },

  setAvgLikes: (avgLikes) => {
    set({ avgLikes });
    get().regenerateSongs();
  },

  setLanguage: (language) => {
    set({ language, currentPage: 1 });
    get().regenerateSongs();
  },

  setViewMode: (viewMode) => {
    set({ viewMode, currentPage: 1 });
    get().regenerateSongs();
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
    get().regenerateSongs();
  },

  setExpandedSongId: (songId) => {
    set({ expandedSongId: songId });
  },

  generateRandomSeed: () => {
    const randomSeed = Math.floor(Math.random() * 9007199254740991);
    set({ seed: randomSeed, currentPage: 1 });
    get().regenerateSongs();
  },

  regenerateSongs: async () => {
    const { seed, currentPage, songsPerPage, avgLikes, language } = get();
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/songs?seed=${seed}&page=${currentPage}&songsPerPage=${songsPerPage}&avgLikes=${avgLikes}&language=${language}`
      );
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      set({ songs: data.songs });
    } catch (error) {
      console.error("Failed to fetch songs:", error);
      set({ songs: [] });
    }
  },

  initialize: () => get().regenerateSongs(),
}));

export default useSeedifyStore;
