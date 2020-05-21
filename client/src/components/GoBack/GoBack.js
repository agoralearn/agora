import React from 'react';
import { useHistory } from 'react-router-dom';
<<<<<<< HEAD

export default function GoBack() {
  const history = useHistory();
  console.log(history);

=======

export default function GoBack() {
  const history = useHistory();
>>>>>>> a9b668931970ac695cd7689f6991696f1c8896b0
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
