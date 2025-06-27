// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext'; // Ensure path is correct here if it's nested
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/Profile'; // Import the Profile component
import SettingsPage from './pages/Setting'; // Import the Setting component
import LogoutPage from './pages/Logout';   // Import the Logout component (if keeping it as a page)
import ProtectedRoute from './components/Common/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="app">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile" // New route for Profile Page
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings" // New route for Settings Page
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              {/* If you're using a dedicated Logout page */}
              <Route
                path="/logout"
                element={
                  <ProtectedRoute> {/* Protect if you want to ensure they are logged in before logging out */}
                    <LogoutPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<h2>404 - Page Not Found</h2>} />
            </Routes>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;