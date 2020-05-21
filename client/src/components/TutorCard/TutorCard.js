import React from 'react';
import './TutorCard.scss';
import Badge from '../Badge/Badge';
import ProfileImage from '../ProfileImage/ProfileImage';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { Rating } from 'semantic-ui-react';

function TutorCard({
  name,
  subjects,
  bio,
  rating,
  sessions,
  profileImg,
  id,
  price
}) {
  function buildBioDisplay() {
    const MAX_BIO_LENGTH = 22;

    let isOverLength = false;
    const shortBio = bio.split(' ');

    isOverLength = shortBio.length > MAX_BIO_LENGTH ? true : false;

    return (
      <p className='TutorCard_bio-text'>
        {shortBio.slice(0, MAX_BIO_LENGTH).join(' ')}
        {isOverLength ? (
          <span>
            ...
            <Link to={`/tutorbio/${id}`}>
              <Button.Link>View Bio</Button.Link>
            </Link>
          </span>
        ) : null}
      </p>
    );
  }

  return (
    <div className='TutorCard_wrapper'>
      <div className='TutorCard_content'>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <ProfileImage profileImg={profileImg} height='50px' width='50px' />

          <div style={{ marginLeft: '10px' }}>
            <div style={{ width: '100%' }}>
              <h2>
                <Link to={`/tutorbio/${id}`}>
                  {name.firstName} {name.lastName}{' '}
                  <span className='f-w-l' style={{ fontSize: '1rem' }}>
                    ${price} / hr
                  </span>
                </Link>
              </h2>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline'
              }}
            >
              <Rating
                className='Rating-stars'
                icon='star'
                defaultRating={rating}
                maxRating={5}
                disabled
              />
              ({sessions ? sessions : Math.floor(Math.random() * 20)})
            </div>
            {/* Subjects */}
            <div className='TutorCard_badges-subjects'>
              {subjects.map((subject, index) => {
                if (index < 3) {
                  return <Badge key={subject}>{subject}</Badge>;
                }
                return null;
              })}

              {subjects.length > 3 ? (
                <Badge>
                  <i className='fas fa-ellipsis-h'></i>
                </Badge>
              ) : null}
            </div>
          </div>
        </div>

        <div>{buildBioDisplay()}</div>
      </div>
    </div>
  );
}

TutorCard.defaultProps = {
  name: {
    firstName: 'Tylor',
    lastName: 'Kolbeck'
  },
  subjects: ['Math', 'English', 'Algebra', 'Biology'],
  bio:
    'This is a short description about me. It will have a maximum character length before it is cut off with a show more button.',
  rating: 4.5,
  sessions: false,
  profileImg:
    'https://static01.nyt.com/images/2020/04/26/multimedia/26ah-watch-krasinski-03/26ah-watch-krasinski-03-mediumSquareAt3X.png'
};
export default TutorCard;
