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
  updateUser: () => {
    return axios.patch('/api/user');
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
  addMessageToChat: (chatId, message) => {
    return axios.post('/api/chat/message', {
      chatId: chatId,
      message: message
    });
  },
  getChatsByUserId: () => {
    return axios.get('/api/chat/chats');
  }
};
