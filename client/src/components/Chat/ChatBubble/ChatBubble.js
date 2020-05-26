import React from 'react';
import { useAuth } from '../../../utils/auth';
import moment from 'moment';
import './ChatBubble.scss';

export default function ChatBubble({
  text,
  sender,
  thumbnail,
  date,
  children,
  style,
  previous
}) {
  const { user } = useAuth();
  return (
    <div
      className={`Chat-message Chat-message${
        sender !== user.id ? '--left' : '--right'
      } ${
        sender !== previous
          ? 'Chat-message-new-sender'
          : 'Chat-message-same-sender'
      }`}
      style={style}
    >
      <span className='Chat-message__avatar-frame'>
        <img
          src={thumbnail}
          alt='avatar'
          className='Chat-message__avatar'
        ></img>
      </span>
      <div className='Chat-message__text'>
        {text}
        <div>{children}</div>
      </div>
      {/* <div className='Chat-message__text'>{children}</div> */}

      <div className='Chat-message--date'>{moment(date).format('LT')}</div>
    </div>
  );
}
