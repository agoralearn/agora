import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import API from '../../utils/API';
import { useAuth } from '../../utils/auth';
import { Container, Form, Header, Input, Radio } from 'semantic-ui-react';
import Button from '../../components/Button/Button';
import PageHeader from '../../components/PageHeader/PageHeader';

function Signup({ location }) {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    role: location.role || 'student',
    minGroupSize: '',
    maxGroupSize: '',
    disabled: true,
    agree: false
  });

  const { isLoggedIn, user, login } = useAuth();

  const history = useHistory();

  if (isLoggedIn && user) {
    return user.role === 'student' ? (
      <Redirect to='/tutors' />
    ) : (
      <Redirect to='/tutorbio' />
    );
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    API.signUpUser(formState)
      .then(() => {
        return login(formState.email, formState.password);
      })
      .then(() => {
        formState.role === 'student'
          ? history.replace('/tutors')
          : history.replace('/tutorbio');
      })
      .catch((err) => alert(err));
  };

  const isValid = () => {
    return (
      formState.firstName &&
      formState.lastName &&
      formState.email &&
      formState.password &&
      formState.agree
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
      disabled: !isValid()
    });
  };

  const handleRadioChange = (e, { value }) =>
    setFormState({ ...formState, role: value });

  const handleAgree = (e, { checked }) =>
    setFormState({ ...formState, agree: checked });

  return (
    <Container>
      <PageHeader>
        <h1>Create an Account</h1>
      </PageHeader>
      <Form onSubmit={handleFormSubmit}>
        <div className='Access-form'>
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
              required
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
              required
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
              required
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
              required
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
          <Form.Checkbox
            inline
            label='I agree to the terms and conditions'
            checked={formState.agree}
            required
            onChange={handleAgree}
          />

          <Button
            disabled={formState.disabled}
            type='submit'
            className='btn btn-primary'
          >
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
