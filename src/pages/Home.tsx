import { useState, useEffect } from 'react';
import './Home.css';

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
        <div className="cat-image-container">
          <img 
            src={catImage.url} 
            alt="Adorable cat or kitten"
            className="cat-image"
          />
        </div>
      )}
    </div>
  );
};

export default Home; 