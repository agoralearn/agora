import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import { useAuth } from '../../utils/auth';
import { Link } from 'react-router-dom';
import MessageModal from '../../components/MessageModal/MessageModal';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import GoBack from '../../components/GoBack/GoBack';
import PageHeader from '../../components/PageHeader/PageHeader';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import {
  Dimmer,
  Loader,
  List,
  Container,
  Grid,
  Icon,
  Message
} from 'semantic-ui-react';
import './TutorBio.scss';

function TutorBio({ match }) {
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatState, setChatState] = useState({
    userIds: [match.params.userId],
    message: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [inputError, setInputError] = useState(false);
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    API.getTutorById(match.params.userId)
      .then((res) => {
        setTutor(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [match.params.userId]);

  function startChat() {
    if (chatState.message.trim() !== '') {
      API.startChat(chatState)
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    return;
  }

  function handleModalToggle() {
    setModalOpen(!modalOpen);
    setInputError(false);
  }

  const handleMessageChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setChatState({
      ...chatState,
      [name]: value
    });
  };

  function handleFormSubmit(event) {
    event.preventDefault();

    if (chatState.message.trim() < 5) {
      setInputError('Please enter at least 5 characters to your tutor.');
    } else {
      startChat();
      setChatState({ ...chatState, message: '' });
      handleModalToggle();
    }
  }

  function renderLoader() {
    return (
      <Dimmer active inverted>
        <Loader inverted content='Loading' />
      </Dimmer>
    );
  }

  function renderPageHeader() {
    return !tutor ? (
      <PageHeader hr={false}>
        <h2>Whoops!</h2>
        <h2>Tutor Not Found</h2>
      </PageHeader>
    ) : (
      <PageHeader>
        <h2>{`${tutor.firstName} ${tutor.lastName}`}</h2>
      </PageHeader>
    );
  }

  return (
    <div className='bio-container'>
      {/* Modal */}

      {console.log(isLoggedIn)}
      <MessageModal
        isOpen={modalOpen}
        handleFormSubmit={handleFormSubmit}
        handleModalToggle={handleModalToggle}
        handleMessageChange={handleMessageChange}
        modalError={inputError}
        isLoggedIn={isLoggedIn}
      />

      <div>
        {/* GO BACK */}
        <div className='u-m-l'>
          <GoBack />
        </div>

        {/* PAGE HEADER */}
        {renderPageHeader()}

        {loading && renderLoader()}

        {tutor && !loading && (
          // TUTOR INFO
          <Container>
            <ProfileImage
              profileImg={tutor.image}
              style={{ margin: '0 auto 30px' }}
              className='u-m-b'
              height='200px'
              width='200px'
            />

            {/* BOOK NOW BUTTON */}
            {!(user && user.id === match.params.userId) && (
              <Button
                className='btn-primary'
                style={{ margin: '20px' }}
                onClick={handleModalToggle}
              >
                Book Now
              </Button>
            )}

            <h3 className='u-m-t u-m-b'>Subjects</h3>
            <List horizontal>
              {tutor.subjects.map((subject) => (
                <List.Item className='color-secondary' key={subject}>
                  <Badge>{subject}</Badge>
                </List.Item>
              ))}
            </List>
            <h3 className='u-m-t u-m-b'>Education</h3>

            <List horizontal>
              {tutor.education.map((edu) => (
                <List.Item className='color-secondary' key={edu}>
                  <Badge>{edu}</Badge>
                </List.Item>
              ))}
            </List>

            <h3 className='u-m-t u-m-b'>About Me</h3>
            <p>{tutor.bio}</p>
          </Container>
        )}
      </div>
    </div>
  );
}

export default TutorBio;
