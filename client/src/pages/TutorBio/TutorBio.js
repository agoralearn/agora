import React from 'react';
// import API from './../utils/API';
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

function Profile() {
  const { firstName, lastName } = testTutorData;
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
        <MessageModal />
      </Modal>
      Tutor Bio
    </div>
  );
}

export default Profile;
