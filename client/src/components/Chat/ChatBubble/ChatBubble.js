import React from 'react';
import { useAuth } from '../../../utils/auth';
import moment from 'moment';
import './ChatBubble.scss';

export default function ChatBubble({
  text,
  sender,
  previous,
  thumbnail,
  date
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
    >
      <span className='Chat-message__avatar-frame'>
        <img
          src={thumbnail}
          alt='avatar'
          className='Chat-message__avatar'
        ></img>
      </span>
      <p className='Chat-message__text'>{text}</p>
      <div className='Chat-message--date'>{moment(date).format('LT')}</div>
    </div>
  );
}
