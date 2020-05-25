import React from 'react';
// { useRef, useEffect, useState }
import './ProfileImage.scss';

export default function ProfileImage({
  profileImg,
  style,
  height = '100px',
  width = '100px',
  className,
  online,
  status
}) {
  return (
    <div
      className={`image-cropper status ${className} ${
        !online && status && 'offline'
      }
      ${online && status && 'online'}
   `}
      style={{ ...style, height: height, width: width }}
    >
      <img
        src={profileImg}
        alt='avater'
        className='profile-pic'
        style={{ height: height, width: width }}
      ></img>
    </div>
  );
}
