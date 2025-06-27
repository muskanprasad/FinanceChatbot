// src/components/Chat/Message.jsx
import React from 'react';

function Message({ text, sender }) {
  const isUser = sender === 'user';
  return (
    <div className={`message ${isUser ? 'user' : 'bot'}`}>
      {text}
    </div>
  );
}

export default Message;