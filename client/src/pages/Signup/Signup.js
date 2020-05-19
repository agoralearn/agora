import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import API from '../../utils/API';
import { useAuth } from '../../utils/auth';
import { Container, Form, Header } from 'semantic-ui-react';
import Button from '../../components/Button/Button';
import PageHeader from '../../components/PageHeader/PageHeader';

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
    <Container>
      <PageHeader>
        <h1>Create an Account</h1>
      </PageHeader>
      <Form onSubmit={handleFormSubmit}>
        <div className='Login-form'>
          <Form.Field>
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
          </Form.Field>
          <Form.Field>
            <label htmlFor='email'>Email address:</label>
            <input
              placeholder='Email goes here...'
              name='email'
              type='email'
              id='email'
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='pwd'>Password:</label>
            <input
              placeholder='Password goes here...'
              name='password'
              type='password'
              id='pwd'
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor='firstName'>First Name:</label>
            <input
              placeholder='First name goes here...'
              name='firstName'
              type='text'
              id='firstName'
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='lastName'>Last Name:</label>
            <input
              placeholder='Last name goes here...'
              name='lastName'
              type='text'
              id='lastName'
              onChange={handleChange}
            />
          </Form.Field>
          {formState.role === 'student' ? (
            <Form.Field>
              <label htmlFor='age'>Age:</label>
              <input
                placeholder='Age goes here...'
                name='age'
                type='number'
                id='age'
                onChange={handleChange}
              />
            </Form.Field>
          ) : (
            <>
              <Form.Field>
                <label htmlFor='minGroupSize'>Minimum Group Size:</label>
                <input
                  placeholder='Min students per session...'
                  name='minGroupSize'
                  type='number'
                  id='minGroupSize'
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor='maxGroupSize'>Maximum Group Size:</label>
                <input
                  placeholder='Max students per session...'
                  name='maxGroupSize'
                  type='number'
                  id='maxGroupSize'
                  onChange={handleChange}
                />
              </Form.Field>
            </>
          )}
          <Button type='submit' className='btn btn-primary'>
            Submit
          </Button>
          <Header as='h4'>
            Already have an account?{' '}
            <Link to='login'>
              <Button.Link> Login here</Button.Link>
            </Link>
          </Header>
        </div>
      </Form>
    </Container>
  );
}

export default Signup;
