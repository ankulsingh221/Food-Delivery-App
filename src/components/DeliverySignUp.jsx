// New component: components/DeliverySignUp.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUp.css'; // Reuse

const DeliverySignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add delivery partner sign-up logic
    console.log('Delivery Partner Sign Up submitted');
  };

  return (
    <div className="auth-container">
      <h2>Delivery Partner Sign Up - Step 2 of 3</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" placeholder="Full Name" required />
        <input type="text" placeholder="Vehicle Type (e.g., Bike, Car)" required />
        <input type="text" placeholder="License Number" required />
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

export default DeliverySignUp;