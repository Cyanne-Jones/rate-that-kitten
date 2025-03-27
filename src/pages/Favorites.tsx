// src/pages/Favorites.tsx
import { useState } from 'react';
import './Favorites.css';
import useFavoriteStore from '../useFavoriteStore';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites, removeFavorite, updateFavorite } = useFavoriteStore();
  
  // State for filters and sorting
  const [filterWouldPet, setFilterWouldPet] = useState<string | null>(null);
  const [filterHasBeans, setFilterHasBeans] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('asc'); // 'asc' for low to high, 'desc' for high to low
  const [showFilters, setShowFilters] = useState<boolean>(false); // State to toggle filter visibility
  const [editingFavorite, setEditingFavorite] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<{
    cuteness: number;
    wouldPet: boolean;
    hasBeans: boolean;
    adjectives: string[];
  }>({
    cuteness: 5,
    wouldPet: true,
    hasBeans: false,
    adjectives: [],
  });

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

  const handleEditClick = (favorite: any) => {
    if (editingFavorite === favorite.url) {
      // If the clicked favorite is already being edited, close the menu
      setEditingFavorite(null);
    } else {
      // Otherwise, open the menu for the clicked favorite
      setEditingFavorite(favorite.url);
      setEditedValues({
        cuteness: favorite.cuteness,
        wouldPet: favorite.wouldPet,
        hasBeans: favorite.hasBeans,
        adjectives: favorite.adjectives,
      });
    }
    console.log(editingFavorite);
  };

  const handleSaveClick = () => {
    if (editingFavorite) {
      updateFavorite(editingFavorite, editedValues);
      setEditingFavorite(null);
    }
  };

  const handleCancelClick = () => {
    setEditingFavorite(null);
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setEditedValues(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : type === 'checkbox' ? checked : value,
    }));
  };

  const handleAdjectiveChange = (adjective: string) => {
    setEditedValues((prev) => ({
      ...prev,
      adjectives: prev.adjectives.includes(adjective)
        ? prev.adjectives.filter((a) => a !== adjective)
        : [...prev.adjectives, adjective],
    }));
  };

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
              <div className="button-container">
                <button className="unfavorite" onClick={() => removeFavorite(favorite.url)}>Remove</button>
                <button className="toggle-filters-button" onClick={() => handleEditClick(favorite)}>Edit</button>
              </div>
            </div>
          ))
        )}
      </div>
      {editingFavorite && (
        <div className="edit-container">
          <div className="edit-form">
            <h3>Edit Rating</h3>
            <img src={editingFavorite} alt={`Favorite kitten`} className="cat-image" />
            <label>
            Cuteness:
            <input
              type="number"
              name="cuteness"
              value={editedValues.cuteness}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Would Pet:
            <input
              type="checkbox"
              name="wouldPet"
              checked={editedValues.wouldPet}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Has Beans:
            <input
              type="checkbox"
              name="hasBeans"
              checked={editedValues.hasBeans}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Descriptors:
            {["Babiest baby", "Certified Thicc Chungus", "That's a damn fine cat", "Let me love you"].map((adjective) => (
              <label>
                <input
                  type="checkbox"
                  className="adjective-checkbox"
                  checked={editedValues.adjectives?.includes(adjective)}
                  onChange={() => handleAdjectiveChange(adjective)}
                />
                {adjective}
              </label>
            ))}
          </label>
          <div className="button-container">
            <button className="sort-button" onClick={handleSaveClick}>Save</button>
            <button className="sort-button" onClick={handleCancelClick}>Cancel</button>
          </div>
          </div>
        </div>
      )}
      {sortedFavorites.length === 0 ? (
            <p>No favorite kittens yet!</p>
        ) : (<button className="gray-button">
        <Link to="/">Back to Home</Link>
      </button>)}
    </div>
    
  );
};

export default Favorites;