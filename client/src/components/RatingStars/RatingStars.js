import React from 'react';
import './RatingStars.scss';

let stars = {
  fullStar: <i className='fas fa-star RatingStar'></i>,
  halfStar: <i className='fas fa-star-half RatingStar'></i>
};

export default function RatingStars({ rating }) {
  function buildStarRating(rating) {
    let fullStars = Math.floor(rating / 1);
    let halfStars = rating % 1 > 0 ? true : false;
    let ratingArray = [];

    for (let i = 0; i < fullStars; i++) {
      ratingArray.push(<span>{stars.fullStar}</span>);
    }

    if (halfStars) ratingArray.push(stars.halfStar);
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
