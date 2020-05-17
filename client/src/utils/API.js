import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: (id) => {
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpStudent: (username, email, password) => {
    return axios.post('api/user/student', {
      username: username,
      email: email,
      password: password
    });
  }
};
