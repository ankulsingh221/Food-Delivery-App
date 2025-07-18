import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ toggleTheme, theme }) => {
  const [location, setLocation] = useState(localStorage.getItem('deliveryLocation') || 'Deliver to'); // Load from localStorage
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Current: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`); // Simple display; use reverse geocoding for city name if needed
          localStorage.setItem('deliveryLocation', location);
          setIsDropdownOpen(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to get location. Please allow permission or enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const setManualLocation = () => {
    if (manualAddress.trim()) {
      setLocation(manualAddress);
      localStorage.setItem('deliveryLocation', manualAddress);
      setManualAddress('');
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="nav">
      <div className="l-nav">
        <Link to="/" className="brand-link">
          <span className="brand">Quick<span className="green">Eats</span></span>
        </Link>
      </div>
      <div className="r-nav">
        <div className="location-wrapper" ref={dropdownRef}>
          <button className="location" onClick={toggleDropdown}>
            📍 {location}
          </button>
          {isDropdownOpen && (
            <div className="location-dropdown">
              <button onClick={useCurrentLocation}>Use Current Location</button>
              <div className="manual-input">
                <input
                  type="text"
                  placeholder="Enter address"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                />
                <button onClick={setManualLocation}>Set</button>
              </div>
            </div>
          )}
        </div>
        <Link to="/login" className="auth">Sign in</Link>
        <Link to="/signup" className="signup">Sign up</Link>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  );
};

export default Header;