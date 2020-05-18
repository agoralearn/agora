import React from 'react';
import './ChatPreview.scss';
import ProfileImage from '../ProfileImage/ProfileImage';

function ChatPreview({ profileImg }) {
  return (
    <div>
      <ProfileImage profileImg={profileImg} />;
    </div>
  );
}
