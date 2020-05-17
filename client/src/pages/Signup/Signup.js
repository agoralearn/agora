import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import API from '../../utils/API';
import { useAuth } from '../../utils/auth';

function Signup({ role = 'student' }) {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    role: role,
    minGroupSize: '',
    maxGroupSize: ''
  });

  const { isLoggedIn } = useAuth();

  const history = useHistory();

  if (isLoggedIn) {
    return <Redirect to='/' />;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    API.signUpUser(formState)
      .then((res) => {
        // once the student has signed up
        // send them to the tutor search page
        history.replace('/tutors');
      })
      .catch((err) => alert(err));
  };

  const handleChange = (event) => {
    console.log(event.target.name);
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className='container' style={{ marginTop: '100px' }}>
      <h1>Signup</h1>
      <form onSubmit={handleFormSubmit}>
        {/* student or tutor selection */}
        <label htmlFor='role'>I am signing up as a:</label>
        <select
          id='role'
          name='role'
          defaultValue={formState.role}
          onChange={handleChange}
        >
          <option name='role' value='student'>
            Student
          </option>
          <option name='role' value='tutor'>
            Tutor
          </option>
        </select>
        <div className='form-group'>
          <label htmlFor='email'>Email address:</label>
          <input
            className='form-control'
            placeholder='Email goes here...'
            name='email'
            type='email'
            id='email'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='pwd'>Password:</label>
          <input
            className='form-control'
            placeholder='Password goes here...'
            name='password'
            type='password'
            id='pwd'
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='firstName'>First Name:</label>
          <input
            className='form-control'
            placeholder='First name goes here...'
            name='firstName'
            type='text'
            id='firstName'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name:</label>
          <input
            className='form-control'
            placeholder='Last name goes here...'
            name='lastName'
            type='text'
            id='lastName'
            onChange={handleChange}
          />
        </div>
        {formState.role === 'student' ? (
          <div className='form-group'>
            <label htmlFor='age'>Age:</label>
            <input
              className='form-control'
              placeholder='Age goes here...'
              name='age'
              type='age'
              id='age'
              onChange={handleChange}
            />
          </div>
        ) : (
          <>
            <div className='form-group'>
              <label htmlFor='minGroupSize'>Minimum Group Size:</label>
              <input
                className='form-control'
                placeholder='please enter a min number of students...'
                name='minGroupSize'
                type='minGroupSize'
                id='minGroupSize'
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='maxGroupSize'>Maximum Group Size:</label>
              <input
                className='form-control'
                placeholder='please enter a max number of students...'
                name='maxGroupSize'
                type='maxGroupSize'
                id='maxGroupSize'
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
      <p>
        <Link to='/login'>Go to Login</Link>
      </p>
    </div>
  );
}

export default Signup;
