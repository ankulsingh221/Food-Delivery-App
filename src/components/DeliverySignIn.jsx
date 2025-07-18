// New component: components/DeliverySignIn.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignIn.css'; // Reuse

const DeliverySignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add delivery partner sign-in logic
    console.log('Delivery Partner Sign In submitted');
  };

  return (
    <div className="auth-container">
      <h2>Delivery Partner Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup/delivery">Sign up</Link>
      </p>
    </div>
  );
};

export default DeliverySignIn;