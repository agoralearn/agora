import React from 'react';
import './ProfileImage.scss';

export default function ProfileImage({ profileImg, style }) {
  return (
    <div className='image-cropper' style={style}>
      <img src={profileImg} alt='avatar' className='profile-pic'></img>
    </div>
  );
}
