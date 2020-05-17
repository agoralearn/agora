import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: (id) => {
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpStudent: (firstname, lastname, email, password) => {
    return axios.post('api/student', {
      email: email,
      password: password,
      age: age,
      firstname: firstname,
      lastname: lastname
    });
  }
};
