import React, { useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import "./ChatPage.css";

function ChatPage() {
  const { ownerName } = useParams();
  const { state } = useLocation();
  const property = state?.property;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    // Add user's message to chat
    const newMsg = { sender: "You", text: newMessage };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="chat-page-container">
      <div className="chat-card">
        <h2 className="chat-heading">Chat with {ownerName}</h2>
        {property && (
          <p className="chat-property-name">Property: {property.name}</p>
        )}

        <div className="chat-window">
          {messages.length === 0 ? (
            <p className="placeholder">
              Start a conversation with {ownerName}...
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.sender === "You" ? "user-message" : "owner-message"
                }`}
              >
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))
          )}
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="send-btn" onClick={handleSend}>
            Send
          </button>
        </div>

        <Link to="/properties" className="back-link">
          ⬅ Back to Properties
        </Link>
      </div>
    </div>
  );
}

export default ChatPage;
