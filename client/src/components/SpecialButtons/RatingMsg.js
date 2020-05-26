import React from 'react';
import { Rating } from 'semantic-ui-react';

export default function RatingMsg() {
  return (
    <div>
      <div>
        {' '}
        <Rating icon='star' defaultRating={3} maxRating={5} size='huge' />
        <div>
          {/* For future development */}
          {/* <Button style={{ marginTop: '20px' }} className='btn-light'>
            Submit
          </Button> */}
        </div>
      </div>
    </div>
  );
}
