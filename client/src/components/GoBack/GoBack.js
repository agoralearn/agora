import React from 'react';
import { useHistory } from 'react-router-dom';

export default function GoBack() {
  const history = useHistory();
  console.log(history);

  function goBackHandler() {
    history.goBack();
  }

  // History needs to be passed to this component.
  // Ensure that the component that is calling this
  // component has history in its context

  return (
    <div onClick={goBackHandler}>
      <i className='fas fa-arrow-left' style={{ marginRight: '4px' }}></i>Back
    </div>
  );
}
