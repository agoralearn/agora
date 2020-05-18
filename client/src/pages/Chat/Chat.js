import React, { useEffect } from 'react';
import { Input } from 'semantic-ui-react';

export default function Chat({ match }) {
  // Make database call to get messages
  // when page first loads
  useEffect(() => {
    let chatId = match.params.chatId;
  }, []);

  return (
    <div>
      <Input focus placeholder='Search...' />
    </div>
  );
}
