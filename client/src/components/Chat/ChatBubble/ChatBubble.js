import React from 'react';
import { useAuth } from '../../../utils/auth';

export default function ChatBubble({ text, sender, thumbnail }) {
  const { user } = useAuth();
  return (
    <div
      className={`Chat-message Chat-message${
        sender !== user.id ? '' : '--right'
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
    </div>
  );
}
