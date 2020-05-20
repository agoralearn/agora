import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import ChatPreview from '../../components/ChatPreview/ChatPreview';
import GoBack from '../../components/GoBack/GoBack';
import PageHeader from '../../components/PageHeader/PageHeader';
// import { Container } from 'semantic-ui-react';

import './Inbox.scss';

export default function Inbox(props) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getChats();
  }, []);

  const getChats = () => {
    API.getChatsByUserId()
      .then((res) => {
        console.log(res.data);
        setChats(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='inbox-container'>
      <GoBack history={props.history} />
      <PageHeader>
        <h2 className='header-text'>Sessions</h2>
      </PageHeader>
      <div className='chats-div'>
        {chats.map((chat) => {
          return (
            <ChatPreview
              key={chat._id}
              users={chat.users}
              message={chat.messages}
              chatId={chat._id}
              match={props.match}
            />
          );
        })}
      </div>
    </div>
  );
}
