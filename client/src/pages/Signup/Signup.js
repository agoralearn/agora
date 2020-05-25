import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import API from '../../utils/API';
import { useAuth } from '../../utils/auth';
import {
  Container,
  Form,
  Header,
  Input,
  Radio,
  Message
} from 'semantic-ui-react';
import Button from '../../components/Button/Button';
import PageHeader from '../../components/PageHeader/PageHeader';

function Signup({ location }) {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '1',
    role: location.role || 'student',
    minGroupSize: '1',
    maxGroupSize: '1',
    image: 'https://utulsa.edu/wp-content/uploads/2018/08/generic-avatar.jpg',
    agree: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, user, login } = useAuth();
  const history = useHistory();

  if (isLoggedIn && user) {
    return user.role === 'student' ? (
      <Redirect to='/tutors' />
    ) : (
      <Redirect to='/profile' />
    );
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!formState.agree) {
      return setError('You must agree to the Terms & Conditions.');
    }
    if (formState.password !== formState.confirmPassword) {
      return setError('Your passwords do not match.');
    }
    if (formState.role === 'tutor') {
      if (formState.maxGroupSize < formState.minGroupSize) {
        return setError(
          'Maximum group size must be greater than minimum group size.'
        );
      }
    }

    setLoading(true);
    API.signUpUser(formState)
      .then(() => {
        return login(formState.email, formState.password);
      })
      .then(() => {
        formState.role === 'student'
          ? history.replace('/tutors')
          : history.replace('/onboarding');
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleRadioChange = (e, { value }) =>
    setFormState({ ...formState, role: value });

  const handleAgree = (e, { checked }) => {
    setFormState({ ...formState, agree: checked });
  };

  return (
    <Container>
      <PageHeader>
        <h2>Create an Account</h2>
      </PageHeader>
      <Form onSubmit={handleFormSubmit} error={error !== ''} loading={loading}>
        <div className='Access-form'>
          {/* student or tutor selection */}
          <Form.Group grouped>
            <label>I am signing up as a</label>
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
            <label htmlFor='email'>Email address</label>
            <Input
              required
              fluid
              icon='mail'
              iconPosition='left'
              placeholder='Email...'
              name='email'
              type='email'
              id='email'
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field error={formState.passwordError}>
            <label htmlFor='pwd'>Password</label>
            <Input
              required
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password...'
              name='password'
              type='password'
              id='pwd'
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='confPwd'>Confirm Password</label>
            <Input
              required
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password...'
              name='confirmPassword'
              type='Password'
              id='confPwd'
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor='firstName'>First Name</label>
            <Input
              required
              fluid
              icon='id badge outline'
              iconPosition='left'
              placeholder='First name...'
              name='firstName'
              type='text'
              id='firstName'
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='lastName'>Last Name</label>
            <Input
              required
              fluid
              icon='id badge outline'
              iconPosition='left'
              placeholder='Last name...'
              name='lastName'
              type='text'
              id='lastName'
              onChange={handleChange}
            />
          </Form.Field>
          {formState.role === 'student' && (
            <Form.Field>
              <label htmlFor='age'>Age</label>
              <Input
                required
                fluid
                placeholder='Age...'
                name='age'
                type='number'
                min='1'
                id='age'
                onChange={handleChange}
              />
            </Form.Field>
          )}
          <Form.Checkbox
            required
            inline
            label='I agree to the terms and conditions'
            checked={formState.agree}
            onChange={handleAgree}
          />
          <Message error header='Whoops!' content={error} />
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
