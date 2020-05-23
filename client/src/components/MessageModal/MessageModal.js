import React, { useState } from 'react';
import { Form, TextArea, Modal, Message, Checkbox } from 'semantic-ui-react';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import MultiAdd from '../MultiAdd/MultiAdd';

function SignUpErrorMessage(handleModalToggle) {
  return (
    <Message.Header>
      Log in to book a tutor!
      <div>
        <Link to='/login'>
          <Button.Link>
            {' '}
            Login{' '}
            <i
              className='fas fa-arrow-right'
              style={{ marginRight: '4px' }}
            ></i>
          </Button.Link>
        </Link>
      </div>
      <div>
        <Link to='/signup'>
          <Button.Link>
            {' '}
            Signup{' '}
            <i
              className='fas fa-arrow-right'
              style={{ marginRight: '4px' }}
            ></i>
          </Button.Link>
        </Link>
      </div>
      <Button
        className='btn-secondary u-m-r'
        style={{ marginTop: '20px' }}
        onClick={handleModalToggle}
      >
        Cancel
      </Button>
    </Message.Header>
  );
}

export default function MessageModal({
  handleMessageChange,
  handleFormSubmit,
  handleModalToggle,
  modalError,
  isOpen,
  isLoggedIn
}) {
  const [isGroup, setIsGroup] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  return (
    <Modal open={isOpen}>
      {isLoggedIn ? (
        <div>
          {' '}
          <Form.Field>
            <Checkbox
              radio
              label='One on One'
              name='checkboxRadioGroup'
              value='this'
              checked={!isGroup}
              onChange={() => {
                setIsGroup(false);
              }}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label='Group'
              name='checkboxRadioGroup'
              value='that'
              checked={isGroup}
              onChange={() => {
                setIsGroup(true);
              }}
            />
          </Form.Field>
          {isGroup && (
            <MultiAdd
              selectedStudents={selectedStudents}
              setSelectedStudents={setSelectedStudents}
            />
          )}
          <p style={{ paddingBottom: '20px' }}>
            Write a short message on what you would like to get help with. Also
            tell your tutor what days and times would work best to meet.
          </p>
          {modalError && <Message error header={modalError} />}
          <Form>
            <TextArea
              name='message'
              placeholder='I would like to receive tutoring on...'
              onChange={handleMessageChange}
            />
            <Button
              className='btn-secondary u-m-r'
              style={{ marginTop: '20px' }}
              onClick={handleModalToggle}
            >
              Cancel
            </Button>
            <Button
              className='btn-primary'
              style={{ marginTop: '20px' }}
              onClick={(event) => handleFormSubmit(event, selectedStudents)}
            >
              Send
            </Button>
          </Form>
        </div>
      ) : (
        SignUpErrorMessage(handleModalToggle)
      )}
    </Modal>
  );
}
