import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
// import { useAuth } from '../utils/auth';
import Modal from '../../components/Modal/Modal';
import MessageModal from '../../components/MessageModal/MessageModal';
import Button from '../../components/Button/Button';
import { Dimmer, Loader, List, Container } from 'semantic-ui-react';

function TutorBio({ match }) {
  const [tutor, setTutor] = useState(null);
  const [chatState, setChatState] = useState({
    userIds: [match.params.userId],
    message: ''
  });

  useEffect(() => {
    API.getTutorById(match.params.userId)
      .then((res) => {
        console.log(res.data);
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
    <div>
      {!tutor ? (
        renderLoader()
      ) : (
        <>
          <Modal
            trigger={
              <Button className='btn-primary' style={{ margin: '20px' }}>
                Book{' '}
              </Button>
            }
            header={`Contact ${tutor.firstName} ${tutor.lastName}`}
          >
            <MessageModal
              onMessageChange={handleChange}
              handleFormSubmit={handleFormSubmit}
            />
          </Modal>
          <Container>
            <h3>Subjects</h3>
            <List horizontal>
              {tutor.subjects.map((subject) => (
                <List.Item key={subject}>{subject}</List.Item>
              ))}
            </List>
          </Container>
        </>
      )}
    </div>
  );
}

export default TutorBio;
