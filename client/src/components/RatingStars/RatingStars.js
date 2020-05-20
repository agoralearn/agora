import React from 'react';
import './RatingStars.scss';

const stars = {
  fullStar: <i className='fas fa-star RatingStar'></i>,
  halfStar: <i className='fas fa-star-half RatingStar'></i>
};

export default function RatingStars({ rating, name }) {
  function buildStarRating(rating) {
    const fullStars = Math.floor(rating / 1);
    const halfStars = rating % 1 > 0 ? true : false;
    const ratingArray = [];

    for (let i = 0; i < fullStars; i++) {
      ratingArray.push(
        <span className='RatingStar-wrapper'>
          {stars.fullStar}
          {/* <span className='RatingStar-background--star'>
            <i className='fas fa-star RatingStar'></i>
          </span> */}
        </span>
      );
    }

    if (halfStars) {
      ratingArray.push(
        <span className='RatingStar-wrapper'>
          {stars.halfStar}
          {/* <span className='RatingStar-background--star'>
            <i className='fas fa-star RatingStar'></i>
          </span> */}
        </span>
      );
    }

    // while (ratingArray.length) {
    //   ratingArray.push(
    //     <span className='RatingStar-background--star'>
    //       <i className='fas fa-star RatingStar'></i>
    //     </span>
    //   );
    // }

    return ratingArray;
  }

  return (
    <div>
      {buildStarRating(rating).map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
}
