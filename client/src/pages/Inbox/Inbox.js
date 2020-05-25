import React, { useState, useEffect } from 'react';
import './Inbox.scss';

import API from '../../utils/API';
import ChatPreview from '../../components/ChatPreview/ChatPreview';
import GoBack from '../../components/GoBack/GoBack';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useAuth } from '../../utils/auth';

export default function Inbox(props) {
  const [chats, setChats] = useState([]);

  const { socket, state } = useAuth();

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    // console.log(chats);
  }, [chats]);

  useEffect(() => {
    socket.on('message', (data) => {
      setChats((chats) => {
        return chats.map((chat) => {
          if (chat._id === data.chatId) {
            chat.messages = [data.message];
          }
          return chat;
        });
      });
    });
  }, [socket]);

  const getChats = () => {
    API.getChatsByUserId()
      .then((res) => {
        setChats(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='inbox-container'>
      <div className='u-m-l'>
        <GoBack />
      </div>
      <PageHeader>
        <h2 className='header-text'>Inbox</h2>
      </PageHeader>
      <div className='chats-div'>
        {chats.map((chat) => {
          return (
            <ChatPreview
              style={
                state.unread && state.unread.includes(chat._id)
                  ? { fontWeight: 'bold' }
                  : ''
              }
              key={chat._id}
              users={chat.users}
              messages={chat.messages}
              chatId={chat._id}
              match={props.match}
              date={chat.messages.length > 0 && chat.messages[0].createdAt}
            />
          );
        })}
      </div>
    </div>
  );
}
