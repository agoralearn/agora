import React from 'react';
// { useRef, useEffect, useState }
import './ProfileImage.scss';

export default function ProfileImage({
  profileImg,
  style,
  height = '100px',
  width = '100px',
  className
}) {
  // const [error, setError] = useState(false);
  // const imageRef = useRef(null);
  // console.log(profileImg);

  // useEffect(() => {
  //   imageRef.current.onload = () => {
  //     console.log('onload');
  //     setError(false);
  //   };
  //   imageRef.current.onerror = () => {
  //     console.log('onerror');
  //     setError(true);
  //     // 'https://utulsa.edu/wp-content/uploads/2018/08/generic-avatar.jpg'
  //   };
  //   // imageRef.current.src = URL;
  // }, []);

  return (
    <div
      className={`image-cropper ${className}`}
      style={{ ...style, height: height, width: width }}
    >
      {/* {!error ? ( */}
      <img
        // ref={imageRef}
        src={profileImg}
        alt='avater'
        className='profile-pic'
        style={{ height: height, width: width }}
      ></img>
      {/* ) : ( */}
      {/* <img
          ref={imageRef}
          src='https://utulsa.edu/wp-content/uploads/2018/08/generic-avatar.jpg'
          alt='avater'
          className='profile-pic'
          style={{ height: height, width: width }}
        ></img>
      )} */}
    </div>
  );
}
