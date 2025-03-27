import { useState, useEffect } from 'react';
import './Home.css';
import useFavoriteStore from '../useFavoriteStore';
import JSConfetti from 'js-confetti';
import { useNavigate } from 'react-router-dom';

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

const Home = () => {
  const [catImage, setCatImage] = useState<CatImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const [cuteness, setCuteness] = useState<number>(5);
  const [wouldPet, setWouldPet] = useState<boolean>(true);
  const [hasBeans, setHasBeans] = useState<boolean>(false);
  const [selectedAdjectives, setSelectedAdjectives] = useState<string[]>([]);
  const confetti = new JSConfetti();
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const [newAdjective, setNewAdjective] = useState('');

  const getIsScreenSmall = (): boolean => {
    return window.innerWidth <= 768;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(getIsScreenSmall());
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on component mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(getIsScreenSmall());

  useEffect(() => {
    const fetchCatImage = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?size=med');
        if (!response.ok) {
          throw new Error('Failed to fetch cat image');
        }
        const data = await response.json();
        setCatImage(data[0]);
      } catch (err) {
        console.error('Error fetching cat image:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCatImage();
  }, []);

  const resetState = () => {
    setCuteness(5);
    setWouldPet(true);
    setHasBeans(false);
    setSelectedAdjectives([]);
  }

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setIsFavorited(catImage ? favorites.some(fav => fav.url === catImage.url) : false);
  }, [catImage, favorites]);

  const handleAdjectiveChange = (adjective: string) => {
    setSelectedAdjectives((prev) =>
      prev.includes(adjective) ? prev.filter((a) => a !== adjective) : [...prev, adjective]
    );
  };

  const handleNewAdjectiveChange = (e: any) => {
    setNewAdjective(e.target.value);
  };

  const handleAddAdjective = () => {
    if (newAdjective && !selectedAdjectives.includes(newAdjective)) {
      setSelectedAdjectives((prev) => [...prev, newAdjective]);
      setNewAdjective('');
    } else {
      setSelectedAdjectives((prev) => prev.filter((a) => a !== newAdjective));
      setNewAdjective('');
    }
  };

  const handleFavoriteToggle = () => {
    
    if (isFavorited) {
      removeFavorite(catImage!.url);
      resetState();
    } else {
      setIsAnimating(true);
      confetti.addConfetti({
        confettiColors: ['#FFB5C5', '#c580c5', '#FFC0CB', '#9b59b6'],
        confettiRadius: 6,
        confettiNumber: 500,
      });
      addFavorite({ 
        url: catImage!.url, 
        cuteness, 
        wouldPet, 
        hasBeans, 
        adjectives: selectedAdjectives 
      });
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      resetState();
    }
  };

  const fetchNewCatImage = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?size=med');
      if (!response.ok) {
        throw new Error('Failed to fetch cat image');
      }
      const data = await response.json();
      setCatImage(data[0]);
    } catch (err) {
      console.error('Error fetching cat image:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading adorable kitten...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home-container">
      <h1>Rate that KITTEN!</h1>
      {catImage && (
        <div className="cat-image-input-container">
          <div className="cat-image-container">
            <img 
              src={catImage.url} 
              alt="Adorable kitten" 
              className="cat-image"
            />
            <label htmlFor="cuteness-slider" className="cuteness-label">Cuteness Rating:</label>
            <input 
              id="cuteness-slider"
              type="range" 
              min="0" 
              max="10" 
              value={cuteness} 
              onChange={(e) => setCuteness(Number(e.target.value))} 
              className="cuteness-slider"
            />

            {!isSmallScreen && <button 
              onClick={handleFavoriteToggle} 
              className={`favorite-button ${isFavorited ? 'favorited' : ''} ${isAnimating ? 'animate' : ''}`}
            >
              {isFavorited ? '❤️' : '🤍'}
            </button>}
          </div>

          

          <div className="input-container">
            <h2>Would You Pet?</h2>
            <div>
              <label>
                <input type="radio" checked={wouldPet} onChange={() => setWouldPet(true)} /> Yes
              </label>
              <label>
                <input type="radio" checked={!wouldPet} onChange={() => setWouldPet(false)} /> No
              </label>
            </div>

            <h2>Has Beans?</h2>
            <div>
              <label>
                <input type="radio" checked={hasBeans} onChange={() => setHasBeans(true)} /> Yes
              </label>
              <label>
                <input type="radio" checked={!hasBeans} onChange={() => setHasBeans(false)} /> No
              </label>
            </div>

            <h2>Descriptors:</h2>
            <div>
              {["Babiest baby", "Certified Thicc Chungus™", "That's a damn fine cat", "Let me love you", "Freaky & Fuzzy"].map((adjective) => (
                <label key={adjective}>
                  <input 
                    type="checkbox" 
                    className="adjective-checkbox"
                    checked={selectedAdjectives.includes(adjective)} 
                    onChange={() => handleAdjectiveChange(adjective)} 
                  /> {adjective}
                </label>
              ))}
              <input
                type="text"
                placeholder="custom"
                value={newAdjective}
                onChange={handleNewAdjectiveChange}
                className="adjective-input"
              />
              <button className="gray-button" type="button" onClick={handleAddAdjective}>
                {!newAdjective ? 'Add' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="button-container">
        <button 
          onClick={fetchNewCatImage} 
          className={`${isFavorited && 'request-another-cat-active'} gray-button`}
        >
          Request Another Cat
        </button>
        {favorites.length > 0 && <button className="gray-button"
          onClick={() => navigate('/rated')}
        >View Rated Kitties</button>}
        
      </div>
      {isSmallScreen && <button 
          onClick={handleFavoriteToggle} 
          className={`favorite-button ${isFavorited ? 'favorited' : ''} ${isAnimating ? 'animate' : ''}`}
      >
        {isFavorited ? '❤️' : '🤍'}
      </button>}
    </div>
  );
};

export default Home; 