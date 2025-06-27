// src/components/Chat/Chatbox.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import Message from './Message';
import { useAuth } from '../../contexts/AuthContext'; // To get token for API calls

function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null); // Ref for auto-scrolling
  const { user } = useAuth(); // Access the user object (for token if needed)

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial bot greeting
  useEffect(() => {
    setMessages([
      { id: 1, text: "Hello! I'm FinBot, your personal finance assistant. How can I help you today?", sender: 'bot' }
    ]);
  }, []);

  const sendMessageToBot = async (messageText) => {
    setIsTyping(true);
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.post(
        'https://finance-chatbot-jth5.onrender.com/api/chat', // Your chatbot API endpoint
        { message: messageText },
        { headers }
      );
      return response.data.response; // Assuming your backend returns { reply: "..." }
    } catch (error) {
      console.error('Error sending message to bot:', error.response?.data || error.message);
      return "Sorry, I'm having trouble connecting right now. Please try again later.";
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage = { id: Date.now(), text: inputMessage, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage(''); // Clear input immediately

    // Simulate bot response / Call backend
    const botResponse = await sendMessageToBot(newUserMessage.text);
    const newBotMessage = { id: Date.now() + 1, text: botResponse, sender: 'bot' };
    setMessages((prevMessages) => [...prevMessages, newBotMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Allow Shift+Enter for new line
      e.preventDefault(); // Prevent default new line behavior
      handleSendMessage();
    }
  };

  return (
    <div className="chatbox-container">
      <div className="messages-display">
        {messages.map((msg) => (
          <Message key={msg.id} text={msg.text} sender={msg.sender} />
        ))}
        {isTyping && <div className="loading-indicator">FinBot is typing...</div>}
        <div ref={messagesEndRef} /> {/* For auto-scrolling */}
      </div>
      <div className="chat-input-area">
        <textarea
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={1} // Initial rows
        />
        <button onClick={handleSendMessage} disabled={isTyping}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default Chatbox;