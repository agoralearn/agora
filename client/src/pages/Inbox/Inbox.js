import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import ChatPreview from '../../components/ChatPreview/ChatPreview';
import GoBack from '../../components/GoBack/GoBack';
import PageHeader from '../../components/PageHeader/PageHeader';
// import { Container } from 'semantic-ui-react';

import './Inbox.scss';

export default function Inbox({ history }) {
  const [chats, setChats] = useState([]);
  const currentUserId = '5ec196146b0a589818189458';

  useEffect(() => {
    getChats();
  }, []);

  const getChats = () => {
    API.getChatsByUserId(currentUserId)
      .then((res) => {
        setChats(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='inbox-container'>
      <GoBack history={history} />
      <PageHeader>
        <h2 className='header-text'>Sessions</h2>
      </PageHeader>
      <div className='chats-div'>
        {chats.map((chat) => (
          <ChatPreview
            key={chat._id}
            users={chat.users}
            message={chat.messages}
          />
        ))}
      </div>
    </div>
  );
}
