import React from 'react';
import './ChatPreview.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { toTitleCase } from '../../utils/helpers';

function ChatPreview({ users, messages, chatId }) {
  const { user } = useAuth();

  function buildMessagePreview() {
    const preview = messages[0].message;
    const MAX_PREVIEW = 22;

    let isOverLength = false;
    const shortPrev = preview.split(' ');

    isOverLength = shortPrev.length > MAX_PREVIEW ? true : false;

    return (
      <span>
        {shortPrev.slice(0, MAX_PREVIEW).join(' ')}
        {isOverLength ? <span>...</span> : null}
      </span>
    );
  }

  let otherUsers = users.filter((person) => {
    return person._id !== user.id;
  });

  const renderOtherAvatars = () => {
    return otherUsers.slice(0, 3).map((user, index) => (
      <ProfileImage
        key={user._id}
        profileImg={user.image}
        height='45px'
        width='45px'
        className='bordered Chat_profile-imgs'
        style={{
          top: `${index * 4}px`,
          left: `${index * 10}px`,
          zIndex: `${index}`
        }}
      />
    ));
  };

  return (
    <Link to={`/chat/${chatId}`}>
      <div className='ChatPreview_wrapper'>
        <div className='ChatPreview_img-wrapper'>{renderOtherAvatars()}</div>

        <div className='ChatPreview_names-wrapper'>
          <p>
            {otherUsers.map(
              (user) =>
                `${toTitleCase(user.firstName)} ${toTitleCase(
                  user.lastName[0]
                )}, `
            )}
            me
          </p>
          <div className='f-w-l'>
            <i>{messages.length > 0 && buildMessagePreview()}</i>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default ChatPreview;
