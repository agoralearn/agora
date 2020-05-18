import React from 'react';
import './ChatPreview.scss';
// import ProfileImage from '../ProfileImage/ProfileImage';

function ChatPreview({ users, message }) {
  function buildMessagePreview() {
    const preview = message;
    const MAX_PREVIEW = 22;

    let isOverLength = false;
    const shortPrev = preview.split(' ');

    isOverLength = shortPrev.length > MAX_PREVIEW ? true : false;

    // const preview = { messages };
    return (
      <p>
        {shortPrev.slice(0, MAX_PREVIEW).join(' ')}
        {isOverLength ? <span>...</span> : null}
      </p>
    );
  }

  return (
    <div>
      {/* <ProfileImage profileImg={profileImg} />; */}
      <div>{buildMessagePreview()}</div>
    </div>
  );
}
export default ChatPreview;
