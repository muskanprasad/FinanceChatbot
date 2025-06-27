// src/components/Common/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Removed FaSun and FaMoon
import { useAuth } from '../../contexts/AuthContext'; // To display username
import ProfileDropdown from './ProfileDropdown';

function Navbar() {
  const { user } = useAuth(); // Removed useTheme
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">FinBot</Link>
      </div>
      <div className="navbar-right">
        {/* Removed theme toggle button */}
        <div className="profile-section">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="profile-icon"
            aria-label={`Profile of ${user?.username || 'User'}`}
          >
            <FaUserCircle />
          </button>
          {showProfileDropdown && (
            <ProfileDropdown onClose={() => setShowProfileDropdown(false)} />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
