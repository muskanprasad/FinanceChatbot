import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import "../css/Setting.css";

const Setting = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="setting-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      <h2>Settings</h2>
      <div className="setting-option">
        <label htmlFor="darkModeToggle">Dark Mode:</label>
        <button id="darkModeToggle" onClick={toggleTheme}>
          {theme === "dark" ? "Disable" : "Enable"}
        </button>
      </div>
    </div>
  );
};

export default Setting;
