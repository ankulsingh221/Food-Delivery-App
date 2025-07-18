// New component: components/OwnerSignUp.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUp.css'; // Reuse

const OwnerSignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add owner sign-up logic
    console.log('Restaurant Owner Sign Up submitted');
  };

  return (
    <div className="auth-container">
      <h2>Restaurant Owner Sign Up - Step 2 of 3</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" placeholder="Full Name" required />
        <input type="text" placeholder="Restaurant Name" required />
        <input type="text" placeholder="Restaurant Address" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">Next</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default OwnerSignUp;