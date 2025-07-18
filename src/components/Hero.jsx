// Hero.jsx (no changes needed)
import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="badge">🚚 Free delivery on your first order</div>
      <h1 className="hero-heading">
        Order food to your <span className="green">door</span>
      </h1>
      <p className="subtext">Get your favorite meals delivered fast from restaurants near you</p>

      <div className="search-bar">
        <input type="text" placeholder="Enter delivery address" />
        <button className="find-btn">🔍 Find food</button>
      </div>

      <div className="categories">
        {["Pizza", "Burgers", "Chinese", "Sushi", "Mexican", "Italian"].map((item) => (
          <button key={item} className="category">{item}</button>
        ))}
      </div>

      <div className="stats">
        <div><span className="stat-green">10K+</span><p>Restaurants</p></div>
        <div><span className="stat-green">500K+</span><p>Happy Users</p></div>
        <div><span className="stat-green">25min</span><p>Avg Delivery</p></div>
      </div>
    </div>
  );
};

export default Hero;