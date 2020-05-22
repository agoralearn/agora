import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../utils/API';
import { useAuth } from '../../utils/auth';
import { Link } from 'react-router-dom';
import ModalWrapper from '../../components/Modal/Modal';
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
    resetInputError();
  }

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setChatState({
      ...chatState,
      [name]: value
    });
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (chatState.message === '') {
      setInputError(true);
    } else {
      startChat();
      setChatState({ ...chatState, message: '' });
      resetInputError();
      handleModalToggle();
      sentNotification();
    }
  }

  toast.configure();
  const sentNotification = () => {
    toast.success(`Message sent to ${tutor.firstName}!`, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  function resetInputError() {
    setInputError(false);
  }
  function renderLoader() {
    return (
      <Dimmer active inverted>
        <Loader inverted content='Loading' />
      </Dimmer>
    );
  }

  return (
    <div className='bio-container'>
      {loading ? (
        renderLoader()
      ) : (
        <div>
          <div className='u-m-l'>
            <GoBack />
          </div>
          {!tutor ? (
            <PageHeader hr={false}>
              <h2>Whoops!</h2>
              <h2>Tutor Not Found</h2>
            </PageHeader>
          ) : (
            <Container>
              <PageHeader>
                <h2>{`${tutor.firstName} ${tutor.lastName}`}</h2>
              </PageHeader>

              <ProfileImage
                profileImg={tutor.image}
                style={{ margin: '0 auto 30px' }}
                className='u-m-b'
                height='200px'
                width='200px'
              />
              <Grid className='text-center'>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <h5>Rating</h5>
                    <Icon name='star' color='yellow' />
                    {tutor.rating}
                  </Grid.Column>
                  <Grid.Column>
                    <h5>Cost</h5>${tutor.price} / hr
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {!(user && user.id === match.params.userId) ? (
                <ModalWrapper
                  open={modalOpen}
                  onClose={resetInputError}
                  trigger={
                    <div className='bio-button-wrapper'>
                      <Button
                        className='btn-primary'
                        style={{ margin: '20px' }}
                        onClick={handleModalToggle}
                      >
                        Book Now
                      </Button>
                    </div>
                  }
                  header={`Contact ${tutor.firstName} ${tutor.lastName}`}
                >
                  {!isLoggedIn ? (
                    <Message color='violet'>
                      <Message.Header>
                        Log in to book a tutor!
                        <div>
                          <Link to='/login'>
                            <Button.Link>
                              {' '}
                              Login{' '}
                              <i
                                className='fas fa-arrow-right'
                                style={{ marginRight: '4px' }}
                              ></i>
                            </Button.Link>
                          </Link>
                        </div>
                        <div>
                          <Link to='/signup'>
                            <Button.Link>
                              {' '}
                              Signup{' '}
                              <i
                                className='fas fa-arrow-right'
                                style={{ marginRight: '4px' }}
                              ></i>
                            </Button.Link>
                          </Link>
                        </div>
                      </Message.Header>
                    </Message>
                  ) : (
                    <div>
                      {inputError ? (
                        <Message
                          error
                          header='Whoops!'
                          content='You must provide a message.'
                        />
                      ) : null}
                      <MessageModal
                        onMessageChange={handleChange}
                        handleFormSubmit={handleFormSubmit}
                        handleModalToggle={handleModalToggle}
                      />
                    </div>
                  )}
                </ModalWrapper>
              ) : null}

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
              <h3 className='u-m-t u-m-b'>Available for</h3>
              <List horizontal>
                {tutor.timeFrame.map((time) => (
                  <List.Item className='color-secondary' key={time}>
                    <Badge>{time}</Badge>
                  </List.Item>
                ))}
              </List>
              <h3 className='u-m-t u-m-b'>About Me</h3>
              <p>{tutor.bio}</p>
            </Container>
          )}
        </div>
      )}
    </div>
  );
}

export default TutorBio;
