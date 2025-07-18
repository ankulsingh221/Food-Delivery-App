// New component: components/CustomerSignUp.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUp.css'; // Reuse existing CSS

const CustomerSignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add customer sign-up logic (e.g., API call)
    console.log('Customer Sign Up submitted');
  };

  return (
    <div className="auth-container">
      <h2>Customer Sign Up - Step 2 of 3</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" placeholder="Full Name" required />
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

export default CustomerSignUp;