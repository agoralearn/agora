import React from 'react';

function TutorCard() {
  return <div>Tutor Card...</div>;
}

TutorCard.defaultProps = {
  name: 'Science Guy',
  subjects: '',
  bio:
    'This is a short description about me. It will have a maximum character length before it is cut off with a show more button.',
  rating: 4.5,
  sessions: 10
};
export default TutorCard;
