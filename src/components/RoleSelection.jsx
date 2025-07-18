// New component: components/RoleSelection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RoleSelection.css'; // Add new CSS file for styling

const RoleSelection = () => {
  return (
    <div className="role-container">
      <h2>Create Account - Step 1 of 3</h2>
      <p className="role-question">What describes you best?</p>
      <div className="role-options">
        <Link to="/signup/customer" className="role-card">
          <div className="role-icon">🍔</div>
          <h3>Customer</h3>
          <p>Order food from restaurants</p>
          <small>Quick signup. Get started in seconds!</small>
        </Link>
        <Link to="/signup/owner" className="role-card">
          <div className="role-icon">🏠</div>
          <h3>Restaurant Owner</h3>
          <p>Manage your restaurant and menu</p>
        </Link>
        <Link to="/signup/delivery" className="role-card">
          <div className="role-icon">🚲</div>
          <h3>Delivery Partner</h3>
          <p>Deliver orders to customers</p>
        </Link>
        <Link to="/signup/admin" className="role-card">
          <div className="role-icon">🛡️</div>
          <h3>Administrator</h3>
          <p>Manage the platform</p>
        </Link>
      </div>
      <p>Already have an account? <Link to="/login">Sign in</Link></p>
    </div>
  );
};

export default RoleSelection;