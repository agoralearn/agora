import React from 'react';
import './ProfileImage.scss';

export default function ProfileImage({ profileImg }) {
  return (
    <div className='image-cropper'>
      <img src={profileImg} alt='avater' className='profile-pic'></img>
    </div>
  );
}
