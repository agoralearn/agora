import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import PageHeader from '../../components/PageHeader/PageHeader';
import Button from '../../components/Button/Button';
import { Container, Form, Header, Input } from 'semantic-ui-react';
import './Login.scss';

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
        <div className='Access-form'>
          <Form.Field>
            <label htmlFor='email'>Email address:</label>
            <Input
              fluid
              placeholder='Email...'
              icon='mail'
              name='email'
              type='email'
              id='email'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='pwd'>Password:</label>
            <Input
              fluid
              placeholder='Password...'
              icon='lock'
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
          <Header as='h4'>
            Don't have an account?{' '}
            <Link to='signup'>
              <Button.Link> Signup here</Button.Link>
            </Link>
          </Header>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
