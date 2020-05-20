import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import Button from '../Button/Button';

function ReviewModal({ rating }) {
  return (
    <div>
      <p style={{ paddingBottom: '20px' }}>
        Click the starts to give a rating and leave a review!
      </p>
      <Form>
        <TextArea placeholder='Leave your review here...' />
        <Button className='btn-primary' style={{ marginTop: '20px' }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

ReviewModal.defaultProps = {
  rating: 0
};

export default ReviewModal;
