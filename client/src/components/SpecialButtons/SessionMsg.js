import React from 'react';
import Button from '../../components/Button/Button';
import { useHistory } from 'react-router-dom';

export default function SessionMsg({ sessionId, participants }) {
  const history = useHistory();

  function directToWhiteBoard() {
    history.push(`/whiteboard/${sessionId}`, {
      participants: participants
    });
  }
  return (
    <div>
      <div>
        <div>
          <Button
            style={{ marginTop: '20px' }}
            className='btn-light'
            onClick={directToWhiteBoard}
          >
            Join
          </Button>
        </div>
      </div>
    </div>
  );
}
