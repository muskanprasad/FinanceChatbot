// src/components/Common/ProfileDropdown.jsx
import React, { useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProfileDropdown({ onClose }) {
  const { logout } = useAuth(); // Keep logout for direct logout if needed
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleLogout = () => {
    logout(); // Calls the logout function from context
    navigate('/login'); // Redirects to login page
    onClose(); // Closes the dropdown
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose(); // Close dropdown after navigating
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <div className="profile-dropdown-item" onClick={() => handleNavigation("/profile")}>
        My Profile
      </div>
      <div className="profile-dropdown-item" onClick={() => handleNavigation("/settings")}>
        Settings
      </div>
      <div className="profile-dropdown-item" onClick={handleLogout}> {/* Direct logout */}
      {/* OR if you keep Logout.jsx as a page: 
      <div className="profile-dropdown-item" onClick={() => handleNavigation("/logout")}>
      */}
        Logout
      </div>
    </div>
  );
}

export default ProfileDropdown;