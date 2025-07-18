// New component: components/AdminSignIn.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignIn.css'; // Reuse

const AdminSignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add admin sign-in logic (e.g., verify admin credentials)
    console.log('Administrator Sign In submitted');
  };

  return (
    <div className="auth-container">
      <h2>Administrator Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup/admin">Sign up</Link>
      </p>
    </div>
  );
};

export default AdminSignIn;