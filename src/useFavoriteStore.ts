// src/useFavoriteStore.ts
import { create } from 'zustand';

interface FavoriteStore {
  favorites: string[];
  addFavorite: (url: string) => void;
  removeFavorite: (url: string) => void;
}

const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  addFavorite: (url) => set((state) => {
    const newFavorites = [...state.favorites, url];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    return { favorites: newFavorites };
  }),
  removeFavorite: (url) => set((state) => {
    const newFavorites = state.favorites.filter((favorite) => favorite !== url);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    return { favorites: newFavorites };
  }),
}));

export default useFavoriteStore;