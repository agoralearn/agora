import React from 'react';
// import { useAuth } from '../../utils/auth';
// const { user } = useAuth();

export default function ChatBubble({ text, recieved, thumbnail }) {
  return (
    <div className={`Chat-message Chat-message${recieved ? '' : '--right'}`}>
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
