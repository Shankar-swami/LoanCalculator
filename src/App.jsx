import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoanCalculator from './LoanCalculator';
import LiveExchangeRates from './LiveExchangeRates';
import About from './About';
import './App.css';

// Material UI icons
import HomeIcon from '@mui/icons-material/Home';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import InfoIcon from '@mui/icons-material/Info';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') setDarkMode(true);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <Router>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="brand">
            MONTHLY EMI LOAN CALCULATOR
          </Link>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <div className={`nav-right ${menuOpen ? 'show' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <HomeIcon sx={{ color: '#4caf50', verticalAlign: 'middle', mr: 0.5 }} />
            Home
          </Link>
          <Link to="/live-rates" onClick={() => setMenuOpen(false)}>
            <CurrencyExchangeIcon sx={{ color: '#2196f3', verticalAlign: 'middle', mr: 0.5 }} />
            Live Exchange Rates
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <InfoIcon sx={{ color: '#f44336', verticalAlign: 'middle', mr: 0.5 }} />
            About
          </Link>
          <button onClick={toggleTheme} className="theme-btn">
            {darkMode ? (
              <LightModeIcon sx={{ color: '#ffeb3b' }} />
            ) : (
              <DarkModeIcon sx={{ color: '#3f51b5' }} />
            )}
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LoanCalculator />} />
        <Route path="/live-rates" element={<LiveExchangeRates />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
