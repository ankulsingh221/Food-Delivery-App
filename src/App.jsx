import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RestaurantsNearYou from './components/RestaurantsNearYou';
import Footer from './components/Footer'; // New import

function App() {
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage on initial render (defaults to 'light' if none)
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Save to localStorage
      return newTheme;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme); // Apply theme globally to <html>
  }, [theme]);

  return (
    <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Hero />
      <RestaurantsNearYou />
      <Footer /> {/* New footer */}
    </div>
  );
}

export default App;