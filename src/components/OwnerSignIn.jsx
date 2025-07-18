// New component: components/OwnerSignIn.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignIn.css'; // Reuse

const OwnerSignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add owner sign-in logic
    console.log('Restaurant Owner Sign In submitted');
  };

  return (
    <div className="auth-container">
      <h2>Restaurant Owner Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup/owner">Sign up</Link>
      </p>
    </div>
  );
};

export default OwnerSignIn;