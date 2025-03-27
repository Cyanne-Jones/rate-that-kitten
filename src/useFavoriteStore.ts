// src/useFavoriteStore.ts
import { create } from 'zustand';

interface Favorite {
  url: string;
  cuteness: number;
  wouldPet: boolean;
  hasBeans: boolean;
  adjectives: string[];
}

interface FavoriteStore {
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (url: string) => void;
  updateFavorite: (url: string, newValues: Omit<Favorite, 'url'>) => void;
}

const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  addFavorite: (favorite) => set((state) => {
    const newFavorites = [...state.favorites, favorite];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    return { favorites: newFavorites };
  }),
  removeFavorite: (url) => set((state) => {
    const newFavorites = state.favorites.filter((favorite) => favorite.url !== url);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    return { favorites: newFavorites };
  }),
  updateFavorite: (url, newValues) => set((state) => {
    const newFavorites = state.favorites.map((favorite) => {
      if (favorite.url === url) {
        return { ...favorite, ...newValues };
      }
      return favorite;
    });
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    return { favorites: newFavorites };
  }),
}));

export default useFavoriteStore;