import React, { useEffect, useState, useRef } from 'react';
import './Chat.scss';
import { useAuth } from '../../utils/auth';
import ChatBubble from '../../components/Chat/ChatBubble/ChatBubble';
import GoBack from '../../components/GoBack/GoBack';
import API from '../../utils/API';

const testMessages = [
  {
    recieved: true,
    firstName: 'Kyle',
    lastName: 'Schrute',
    chatId: 123412,
    text: 'Hi!',
    thumbnail:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
  },
  {
    recieved: true,
    firstName: 'Kyle',
    lastName: 'Schrute',
    chatId: 124113,
    text: 'I accept your request for tutoring.',
    thumbnail:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
  },
  {
    recieved: false,
    firstName: 'Janet',
    lastName: 'Lee',
    chatId: 231412,
    text: 'But I never asked for tutoring creep. ',
    thumbnail:
      'https://sundaydigital.com.au/wp-content/uploads/2019/04/sample-avatar-003.jpg'
  }
];

export default function Chat({ match, history, ...props }) {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [avatars, setAvatars] = useState('');
  const [otherUsers, setOtherUsers] = useState([]);
  // console.log(messages);
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
        // if (data.users[0]._id == user.id) {
        //   userAvatar data.users[0].image});
        // } else {
        //   const otheAvatar: data.users[1].image;
        // }
        console.log(data);
        setMessages(data.messages);
        console.log(messages);
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
          data.users.map((other) => {
            if (other._id !== user.id) {
              return (
                <h2 className='f-w-l u-m-l'>
                  {other.firstName} {other.lastName}
                </h2>
              );
            }
          })
        );
        // console.log(avatars.userAvatar);
      });
    },

    // Make database call to get messages
    // when page first loads here
    [match.params.chatId]
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
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }

  return (
    <section className='Chat-container'>
      <GoBack history={history} />
      {otherUsers}
      <div className='Chat-log' ref={chatLogRef}>
        {messages.map((message) => {
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
