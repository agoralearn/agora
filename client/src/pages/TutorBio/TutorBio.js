import React, { useState } from 'react';
import API from '../../utils/API';
// import { useAuth } from '../utils/auth';
import Modal from '../../components/Modal/Modal';
import MessageModal from '../../components/MessageModal/MessageModal';
import Button from '../../components/Button/Button';

const testTutorData = {
  firstName: 'Tylor',
  lastName: 'Kolbeck',
  role: 'tutor',
  image: '',
  bio: 'This is my bio',
  subjects: ['Math', 'English', 'Things'],
  minGroupSize: 1,
  maxGroupSize: 10,
  age: 30,
  education: ['High School Drop Out'],
  rating: 2.3,
  price: 900
};
// matthew bishop userIds: ['5ec196146b0a58981818945a']

function Profile({ match }) {
  console.log(match.params.userId);
  const { firstName, lastName } = testTutorData;
  const [chatState, setChatState] = useState({
    userIds: [match.params.userId],
    message: ''
  });
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
  // const [messageModalOpen, setMessageModalOpen] = useState(false);
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // // const { user } = useAuth();

  // useEffect(() => {
  //   API.getUser(user.id).then((res) => {
  //     setUsername(res.data.username);
  //     setEmail(res.data.email);
  //   });
  // }, [user]);

  return (
    <div>
      <Modal
        trigger={
          <Button className='btn-primary' style={{ margin: '20px' }}>
            Book{' '}
          </Button>
        }
        header={`Contact ${firstName} ${lastName}`}
      >
        <MessageModal
          onMessageChange={handleChange}
          handleFormSubmit={handleFormSubmit}
        />
      </Modal>
      Tutor Bio
    </div>
  );
}

export default Profile;
