import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="*" element={<p>Page not found!</p>} />
          <Route path="/" element={<Home />} />
          <Route path="/rated" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 