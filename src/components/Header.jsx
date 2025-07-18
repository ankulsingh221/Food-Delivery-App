import React from 'react';
import '../styles/Header.css';

const Header = ({ toggleTheme, theme }) => {
  return (
    <div className="nav">
      <div className="l-nav">
        <span className="brand">Quick<span className="green">Eats</span></span>
      </div>
      <div className="r-nav">
        <button className="location">📍 Deliver to</button>
        <a href="/login" className="auth">Sign in</a>
        <a href="/signup" className="signup">Sign up</a>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  );
};

export default Header;