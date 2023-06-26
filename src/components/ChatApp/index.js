import React, { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./index.css";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [filteredUserList, setFilteredUserList] = useState([]);
  console.log(messages);

  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
  const reply_messages = [
    "Hi",
    "Thanks for reaching out",
    "Let me know your issue",
    "Hello",
    "We are working on it",
    "We are on the way!",
  ];

  const handleSendMessage = () => {
    if (input.trim() === "") {
      alert("Please enter your concern!");
      setEmojiPicker(false);
      return;
    }

    const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
    const randomReply =
      reply_messages[Math.floor(Math.random() * reply_messages.length)];
    const newMessage = {
      id: new Date().getTime().toString(),
      username: randomUser,
      text: input,
      likes: 0,
    };

    const replyMessage = {
      id: new Date().getTime().toString(),
      username: "Support",
      text: randomReply,
      likes: 0,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage, replyMessage]);
    setInput("");
    setEmojiPicker(false);
  };

  const formatTime = (id) => {
    const messageDate = new Date(parseInt(id));
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes();

    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };

  const handleEmojiSelect = (emoji) => {
    if (emoji.native === "@") {
      setShowUserList(true);
    } else {
      setInput((prevInput) => prevInput + emoji.native);
      setShowUserList(false);
    }
    console.log(emoji);
  };

  const handleUserSelection = (username) => {
    setInput((prevInput) => prevInput + username);
    setShowUserList(false);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    if (inputValue.includes("@")) {
      setShowUserList(true);
      const filterValue = inputValue.substring(inputValue.lastIndexOf("@") + 1);
      const filteredUsers = user_list.filter((user) =>
        user.toLowerCase().includes(filterValue.toLowerCase())
      );
      setFilteredUserList(filteredUsers);
    } else {
      setShowUserList(false);
    }
  };

  const handleLike = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, likes: message.likes + 1 } : message
      )
    );
  };

  return (
    <div className="chatapp-container">
      <h1 className="chatapp-header">Welcome to Best Support </h1>
      <h2 className="chatapp-header-info">
        <u>We're honored to serve you</u>😊
      </h2>
      <div className="chatapp-inbox-container">
        <div className="chatapp-inbox-header">
          <h3 className="inbox-header-info">
            {" "}
            {messages.length === 0
              ? "Unlock insights. Chat on!"
              : "Grateful for connecting with you..."}
          </h3>
        </div>
        {emojiPicker && (
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        )}
        <div className="chatapp-messages">
          {messages.length === 0 ? (
            <div className="no-chat-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                alt="no-chat"
                className="no-chat-img"
              />
              <p className="no-chat-info">
                No chat appearance! Let's chat with us...
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.username === "Support" ? "reply" : ""
                }`}
              >
                {message.username !== "Support" && (
                  <span className="username-label">
                    {" "}
                    {message.username[0]}{" "}
                  </span>
                )}
                <p className="message-text">
                  {message.text}
                  <span className="likes-btn-style">
                    <button
                      className="likes-button"
                      onClick={() => handleLike(message.id)}
                    >
                      <FaThumbsUp
                        style={{ color: "green", fontSize: "14px" }}
                      />{" "}
                      {message.likes}
                    </button>
                  </span>
                </p>
                <p className="message-username">
                  {message.username} : {formatTime(message.id)}
                </p>
              </div>
            ))
          )}
        </div>
        <div>
          {showUserList && (
            <ul className="user-list">
              {filteredUserList.map((user) => (
                <li
                  key={user}
                  className="user-list-item"
                  onClick={() => handleUserSelection(user)}
                >
                  {user}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="chatapp-input-container">
          <div className="input-container">
            <input
              id="message-input"
              type="text"
              className="input"
              placeholder="Ask your query here..."
              value={input}
              onChange={handleInputChange}
            />
            <span>
              <button
                className="emoji-button"
                onClick={() => setEmojiPicker(!emojiPicker)}
              >
                {emojiPicker ? "❌" : "😊"}
              </button>
            </span>
          </div>
          <button className="chatapp-send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
