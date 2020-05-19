import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import ChatPreview from '../../components/ChatPreview/ChatPreview';
import './Inbox.scss';

export default function Inbox() {
  const [chats, setChats] = useState([]);
  const currentUserId = '5ec196146b0a589818189458';

  useEffect(() => {
    getChats();
  }, []);

  const getChats = () => {
    API.getChatsByUserId(currentUserId)
      .then((res) => {
        console.log(res.data);
        setChats(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Sessions</h2>
      <div>
        {chats.map((chat) => (
          <ChatPreview users={chat.users} message={chat.messages} />
        ))}
      </div>
    </div>
  );
}
