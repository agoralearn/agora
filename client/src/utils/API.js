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
  }
};
