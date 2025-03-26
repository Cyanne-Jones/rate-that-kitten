// src/pages/Favorites.tsx
import React from 'react';
import './Favorites.css';
import useFavoriteStore from '../useFavoriteStore';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavoriteStore();

  return (
    <div className="favorites-container">
      <h1>Your Favorite Kittens</h1>
      <div className="favorites-grid">
        {favorites?.length > 0 ? (
          favorites.map((favorite, index) => (
            <div key={index} className="cat-image-container">
              <img src={favorite.url} alt={`Favorite kitten ${index + 1}`} className="cat-image" />
              <p><span className="descriptor-label">Cuteness Rating:</span> {favorite.cuteness}</p>
              <p><span className="descriptor-label">Would Pet:</span> {favorite.wouldPet ? 'Yes' : 'No'}</p>
              <p><span className="descriptor-label">Has Beans:</span> {favorite.hasBeans ? 'Yes' : 'No'}</p>
              <p><span className="descriptor-label">Descriptors:</span> {favorite.adjectives?.join(', ') || 'None'}</p>
              <button onClick={() => removeFavorite(favorite.url)}>Unfavorite</button>
            </div>
          ))
        ) : (
          <p>No favorite kittens yet!</p>
        )}
      </div>
      <button className="gray-button">
      <a href="/">Back to Home</a>
      </button>
    </div>
  );
};

export default Favorites;