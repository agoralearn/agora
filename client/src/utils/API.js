import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: () => {
    return axios.get('/api/user');
  },
  // sign up a user to our service
  signUpUser: (user) => {
    return axios.post('/api/user', user);
  },
  updateUser: (userInfo) => {
    return axios.patch('/api/user', userInfo);
  },
  getTutors: (filters) => {
    return axios.get('/api/tutors', { params: filters });
  },
  getTutorById: (id) => {
    return axios.get('/api/tutors/' + id);
  },
  getChat: (chatId) => {
    return axios.get('/api/chat/' + chatId);
  },
  startChat: (chatData) => {
    return axios.post('/api/chat', chatData);
  },
  addMessageToChat: (messageDetails) => {
    return axios.post('/api/chat/message', messageDetails);
  },
  getChatsByUserId: () => {
    return axios.get('/api/chat/chats');
  },
  getUsersNameById: (id) => {
    return axios.get(`/api/user/${id}`);
  },
  getStudentByName: (student) => {
    return axios.get('/api/user/student', { params: student });
  }
};
