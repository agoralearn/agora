import React, { useEffect, useState, useRef } from 'react';
import './Chat.scss';
import { useAuth } from '../../utils/auth';
import ChatBubble from '../../components/Chat/ChatBubble/ChatBubble';
import GoBack from '../../components/GoBack/GoBack';
import API from '../../utils/API';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Image, Modal, List } from 'semantic-ui-react';
import Button from '../../components/Button/Button';
import { useHistory } from 'react-router-dom';

export default function Chat({ match, height, width, miniChat, ...props }) {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [avatars, setAvatars] = useState('');
  const [otherUsers, setOtherUsers] = useState([]);
  const [usersFullData, setUsersFullData] = useState([]);
  const { trueWindowHeight, trueWindowWidth } = useWindowDimensions();
  const [userModalIsOpen, setUserModalIsOpen] = useState(false);

  const history = useHistory();
  // Get a ref to the chat log for scrolling
  // when submitting messages
  const chatLogRef = useRef(null);
  // const hiddenInput = useRef(null);
  const inputRef = useRef(null);
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

      const otherUsers = users.filter((person) => person._id !== user.id);

      otherUsers.forEach((user) => (avatarMap[user._id] = user.image));

      limitNameChars(users.filter((person) => person._id !== user.id));

      userNames.push(limitNameChars(otherUsers));
      setAvatars(avatarMap);
      setOtherUsers(userNames);
    }

    fetchUserMessages().then(({ data }) => {
      mapUserstoImages(data);
      setUsersFullData(data.users);
      setMessages(data.messages);
    });
  }, [match.params.chatId, user.id]);

  function joinSessionHandler() {
    history.push(`/whiteboard/${match.params.chatId}`, {
      participants: usersFullData
    });
  }

  function renderUserListModal(users) {
    return (
      <Modal
        open={userModalIsOpen}
        onClose={() => setUserModalIsOpen(false)}
        closeIcon
      >
        <Modal.Header>Participants</Modal.Header>
        <Modal.Content>
          <Button className='btn-primary' onClick={joinSessionHandler}>
            Start Session
          </Button>
        </Modal.Content>
        <Modal.Content>
          {users.map((person) => {
            return (
              <List.Item style={{ marginBottom: '5px' }}>
                <Image avatar src={person.image} />
                {person.firstName}
              </List.Item>
            );
          })}
        </Modal.Content>
      </Modal>
    );
  }

  function limitNameChars(users) {
    const names = [];
    const MAX_STRING_LENGTH = 30;

    users.forEach((user) => {
      names.push(user.firstName);
    });

    const usersJoined = names.join(', ');

    const returnString =
      usersJoined.length > MAX_STRING_LENGTH
        ? usersJoined.slice(0, MAX_STRING_LENGTH) + '... '
        : usersJoined;

    return (
      <>
        <p className='u-m-l' style={{ fontSize: '16px' }}>
          {returnString}
        </p>{' '}
        <span
          style={{
            color: '#3d348b',
            fontWeight: 'bold',
            marginLeft: '6px'
          }}
          onClick={() => setUserModalIsOpen(true)}
        >
          More
        </span>
      </>
    );
  }

  function messageInputSubmitHandler(event) {
    event.stopPropagation();
    event.preventDefault();

    /* For future work on mobile soft keyboard shnizzle */

    // hiddenInput.current.focus();

    // setTimeout(() => {
    //   hiddenInput.current.focus();
    //   setTimeout(() => {
    //     hiddenInput.current.style.display = 'none';
    //   }, 50);
    //     hiddenInput.current.style.display = 'block';
    // }, 50);

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
    <section
      className='Chat-container'
      style={{
        height: height ? height : trueWindowHeight - 60,
        maxWidth: width ? width : trueWindowWidth,
        display: 'fixed',
        paddingTop: miniChat && '0px'
      }}
    >
      <List>{userModalIsOpen && renderUserListModal(usersFullData)}</List>
      <div className='Chat-users-names' style={miniChat && { top: 0 }}>
        {!miniChat && <GoBack className='u-m-r' />}
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
              thumbnail={
                message.sender === user.id
                  ? user.image
                  : avatars[message.sender]
              }
              date={message.createdAt}
            />
          );
        })}
        <div ref={chatLogRef}></div>
      </div>

      <form
        className='Chat-input-area'
        action=''
        onSubmit={messageInputSubmitHandler}
      >
        <input
          ref={inputRef}
          type='text'
          placeholder='Write something...'
          className='Chat-input-area__input'
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        ></input>
        <button
          type='submit'
          className='Chat-input-area__submit-button'
          onClick={messageInputSubmitHandler}
        >
          <i className='fas fa-paper-plane'></i>
        </button>
      </form>
      {/* For future work on mobile soft keyboard shnizzle */}
      {/* <input ref={hiddenInput} type='text' ref={hiddenInput}></input> */}
    </section>
  );
}
