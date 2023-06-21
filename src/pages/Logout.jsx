import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const LogoutPage = () => {

  return (
    <div className="logout-page">
      <div className="logout-content">
        <h1 className="logout-title">You have been logged out</h1>
        <p className="logout-message">Please choose an option:</p>
        <div className="logout-options">
          <Link to="/login" className="logout-link">
            Login
          </Link>
          <Link to="/signup" className="logout-link">
            Signup
          </Link>
          <Link to="/" className="logout-link">
            View Seats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;

