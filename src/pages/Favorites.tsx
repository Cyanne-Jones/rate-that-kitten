// src/pages/Favorites.tsx
import { useState } from 'react';
import './Favorites.css';
import useFavoriteStore from '../useFavoriteStore';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavoriteStore();
  
  // State for filters and sorting
  const [filterWouldPet, setFilterWouldPet] = useState<string | null>(null);
  const [filterHasBeans, setFilterHasBeans] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('asc'); // 'asc' for low to high, 'desc' for high to low
  const [showFilters, setShowFilters] = useState<boolean>(false); // State to toggle filter visibility

  // Filter and sort favorites
  const filteredFavorites = favorites.filter(favorite => {
    const wouldPetMatch = filterWouldPet === null || (filterWouldPet === 'yes' ? favorite.wouldPet : !favorite.wouldPet);
    const hasBeansMatch = filterHasBeans === null || (filterHasBeans === 'yes' ? favorite.hasBeans : !favorite.hasBeans);
    return wouldPetMatch && hasBeansMatch;
  });

  const sortedFavorites = filteredFavorites.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.cuteness - b.cuteness; // Low to high
    } else {
      return b.cuteness - a.cuteness; // High to low
    }
  });

  return (
    <div className="favorites-container">
      <h1>Your Favorite Kittens</h1>

      {/* Buttons for Navigation and Toggle Filters */}
      <div className="button-container">
        {sortedFavorites.length > 0 && <button 
          className="toggle-filters-button" 
          onClick={() => setShowFilters(prev => !prev)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>}
        <button className="gray-button">
          <a href="/">Back to Home</a>
        </button>
      </div>

      {/* Filter and Sort Options */}
      {showFilters && (
        <div className="filter-sort-container">
          <div className="filter-container">
            <h2>Filter by:</h2>
            <div className="radio-container">
              <div id="wouldPet">
                <h4>Would Pet:</h4>
                <label>
                  <input 
                    type="radio" 
                    name="wouldPet" 
                    value="yes" 
                    checked={filterWouldPet === 'yes'} 
                    onChange={() => setFilterWouldPet('yes')} 
                  /> Yes
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="wouldPet" 
                    value="no" 
                    checked={filterWouldPet === 'no'} 
                    onChange={() => setFilterWouldPet('no')} 
                  /> No
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="wouldPet" 
                    value="" 
                    checked={filterWouldPet === null} 
                    onChange={() => setFilterWouldPet(null)} 
                  /> All
                </label>
              </div>
              <div id="hasBeans">
                <h4>Has Beans:</h4>
                <label>
                  <input 
                    type="radio" 
                    name="hasBeans" 
                    value="yes" 
                    checked={filterHasBeans === 'yes'} 
                    onChange={() => setFilterHasBeans('yes')} 
                  /> Yes
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="hasBeans" 
                    value="no" 
                    checked={filterHasBeans === 'no'} 
                    onChange={() => setFilterHasBeans('no')} 
                  /> No
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="hasBeans" 
                    value="" 
                    checked={filterHasBeans === null} 
                    onChange={() => setFilterHasBeans(null)} 
                  /> All
                </label>
              </div>
            </div>
          </div>

          <div className="sort-container">
            <h2>Sort by Cuteness:</h2>
            <div className="radio-container">
            <button 
              className={`sort-button ${sortOrder === 'asc' ? 'active' : ''}`} 
              onClick={() => setSortOrder('asc')}
            >
              Low to High
            </button>
            <button 
              className={`sort-button ${sortOrder === 'desc' ? 'active' : ''}`} 
              onClick={() => setSortOrder('desc')}
            >
              High to Low
            </button>
            </div>
          </div>
        </div>
      )}

      <div className="favorites-grid">
        {sortedFavorites.length > 0 && (
          sortedFavorites.map((favorite, index) => (
            <div key={index} className="cat-image-container">
              <img src={favorite.url} alt={`Favorite kitten ${index + 1}`} className="cat-image" />
              <p><span className="descriptor-label">Cuteness Rating:</span> {favorite.cuteness}</p>
              <p><span className="descriptor-label">Would Pet:</span> {favorite.wouldPet ? 'Yes' : 'No'}</p>
              <p><span className="descriptor-label">Has Beans:</span> {favorite.hasBeans ? 'Yes' : 'No'}</p>
              <p><span className="descriptor-label">Descriptors:</span> {favorite.adjectives?.join(', ') || 'None'}</p>
              <button className="unfavorite" onClick={() => removeFavorite(favorite.url)}>Unfavorite</button>
            </div>
          ))
        )}
      </div>
      {sortedFavorites.length === 0 ? (
            <p>No favorite kittens yet!</p>
        ) : (<button className="gray-button">
        <a href="/">Back to Home</a>
      </button>)}
      
    </div>
    
  );
};

export default Favorites;