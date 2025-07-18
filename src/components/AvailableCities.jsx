// src/components/AvailableCities.jsx (Updated with more animations)
import React from 'react';
import '../styles/AvailableCities.css'; // Updated CSS below

const AvailableCities = () => {
  return (
    <div className="available-cities-container">
      <h2 className="available-cities-title">Available cities near you</h2>
      <p className="available-cities-subtitle">
        We're expanding across the country. Discover QuickEats in your city!
      </p>
      <div className="available-cities-map">
        {/* Animated dots with staggered delays */}
        <div className="map-dot" style={{ top: '20%', left: '30%', animationDelay: '0s' }}></div>
        <div className="map-dot" style={{ top: '40%', left: '50%', animationDelay: '0.5s' }}></div>
        <div className="map-dot" style={{ top: '60%', left: '70%', animationDelay: '1s' }}></div>
        <div className="map-dot" style={{ top: '30%', left: '60%', animationDelay: '1.5s' }}></div>
        <div className="map-dot" style={{ top: '50%', left: '40%', animationDelay: '2s' }}></div>
        {/* Add more dots as needed */}
      </div>
      <p className="map-instruction">Click a city on the map or select from below</p>
      <div className="available-cities-list">
        <button className="city-button">All Cities</button>
        <button className="city-button">New York</button>
        <button className="city-button">Los Angeles</button>
        <button className="city-button">Chicago</button>
        <button className="city-button">Houston</button>
        <button className="city-button">Phoenix</button>
        <button className="city-button">Austin</button>
      </div>
    </div>
  );
};

export default AvailableCities;