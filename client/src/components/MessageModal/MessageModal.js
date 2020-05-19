import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import Button from '../Button/Button';

export default function MessageModal() {
  return (
    <div>
      <p style={{ paddingBottom: '20px' }}>
        Write a short message on what you would like to get help with. Also tell
        your tutor what days and times would work best to meet.
      </p>
      <Form>
        <TextArea placeholder='I would like to recieve tutoring on...' />
        <Button className='btn-primary' style={{ marginTop: '20px' }}>
          Send
        </Button>
      </Form>
    </div>
  );
}
