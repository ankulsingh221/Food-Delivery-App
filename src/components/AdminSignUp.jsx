// New component: components/AdminSignUp.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUp.css'; // Reuse

const AdminSignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add admin sign-up logic (e.g., verify admin code)
    console.log('Administrator Sign Up submitted');
  };

  return (
    <div className="auth-container">
      <h2>Administrator Sign Up - Step 2 of 3</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" placeholder="Full Name" required />
        <input type="text" placeholder="Admin Code" required />
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

export default AdminSignUp;