// New component: components/RoleSelectionLogin.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RoleSelection.css'; // Reuse the same CSS as signup role selection

const RoleSelectionLogin = () => {
  return (
    <div className="role-container">
      <h2>Sign In - Select Your Role</h2>
      <p className="role-question">What describes you best?</p>
      <div className="role-options">
        <Link to="/login/customer" className="role-card">
          <div className="role-icon">🍔</div>
          <h3>Customer</h3>
          <p>Order food from restaurants</p>
        </Link>
        <Link to="/login/owner" className="role-card">
          <div className="role-icon">🏠</div>
          <h3>Restaurant Owner</h3>
          <p>Manage your restaurant and menu</p>
        </Link>
        <Link to="/login/delivery" className="role-card">
          <div className="role-icon">🚲</div>
          <h3>Delivery Partner</h3>
          <p>Deliver orders to customers</p>
        </Link>
        <Link to="/login/admin" className="role-card">
          <div className="role-icon">🛡️</div>
          <h3>Administrator</h3>
          <p>Manage the platform</p>
        </Link>
      </div>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
};

export default RoleSelectionLogin;