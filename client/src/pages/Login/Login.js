import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import PageHeader from '../../components/PageHeader/PageHeader';
import Button from '../../components/Button/Button';
import { Container, Form, Header, Input, Message } from 'semantic-ui-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, login, user } = useAuth();
  const history = useHistory();

  if (isLoggedIn && user) {
    return user.role === 'student' ? (
      <Redirect to='/tutors' />
    ) : (
      <Redirect to={'/profile'} />
    );
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    login(email, password)
      // navigate to the profile page
      .then(() => history.push('/profile'))
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <Container>
      <PageHeader>
        <h2>Login</h2>
      </PageHeader>
      <Form onSubmit={handleFormSubmit} error={error !== ''} loading={loading}>
        <div className='Access-form'>
          <Form.Field>
            <label htmlFor='email'>Email address</label>
            <Input
              fluid
              required
              placeholder='Email...'
              icon='mail'
              iconPosition='left'
              name='email'
              type='email'
              id='email'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='pwd'>Password</label>
            <Input
              fluid
              required
              placeholder='Password...'
              icon='lock'
              iconPosition='left'
              name='password'
              type='password'
              id='pwd'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Field>
          <Message error header='Authentication Error' content={error} />
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
