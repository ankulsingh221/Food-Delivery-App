// New component: components/CustomerSignIn.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignIn.css'; // Reuse existing CSS

const CustomerSignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add customer sign-in logic (e.g., API call)
    console.log('Customer Sign In submitted');
  };

  return (
    <div className="auth-container">
      <h2>Customer Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup/customer">Sign up</Link>
      </p>
    </div>
  );
};

export default CustomerSignIn;