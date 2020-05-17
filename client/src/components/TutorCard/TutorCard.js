import React from 'react';
import './TutorCard.scss';
import Badge from '../Badge/Badge';
import ProfileImage from '../ProfileImage/ProfileImage';
import RatingStars from '../RatingStars/RatingStars';
import Button from '../Button/Button';

function TutorCard({ name, subjects, bio, rating, sessions, profileImg }) {
  function buildBioDisplay() {
    const MAX_BIO_LENGTH = 22;

    let isOverLength = false;
    let shortBio = bio.split(' ');

    isOverLength = shortBio.length > MAX_BIO_LENGTH ? true : false;

    return (
      <p>
        {shortBio.slice(0, MAX_BIO_LENGTH).join(' ')}
        {isOverLength ? (
          <span>
            ... <Button.Link>more</Button.Link>
          </span>
        ) : null}
      </p>
    );
  }

  return (
    <div className='TutorCard_wrapper'>
      <ProfileImage profileImg={profileImg} />

      <div className='TutorCard_content'>
        <div>
          <h2>{name}</h2>
        </div>
        <div className='TutorCard_badges-subjects'>
          {subjects.map((subject, index) => {
            if (index < 3) {
              return <Badge key={subject}>{subject}</Badge>;
            }
          })}

          {subjects.length > 3 ? (
            <Badge>
              <i className='fas fa-ellipsis-h'></i>
            </Badge>
          ) : null}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <RatingStars rating={rating} />
          <span>({sessions})</span>
        </div>
        <div>{buildBioDisplay()}</div>
      </div>
    </div>
  );
}

TutorCard.defaultProps = {
  name: 'Jim Halpert',
  subjects: ['Math', 'English', 'Algebra', 'Biology'],
  bio:
    'This is a short description about me. It will have a maximum character length before it is cut off with a show more button.',
  rating: 4.5,
  sessions: 10,
  profileImg:
    'https://static01.nyt.com/images/2020/04/26/multimedia/26ah-watch-krasinski-03/26ah-watch-krasinski-03-mediumSquareAt3X.png'
};
export default TutorCard;
