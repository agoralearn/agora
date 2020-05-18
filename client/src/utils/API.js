import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: (id) => {
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpUser: (user) => {
    return axios.post('/api/user', user);
  },
  getTutors: (filters) => {
    return axios.get('/api/tutors', { params: filters });
  },
  getTutorsById: (id) => {
    return axios.get('/api/tutors/' + id);
  },
  getChat: (chatId) => {
    return axios.get('/api/chat/' + chatId);
  },
  startChat: (userId1, userId2) => {
    return axios.post('/api/chat', { userIds: [userId1, userId2] });
  },
  addMessageToChat: (chatId, message, userId) => {
    return axios.post('/api/chat/message', {
      chatId: chatId,
      message: message,
      userId: userId
    });
  },
  getChatsByUserId: () => {
    return axios.get('/api/chat/chats/:userId');
  }
};
