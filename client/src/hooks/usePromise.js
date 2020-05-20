// import React, { useState, useEffect } from 'react';
// import { getTutors } from '../utils/API';

// export function usePromise(promiseOrFunction, defaultValue) {
//   const [state, setState] = useState({
//     value: defaultValue,
//     error: null,
//     isPending: true
//   });

//   const promise =
//     typeof promiseOrFunction === 'function'
//       ? promiseOrFunction()
//       : promiseOrFunction;

//   useEffect(() => {
//     let isSubscribed = true;

//     promise
//       .then((value) =>
//         isSubscribed ? setState({ value, error: null, isPending: false }) : null
//       )
//       .catch((error) =>
//         isSubscribed
//           ? setState({ value: defaultValue, error: error, isPending: false })
//           : null
//       );

//     return () => (isSubscribed = false);
//   }, [promise, defaultValue]);

//   const { value, error, isPending } = state;
//   return [value, error, isPending];
// }
