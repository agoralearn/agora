import React from 'react';
import './Hero.scss';
import backgroundImage from '../../Assets/images/agora-hero4.png';

function Hero({ heroImage, children }) {
  return (
    <div
      className='Hero_wrapper'
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {children}
    </div>
  );
}

Hero.Content = function ({ children }) {
  return <div className='Hero_content'>{children}</div>;
};

Hero.defaultProps = {
  heroImage: backgroundImage
};

export default Hero;
