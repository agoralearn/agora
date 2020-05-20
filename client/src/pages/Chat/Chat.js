import React, { useEffect, useState, useRef } from 'react';
import './Chat.scss';
import { useAuth } from '../../utils/auth';
import ChatBubble from '../../components/Chat/ChatBubble/ChatBubble';
import GoBack from '../../components/GoBack/GoBack';
import API from '../../utils/API';

export default function Chat({ match, history, ...props }) {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [avatars, setAvatars] = useState('');
  const [otherUsers, setOtherUsers] = useState([]);
  // Get a ref to the chat log for scrolling
  // when submitting messages
  const chatLogRef = useRef(null);
  const { user } = useAuth();

  useEffect(
    () => {
      // Scroll to bottom on page load if message list is long
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
      const chatId = match.params.chatId;

      API.getChat(chatId).then(({ data }) => {
        setMessages(data.messages);
        setAvatars({
          userAvatar:
            data.users[0] === user.id
              ? data.users[0].image
              : data.users[1].image,
          otherAvatar:
            data.users[1] === user.id
              ? data.users[1].image
              : data.users[0].image
        });
        setOtherUsers(
          data.users.map((other) =>
            other._id !== user.id ? (
              <h2 className='f-w-l u-m-l' key={other._id}>
                {other.firstName} {other.lastName}
              </h2>
            ) : null
          )
        );
      });
    },

    // Make database call to get messages
    // when page first loads here
    [match.params.chatId, user.id]
  );

  function messageInputChangeHandler(event) {
    setMessageInput(event.target.value);
  }

  function messageInputSubmitHandler(event) {
    event.preventDefault();
    if (messageInput.trim()) {
      const newMessage = {
        recieved: false,
        firstName: 'Janet',
        lastName: 'Lee',
        chatId: messages.length + 1,
        text: messageInput,
        thumbnail:
          'https://sundaydigital.com.au/wp-content/uploads/2019/04/sample-avatar-003.jpg'
      };

      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  }

  useEffect(() => {
    chatLogRef.current.scrollIntoView(false);
  }, [messages]);

  return (
    <section className='Chat-container'>
      <div className='Chat-users-names'>
        <GoBack history={history} />
        {otherUsers}
      </div>

      <div className='Chat-log'>
        {messages.map((message, index) => {
          return (
            <ChatBubble
              key={message._id}
              text={message.message}
              recieved={message.read}
              // sender={message.sender}
              thumbnail={
                message.sender === user.id
                  ? avatars.userAvatar
                  : avatars.otherAvatar
              }
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
