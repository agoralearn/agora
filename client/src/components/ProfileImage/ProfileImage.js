import React from 'react';
import './ProfileImage.scss';

export default function ProfileImage({
  profileImg,
  style,
  height = '100px',
  width = '100px'
}) {
  return (
    <div
      className='image-cropper'
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
