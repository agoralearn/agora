import React from 'react';

export default function GoBack({ history }) {
  function goBackHandler() {
    history.goBack();
  }

  // History needs to be passed to this component.
  // Ensure that the component that is calling this
  // component has history in its context

  return (
    <div className='Chat-users' onClick={goBackHandler}>
      <i className='fas fa-arrow-left'></i>Back
      <div className='Chat-users--names'>
        <p>Tylor K.</p>
      </div>
    </div>
  );
}
