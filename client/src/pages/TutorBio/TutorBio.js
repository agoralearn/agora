import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import { useAuth } from '../../utils/auth';
import Modal from '../../components/Modal/Modal';
import MessageModal from '../../components/MessageModal/MessageModal';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import GoBack from '../../components/GoBack/GoBack';
import PageHeader from '../../components/PageHeader/PageHeader';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import { Dimmer, Loader, List, Container, Grid, Icon } from 'semantic-ui-react';
import './TutorBio.scss';

function TutorBio({ match }) {
  const [tutor, setTutor] = useState(null);
  const [chatState, setChatState] = useState({
    userIds: [match.params.userId],
    message: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    API.getTutorById(match.params.userId)
      .then((res) => {
        setTutor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [match.params.userId]);

  function startChat() {
    console.log(chatState);
    if (chatState.message.trim() !== '') {
      API.startChat(chatState)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    return;
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
    startChat();
    setChatState({ ...chatState, message: '' });
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
      {!tutor ? (
        renderLoader()
      ) : (
        <div>
          <GoBack />
          <Container>
            <PageHeader>
              <h2>{`${tutor.firstName} ${tutor.lastName}`}</h2>
            </PageHeader>
            <ProfileImage
              profileImg={tutor.image}
              style={{ margin: '0 auto 30px' }}
              className='u-m-b'
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
            {!user.id === match.params.userId ? (
              <Modal
                trigger={
                  <div className='bio-button-wrapper'>
                    <Button className='btn-primary' style={{ margin: '20px' }}>
                      Book Now
                    </Button>
                  </div>
                }
                header={`Contact ${tutor.firstName} ${tutor.lastName}`}
              >
                <MessageModal
                  onMessageChange={handleChange}
                  handleFormSubmit={handleFormSubmit}
                />
              </Modal>
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
            <h3 className='u-m-t u-m-b'>About Me</h3>
            <p>{tutor.bio}</p>
          </Container>
        </div>
      )}
    </div>
  );
}

export default TutorBio;
