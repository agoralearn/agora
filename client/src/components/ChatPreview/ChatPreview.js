import React from 'react';
import './ChatPreview.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import Modal from '../../components/Modal/Modal';
import ReviewModal from '../../components/ReviewModal/ReviewModal';
import { Link } from 'react-router-dom';

function ChatPreview({ users, message, chatId }) {
  // const currentUserName = users[0].firstName + users[0].lastName;

  const currentUserImage = users[0].image;
  const otherUserName = users[1].firstName + ' ' + users[1].lastName;
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

  return (
    <div className='ChatPreview_wrapper'>
      <Link to={`/chat/${chatId}`}>
        <div className='ChatPreview_profile-img-div'>
          <ProfileImage
            profileImg={currentUserImage}
            style={{
              height: '25px',
              width: '25px',
              position: 'absolute',
              top: '0px',
              left: '0px',
              zIndex: '0'
            }}
          />
          <ProfileImage
            profileImg={otherUserImage}
            style={{
              height: '25px',
              width: '25px',
              position: 'absolute',
              top: '5px',
              left: '8px',
              zIndex: '1'
              // overflow: 'hidden',
              // borderColor: 'green',
              // borderWidth: '20'
            }}
          />
        </div>
        <div className='ChatPreview_user-preview-div'>
          <p className='ChatPreview_user-preview-div-users'>
            {otherUserName}, me
          </p>
          <div className='ChatPreview_user-preview-div-message-preview'>
            {message.length > 0 && buildMessagePreview()}
          </div>
        </div>
        <div className='ChatPreview_rate-tag'>
          <Modal
            trigger={
              <button className='ChatPreview_Modal-rate-btn'>Rate </button>
            }
            header={`Rate ${otherUserName}`}
          >
            <ReviewModal />
          </Modal>
        </div>
      </Link>
    </div>
  );
}
export default ChatPreview;
