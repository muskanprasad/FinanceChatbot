// src/pages/Logout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Corrected path
import "../css/Logout.css"; // Optional: Add a basic CSS file for the message

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout when the component mounts
    logout();
    // After logout (and state has updated), navigate to login page
    // Using a timeout can give the user a moment to see "Logging you out..."
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1000); // Wait for 1 second

    return () => clearTimeout(timer); // Clean up the timer
  }, [logout, navigate]);

  return (
    <div className="container"> {/* Use your global container style */}
        <div className="logout-message card"> {/* Apply card styling */}
          <p>Logging you out...</p>
        </div>
    </div>
  );
};

export default Logout;