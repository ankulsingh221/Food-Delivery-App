import React from 'react';
import '../styles/Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Install react-icons if needed

const Footer = () => {
  return (
    <footer className="footer">
      <div className="subscription">
        <h3>Stay updated with QuickEats</h3>
        <div className="subscribe-form">
          <input type="email" placeholder="Your email" />
          <button>Subscribe</button>
        </div>
      </div>

      <div className="footer-columns">
        <div className="column quickeats">
          <h4>QuickEats</h4>
          <p>Your one-stop for food delivery. Over 10,000 restaurants nationwide.</p>
        </div>
        <div className="column company">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>
        <div className="column support">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="column contact">
          <h4>Contact</h4>
          <ul>
            <li><a href="#">Email Us</a></li>
            <li><a href="#">Call: 1-800-QUICK</a></li>
            <li><a href="#">Address: 123 Food St.</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedin /></a>
        </div>
        <p>&copy; 2025 QuickEats. All rights reserved.</p>
        <div className="bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;