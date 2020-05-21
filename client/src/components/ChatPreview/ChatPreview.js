import React from 'react';
import './ChatPreview.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import Modal from '../../components/Modal/Modal';
import ReviewModal from '../../components/ReviewModal/ReviewModal';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { toTitleCase } from '../../utils/helpers';

function ChatPreview({ users, message, chatId }) {
  // const currentUserName = users[0].firstName + users[0].lastName;
  const { user } = useAuth();
  const currentUserImage = users[0].image;
  const otherUserImage = users[1].image;

  function buildMessagePreview() {
    const preview = message[0].message;
    const MAX_PREVIEW = 22;

    let isOverLength = false;
    const shortPrev = preview.split(' ');

    isOverLength = shortPrev.length > MAX_PREVIEW ? true : false;

    return (
      <p>
        {shortPrev.slice(0, MAX_PREVIEW).join(' ')}
        {isOverLength ? <span>...</span> : null}
      </p>
    );
  }

  let otherUsers = users.filter((person) => {
    return person._id !== user.id;
  });

  otherUsers = [...otherUsers, ...otherUsers, ...otherUsers];

  const renderOtherAvatars = () => {
    return otherUsers.map((user, index) => (
      <ProfileImage
        profileImg={user.image}
        height='45px'
        width='45px'
        className='bordered'
        style={
          {
            // position: 'absolute',
            // top: `${index * 4}px`,
            // left: `${index * 4}px`,
            // zIndex: `${index}`
          }
        }
      />
    ));
  };

  return (
    <div className='ChatPreview_wrapper'>
      <Link to={`/chat/${chatId}`}>
        <div className='ChatPreview_profile-img-div'>
          {renderOtherAvatars()}
        </div>
        <div className='ChatPreview_user-preview-div'>
          <p className='ChatPreview_user-preview-div-users'>
            {otherUsers.map(
              (user) =>
                `${toTitleCase(user.firstName)} ${toTitleCase(user.lastName)}, `
            )}
            me
          </p>
          <div className='ChatPreview_user-preview-div-message-preview'>
            {message.length > 0 && buildMessagePreview()}
          </div>
        </div>
        <div className='ChatPreview_rate-tag'>
          <button className='ChatPreview_Modal-rate-btn'>Rate </button>
        </div>
      </Link>
    </div>
  );
}
export default ChatPreview;
