import React, { useEffect, useState, useRef } from 'react';
import './Chat.scss';
import { useAuth } from '../../utils/auth';
import ChatBubble from '../../components/Chat/ChatBubble/ChatBubble';
import GoBack from '../../components/GoBack/GoBack';
import API from '../../utils/API';
import { toTitleCase } from '../../utils/helpers';

export default function Chat({ match, ...props }) {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [avatars, setAvatars] = useState('');
  const [otherUsers, setOtherUsers] = useState([]);
  const [usersFullData, setUsersFullData] = useState([]);
  // Get a ref to the chat log for scrolling
  // when submitting messages
  const chatLogRef = useRef(null);
  const { user, socket } = useAuth();

  useEffect(() => {
    chatLogRef.current.scrollIntoView(false);
  }, [messages]);

  useEffect(() => {
    socket.on('message', (data) => {
      if (data.chatId === match.params.chatId) {
        setMessages((messages) => [...messages, data.message]);
      }
    });
  }, [match.params.chatId, socket]);

  useEffect(() => {
    function fetchUserMessages() {
      const chatId = match.params.chatId;
      return API.getChat(chatId);
    }

    function mapUserstoImages({ users }) {
      const avatarMap = {};
      const userNames = [];
      users.forEach((person) => {
        avatarMap[person._id] = person.image;
        if (person._id !== user.id) {
          userNames.push(
            <h2 className='f-w-l u-m-l' key={person._id}>
              {toTitleCase(person.firstName)} {toTitleCase(person.lastName)}
            </h2>
          );
        }
      });
      setAvatars(avatarMap);
      setOtherUsers(userNames);
    }

    fetchUserMessages().then(({ data }) => {
      mapUserstoImages(data);
      setUsersFullData(data.users);
      setMessages(data.messages);
    });
  }, [match.params.chatId, user.id]);

  function messageInputSubmitHandler(event) {
    event.preventDefault();
    if (messageInput.trim()) {
      const newMessage = {
        read: [user.id],
        sender: user.id,
        message: messageInput,
        chatId: match.params.chatId,
        receivers: usersFullData
          .filter((person) => person._id !== user.id)
          .map((person) => person._id)
      };
      sendMessage(newMessage);
    }

    setMessageInput('');
  }

  function sendMessage(message) {
    API.addMessageToChat(message)
      .then(({ data }) => {
        setMessages([...messages, data]);
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className='Chat-container'>
      <div className='Chat-users-names'>
        <GoBack />
        {otherUsers}
      </div>

      <div className='Chat-log'>
        {messages.map((message, index) => {
          return (
            <ChatBubble
              key={message._id}
              text={message.message}
              recieved={message.read}
              sender={message.sender}
              thumbnail={avatars[message.sender]}
              date={message.createdAt}
            />
          );
        })}
        <div ref={chatLogRef}></div>
      </div>

      <form className='Chat-input-area' onSubmit={messageInputSubmitHandler}>
        <input
          type='text'
          placeholder='Write something...'
          className='Chat-input-area__input'
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        ></input>
        <button type='submit' className='Chat-input-area__submit-button'>
          <i className='fas fa-paper-plane'></i>
        </button>
      </form>
    </section>
  );
}
