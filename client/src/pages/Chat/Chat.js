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
  // Get a ref to the chat log for scrolling
  // when submitting messages
  const chatLogRef = useRef(null);
  const { user } = useAuth();

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
      setMessages(data.messages);
    });
  }, [match.params.chatId, user.id]);
  // useEffect(() => {}, []);

  function messageInputChangeHandler(event) {
    setMessageInput(event.target.value);
  }

  function messageInputSubmitHandler(event) {
    event.preventDefault();
    if (messageInput.trim()) {
      const newMessage = {
        read: [user.id],
        sender: user.id,
        message: messageInput,
        chatId: match.params.chatId
      };

      API.addMessageToChat(newMessage)
        .then(({ data }) => {
          setMessages([...messages, data]);
        })
        .catch((err) => console.log(err));
    }

    setMessageInput('');
  }

  useEffect(() => {
    chatLogRef.current.scrollIntoView(false);
  }, [messages]);

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
          onChange={messageInputChangeHandler}
        ></input>
        <button type='submit' className='Chat-input-area__submit-button'>
          <i className='fas fa-paper-plane'></i>
        </button>
      </form>
    </section>
  );
}
