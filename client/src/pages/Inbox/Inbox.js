import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import ChatPreview from '../../components/ChatPreview/ChatPreview';
import './Inbox.scss';

export default function Inbox() {
  const [chats, setChats] = useState([]);
  const currentUserId = '';

  useEffect(() => {
    getChats();
  }, chats);

  const getChats = () => {
    API.getChatsByUserId(currentUserId)
      .then((res) => setChats(res.data.chats))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Sessions</h2>
      <div>
        {chats.map((chat) => (
          <ChatPreview
            currentUser={currentUserId}
            users={chat.users}
            message={chat.messages}
          />
        ))}
      </div>
    </div>
  );
}
