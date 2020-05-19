import React from 'react';
import './ChatPreview.scss';
import ProfileImage from '../ProfileImage/ProfileImage';

function ChatPreview({ users, message }) {
  // const currentUserName = users[0].firstName + users[0].lastName;
  const currentUserImage = users[0].image;
  const otherUserName = users[1].firstName + users[1].lastName;
  const otherUserImage = users[1].image;
  const profileImgStyle = '{height: 100% }';

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
        <ProfileImage profileImg={otherUserImage} />
      </div>
      <p>{otherUserName}, me</p>
      <div>{buildMessagePreview()}</div>
    </div>
  );
}
export default ChatPreview;
