// src/pages/Favorites.tsx
import React from 'react';
import './Favorites.css';
import useFavoriteStore from '../useFavoriteStore';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavoriteStore()

  return (
    <div className="favorites-container">
      <h1>Your Favorite Kittens</h1>
      <div className="favorites-grid">
        {favorites.length > 0 ? (
          favorites.map((url: string, index: number) => (
            <div key={index} className="cat-image-container">
              <img src={url} alt={`Favorite kitten ${index + 1}`} className="cat-image" />
              <button onClick={() => removeFavorite(url)}>Unfavorite</button>
            </div>
          ))
        ) : (
          <p>No favorite kittens yet!</p>
        )}
      </div>
      <a href="/" className="back-link">Back to Home</a>
    </div>
  );
};

export default Favorites;