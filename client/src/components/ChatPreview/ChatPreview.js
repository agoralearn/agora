import React from 'react';
import './ChatPreview.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { toTitleCase } from '../../utils/helpers';
import moment from 'moment';

function ChatPreview({ users, messages, chatId, date, style }) {
  const { user, state = { unread: [] }, setState } = useAuth();
  const history = useHistory();

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

  function openChatHandler() {
    setState({
      unread: state.unread.filter((id) => {
        return id !== chatId;
      })
    });
    history.push(`/chat/${chatId}`);
  }

  const otherUsers = users.filter((person) => {
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
    <div className='ChatPreview_wrapper' onClick={openChatHandler}>
      <div className='ChatPreview_img-wrapper'>{renderOtherAvatars()}</div>

      <div className='ChatPreview_names-wrapper' style={{ ...style }}>
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
          <div>
            <i>{moment(date).format('LT')}</i>
          </div>
          {messages.length > 0 && buildMessagePreview()}
        </div>
      </div>
    </div>
  );
}
export default ChatPreview;
