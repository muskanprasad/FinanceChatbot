// // src/pages/Profile.jsx
// import React from "react";
// import { useAuth } from "../contexts/AuthContext"; // Corrected path
// import "../css/Profile.css"; // Ensure this CSS file exists and has your profile styles

// const Profile = () => {
//   const { user } = useAuth();

//   // Basic handling for when user might not be fully loaded, though ProtectedRoute should handle most of this.
//   if (!user) {
//     return (
//       <div className="profile-container">
//         <h2>User Profile</h2>
//         <p>Loading profile information...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <h2>User Profile</h2>
//       <div className="profile-details">
//         <p><strong>Email:</strong> {user.email}</p>
//         {/* Changed from displayName to username based on AuthContext example */}
//         <p><strong>Username:</strong> {user.username || "Not Set"}</p>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="profile-container">
        <h2>User Profile</h2>
        <p>Loading profile information...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      <h2>User Profile</h2>
      <div className="profile-details">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username || "Not Set"}</p>
      </div>
    </div>
  );
};

export default Profile;
