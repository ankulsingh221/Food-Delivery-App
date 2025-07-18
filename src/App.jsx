// Updated App.jsx (added routes for role-based login and AvailableCities above footer)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import RestaurantsNearYou from './components/RestaurantsNearYou';
import AvailableCities from './components/AvailableCities'; // New import for cities section
import Footer from './components/Footer';
import RoleSelectionLogin from './components/RoleSelectionLogin'; // New for login role selection
import CustomerSignIn from './components/CustomerSignIn'; // New
import OwnerSignIn from './components/OwnerSignIn'; // New
import DeliverySignIn from './components/DeliverySignIn'; // New
import AdminSignIn from './components/AdminSignIn'; // New
import RoleSelection from './components/RoleSelection'; // Existing for signup
import CustomerSignUp from './components/CustomerSignUp';
import OwnerSignUp from './components/OwnerSignUp';
import DeliverySignUp from './components/DeliverySignUp';
import AdminSignUp from './components/AdminSignUp';

// Layout component to wrap Header and Footer around pages
const Layout = ({ children, theme, toggleTheme }) => (
  <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
    <Header toggleTheme={toggleTheme} theme={theme} />
    <main style={{ flex: 1, width: '100%' }}>{children}</main>
    <Footer />
  </div>
);

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Hero />
              <RestaurantsNearYou />
              <AvailableCities /> {/* Added just above Footer */}
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <RoleSelectionLogin /> {/* Role selection for login */}
            </Layout>
          }
        />
        <Route
          path="/login/customer"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <CustomerSignIn />
            </Layout>
          }
        />
        <Route
          path="/login/owner"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <OwnerSignIn />
            </Layout>
          }
        />
        <Route
          path="/login/delivery"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <DeliverySignIn />
            </Layout>
          }
        />
        <Route
          path="/login/admin"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <AdminSignIn />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <RoleSelection />
            </Layout>
          }
        />
        <Route
          path="/signup/customer"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <CustomerSignUp />
            </Layout>
          }
        />
        <Route
          path="/signup/owner"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <OwnerSignUp />
            </Layout>
          }
        />
        <Route
          path="/signup/delivery"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <DeliverySignUp />
            </Layout>
          }
        />
        <Route
          path="/signup/admin"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <AdminSignUp />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;