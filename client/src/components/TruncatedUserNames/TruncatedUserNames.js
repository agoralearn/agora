import React from 'react';

export default function TruncatedUserNames({ users, modal, handleModalOpen }) {
  const names = [];
  const MAX_STRING_LENGTH = 30;

  users.forEach((user) => {
    names.push(user.firstName);
  });

  const usersJoined = names.join(', ');

  const returnString =
    usersJoined.length > MAX_STRING_LENGTH
      ? usersJoined.slice(0, MAX_STRING_LENGTH) + '... '
      : usersJoined;

  return (
    <>
      <p style={{ fontSize: '16px' }}>{returnString}</p>{' '}
      {modal && (
        <span
          style={{
            color: '#3d348b',
            fontWeight: 'bold',
            marginLeft: '6px'
          }}
          onClick={() => handleModalOpen(true)}
        >
          More
        </span>
      )}
    </>
  );
}
