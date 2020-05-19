import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import PageHeader from '../../components/PageHeader/PageHeader';
import Button from '../../components/Button/Button';
import { Container, Form } from 'semantic-ui-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, login } = useAuth();
  const history = useHistory();

  if (isLoggedIn) {
    return <Redirect to='/' />;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    login(email, password)
      // navigate to the profile page
      .then(() => history.push('/profile'))
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <Container>
      <PageHeader>
        <h1>Login</h1>
      </PageHeader>
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <label htmlFor='email'>Email address:</label>
          <input
            placeholder='Email...'
            name='email'
            type='email'
            id='email'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor='pwd'>Password:</label>
          <input
            placeholder='Password...'
            name='password'
            type='password'
            id='pwd'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Field>
        <Button type='submit' className='btn btn-primary'>
          Submit
        </Button>
      </Form>
      <p>
        <Link to='/signup'>Don't have an account? Signup here</Link>
      </p>
    </Container>
  );
}

export default Login;
