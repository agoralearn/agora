/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import './Chat.scss';
import { useAuth } from '../../utils/auth';
import ChatBubble from '../../components/Chat/ChatBubble/ChatBubble';
import GoBack from '../../components/GoBack/GoBack';
import API from '../../utils/API';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Image, Modal, List } from 'semantic-ui-react';
import Button from '../../components/Button/Button';
import TruncatedUserNames from '../../components/TruncatedUserNames/TruncatedUserNames';
import RatingMessage from '../../components/SpecialButtons/RatingMsg';
import SessionMessage from '../../components/SpecialButtons/SessionMsg';

export default function Chat({ match, height, width, miniChat, ...props }) {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [avatars, setAvatars] = useState('');
  const [otherUsers, setOtherUsers] = useState([]);
  const [usersFullData, setUsersFullData] = useState([]);
  const { trueWindowHeight, trueWindowWidth } = useWindowDimensions();
  const [userModalIsOpen, setUserModalIsOpen] = useState(false);

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

      const otherUsers = users.filter((person) => person._id !== user.id);

      otherUsers.forEach((user) => (avatarMap[user._id] = user.image));

      setAvatars(avatarMap);

      setOtherUsers(otherUsers);
    }

    fetchUserMessages().then(({ data }) => {
      mapUserstoImages(data);
      setUsersFullData(data.users);
      setMessages(data.messages);
    });
  }, [match.params.chatId, user.id]);

  function renderUserListModal(users) {
    return (
      <Modal
        open={userModalIsOpen}
        onClose={() => setUserModalIsOpen(false)}
        closeIcon
      >
        <Modal.Header>Participants</Modal.Header>
        <Modal.Content>
          <div style={{ display: 'flex' }}>
            <Button
              className='btn-primary'
              onClick={(event) =>
                messageInputSubmitHandler(
                  event,
                  'Session Request',
                  'sessionMsg'
                )
              }
            >
              Start Session
            </Button>
            <Button
              className='btn-primary u-m-l'
              onClick={(event) =>
                messageInputSubmitHandler(event, 'Rating Request', 'ratingMsg')
              }
            >
              Request Rating
            </Button>
          </div>
        </Modal.Content>
        <Modal.Content>
          {users.map((person) => {
            return (
              <List.Item
                key={'list_' + person._id}
                style={{ marginBottom: '5px' }}
              >
                <Image avatar src={person.image} />
                {person.firstName}
              </List.Item>
            );
          })}
        </Modal.Content>
      </Modal>
    );
  }

  function messageInputSubmitHandler(
    event,
    message = false,
    specialMsgType = false
  ) {
    event.stopPropagation();
    event.preventDefault();

    if (messageInput.trim() || specialMsgType) {
      const newMessage = {
        read: [user.id],
        sender: user.id,
        message: message || messageInput,
        chatId: match.params.chatId,
        specialMsg: specialMsgType,
        receivers: usersFullData
          .filter((person) => person._id !== user.id)
          .map((person) => person._id)
      };
      sendMessage(newMessage);
      setUserModalIsOpen(false);
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

        {/* The users names truncated */}
        <TruncatedUserNames
          users={otherUsers}
          handleModalOpen={setUserModalIsOpen}
          modal
        />
      </div>
      <div className='Chat-log'>
        {messages.map((message, index) => {
          if (message.specialMsg) {
            let specialMessage;
            switch (message.specialMsg) {
              case 'ratingMsg':
                specialMessage = specialMessage = <RatingMessage />;
                break;
              case 'sessionMsg':
                specialMessage = (
                  <SessionMessage
                    sessionId={match.params.chatId}
                    participants={usersFullData}
                  />
                );
                break;
              default:
                break;
            }

            return (
              <ChatBubble
                style={{ marginBottom: '10px' }}
                key={message._id}
                text={''}
                recieved={message.read}
                sender={message.sender}
              >
                {specialMessage}
              </ChatBubble>
            );
          } else {
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
          }
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
