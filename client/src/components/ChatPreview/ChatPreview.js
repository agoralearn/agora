import React from 'react';
import './ChatPreview.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import Modal from '../../components/Modal/Modal';
import RatingStars from '../RatingStars/RatingStars';

function ChatPreview({ users, message }) {
  // const currentUserName = users[0].firstName + users[0].lastName;
  const currentUserImage = users[0].image;
  const otherUserName = users[1].firstName + ' ' + users[1].lastName;
  const otherUserImage = users[1].image;
  const rating = 5;

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

  return (
    <div className='ChatPreview_wrapper'>
      <div className='profile_img_div'>
        <ProfileImage
          profileImg={currentUserImage}
          style={{ height: '20px', width: '20px' }}
        />
        <ProfileImage
          profileImg={otherUserImage}
          style={{ height: '20px', width: '20px' }}
        />
      </div>
      <div className='user-preview-div'>
        <p className='users'>{otherUserName}, me</p>
        <div className='message-preview'>{buildMessagePreview()}</div>
      </div>
      <div className='rate-tag'>
        <Modal
          trigger={<button className='rate-btn'>Rate </button>}
          header={`Rate ${otherUserName}`}
        >
          <RatingStars rating={rating} />
        </Modal>
      </div>
    </div>
  );
}
export default ChatPreview;
