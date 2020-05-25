import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import { useAuth } from '../../utils/auth';
import MessageModal from '../../components/MessageModal/MessageModal';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import GoBack from '../../components/GoBack/GoBack';
import PageHeader from '../../components/PageHeader/PageHeader';
import CheckInboxHelper from '../../components/Helpers/CheckInbox';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dimmer,
  Loader,
  Grid,
  Image,
  Container,
  Statistic,
  Icon
} from 'semantic-ui-react';
import './TutorBio.scss';

function TutorBio({ match }) {
  const [tutor, setTutor] = useState({});
  const [loading, setLoading] = useState(true);
  const [chatState, setChatState] = useState({
    userIds: [match.params.userId],
    message: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [helperVisible, setHelperVisible] = useState(false);
  const [tutorError, setTutorError] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    API.getTutorById(match.params.userId)
      .then((res) => {
        if (!res.data) {
          setTutorError(true);
        } else {
          setTutor(res.data);
        }
      })
      .catch((err) => {
        setTutorError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [match.params.userId]);

  function startChat(userIds) {
    if (chatState.message.trim() !== '') {
      API.startChat({ userIds: userIds, message: chatState.message })
        .then((res) => {
          toast.success('Your request was sent!');
          setHelperVisible(true);
        })
        .catch((err) => {
          toast.error('There was an issues sending your request. ');
        });
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

  function handleFormSubmit(event, selectedStudents) {
    event.preventDefault();
    const userIds = selectedStudents
      ? [match.params.userId, ...selectedStudents.map((student) => student._id)]
      : chatState.userIds;
    if (chatState.message.trim() < 5) {
      setInputError('Please enter at least 5 characters to your tutor.');
    } else {
      startChat(userIds);
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

  function renderTutorError() {
    return (
      <div>
        {tutorError ? (
          <PageHeader hr={false}>
            <h2>Whoops!</h2>
            <h2>Tutor Not Found</h2>
          </PageHeader>
        ) : null}
      </div>
    );
  }

  return (
    <Container className='TutorBio_wrapper' style={{ minWidth: '100vw' }}>
      <div
        style={{
          position: 'absolute',
          top: '80px',
          left: '20px',
          zIndex: 1
        }}
      >
        <GoBack className='color-white' />
      </div>
      {helperVisible && (
        <CheckInboxHelper
          setHelperVisible={(option) => setHelperVisible(option)}
        />
      )}

      <MessageModal
        isOpen={modalOpen}
        handleFormSubmit={handleFormSubmit}
        handleModalToggle={handleModalToggle}
        handleMessageChange={handleMessageChange}
        modalError={inputError}
        isLoggedIn={isLoggedIn}
        tutorId={match.params.userId}
      />

      <ToastContainer />

      {loading || tutorError ? (
        tutorError ? (
          renderTutorError()
        ) : (
          renderLoader()
        )
      ) : (
        <Grid>
          <Grid.Row
            className='background-primary'
            style={{
              textAlign: 'center'
            }}
          >
            <Grid.Column style={{ paddingTop: '20px' }}>
              <h1 className='color-white' style={{ letterSpacing: '1px' }}>
                {tutor.firstName} {tutor.lastName}
              </h1>
              <div style={{ paddingTop: '20px' }}>
                <Image
                  src={tutor.image}
                  circular
                  centered
                  className='u-m-b'
                  fluid
                  style={{ height: 'auto', width: '30%', maxWidth: '250px' }}
                />
              </div>

              <Grid.Row style={{ marginBottom: '30px' }}>
                <Grid.Column style={{ maxWidth: '300px', margin: '0 auto' }}>
                  <Statistic.Group widths='two' size='mini'>
                    <Statistic inverted>
                      <Statistic.Value>
                        <div>
                          <Icon
                            name='star'
                            color='yellow'
                            inverted
                            className='u-m-r'
                          />{' '}
                          {tutor.rating}
                        </div>
                      </Statistic.Value>
                    </Statistic>
                    <Statistic inverted>
                      <Statistic.Value>
                        ${tutor.price}
                        <span style={{ textTransform: 'lowercase' }}>
                          {' '}
                          / hr
                        </span>
                      </Statistic.Value>
                    </Statistic>
                  </Statistic.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ padding: '20px 0px 20px 0px' }}>
                <Button onClick={handleModalToggle} className='btn-primary'>
                  Book Now
                </Button>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row style={{ padding: '0px' }}>
            <Grid
              style={{
                width: '100%',
                padding: '20px',
                margin: '0px'
              }}
            >
              <Grid.Row columns={2} centered style={{ textAlign: 'center' }}>
                <Grid.Column
                  style={{
                    minWidth: '100%',
                    textAlign: 'center',
                    marginTop: '20px'
                  }}
                >
                  <div>
                    <h2>Education</h2>
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                      {tutor.education &&
                        tutor.education.map((ed) => (
                          <span key={ed} style={{ fontSize: '18px' }}>
                            {ed}{' '}
                          </span>
                        ))}
                      {tutor.education.length === 0 && (
                        <p>No Education Listed</p>
                      )}
                    </div>
                  </div>

                  <div style={{ paddingTop: '20px' }}>
                    <h2>Subjects</h2>
                    <div style={{ padding: '20px' }}>
                      {tutor.subjects ? (
                        tutor.subjects.map((subject) => {
                          return <Badge key={subject}>{subject}</Badge>;
                        })
                      ) : (
                        <p>No Subjects</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h2>Available For</h2>
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                      {tutor.timeFrame.map((timeframe) => {
                        return <Badge key={timeframe}>{timeframe}</Badge>;
                      })}
                      {tutor.timeFrame.length === 0 && (
                        <p>No preference on session type</p>
                      )}
                    </div>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Row>
          <Grid.Row
            style={{
              padding: '0px 20px',
              marginBottom: '200px',
              maxWidth: '750px',
              margin: '0 auto'
            }}
          >
            <h2 style={{ margin: '0 auto', paddingBottom: '10px' }}>
              About Me
            </h2>
            <div style={{ padding: '20px' }}>
              <p>{tutor.bio}</p>
            </div>
          </Grid.Row>
        </Grid>
      )}
    </Container>
  );
}

export default TutorBio;
