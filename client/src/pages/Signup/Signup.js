import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import API from '../../utils/API';
import { useAuth } from '../../utils/auth';
import { Container, Form, Header, Input, Radio } from 'semantic-ui-react';
import Button from '../../components/Button/Button';
import PageHeader from '../../components/PageHeader/PageHeader';

function Signup({ role }) {
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

  const handleRadioChange = (e, { value }) =>
    setFormState({ ...formState, role: value });

  return (
    <Container>
      <PageHeader>
        <h1>Create an Account</h1>
      </PageHeader>
      <Form onSubmit={handleFormSubmit}>
        <div className='Login-form'>
          {/* student or tutor selection */}
          <Form.Group grouped>
            <label>I am signing up as a:</label>
            <Form.Field>
              <Radio
                label='Student'
                name='role'
                value='student'
                checked={formState.role === 'student'}
                onChange={handleRadioChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='Tutor'
                name='role'
                value='tutor'
                checked={formState.role === 'tutor'}
                onChange={handleRadioChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label htmlFor='email'>Email address:</label>
            <Input
              fluid
              icon='mail'
              placeholder='Email...'
              name='email'
              type='email'
              id='email'
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='pwd'>Password:</label>
            <Input
              fluid
              icon='lock'
              placeholder='Password...'
              name='password'
              type='password'
              id='pwd'
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor='firstName'>First Name:</label>
            <Input
              fluid
              icon='id badge outline'
              placeholder='First name...'
              name='firstName'
              type='text'
              id='firstName'
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='lastName'>Last Name:</label>
            <Input
              fluid
              icon='id badge outline'
              placeholder='Last name...'
              name='lastName'
              type='text'
              id='lastName'
              onChange={handleChange}
            />
          </Form.Field>
          {formState.role === 'student' ? (
            <Form.Field>
              <label htmlFor='age'>Age:</label>
              <Input
                fluid
                placeholder='Age...'
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
                <Input
                  fluid
                  placeholder='Min students per session...'
                  name='minGroupSize'
                  type='number'
                  id='minGroupSize'
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor='maxGroupSize'>Maximum Group Size:</label>
                <Input
                  fluid
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

Signup.defaultProps = {
  role: 'student'
};

export default Signup;
