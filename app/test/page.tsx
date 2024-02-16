'use client'
import React from 'react'
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

interface RatingProps {
  value: number;
}

const Rating: React.FC<RatingProps> = ({ value }) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value - fullStars >= 0.5;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoIosStar color={"gold"} key={`full-${i}`}/>);
    }

    if (hasHalfStar) {
      stars.push(<IoIosStarHalf color='gold' key='half' />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<IoIosStarOutline color={"gray"} key={`full-${i}`}/>);
    }

    return stars;
  };

  return (
    <div className="flex">
      {renderStars()}
    </div>
  );
};


 const rating = 2.6


const page = () => {
  return (
    <div>
      <h1>Your Rating:</h1>
      <Rating value={rating} />
    </div>
  )
}

export default page
