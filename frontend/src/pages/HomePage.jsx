// src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/Common/Navbar';
import Chatbox from '../components/Chat/Chatbox';

function HomePage() {
  return (
    <div className="homepage">
      <Navbar />
      <main className="main-content">
        <Chatbox />
      </main>
    </div>
  );
}

export default HomePage;