"use client";
import React from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

interface RatingProps {
  rating: number;
  size?: number;
  ratingNumberStyle?: string;
}

const RatingStars = (props: RatingProps) => {
  const { rating, size=20, ratingNumberStyle } = props;


  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoIosStar color={"orange"} key={Math.random()} size={size} />);
    }

    if (hasHalfStar) {
      stars.push(<IoIosStarHalf color="orange" key={Math.random()} size={size}/>);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<IoIosStarOutline color={"gray"} key={Math.random()} size={size}/>);
    }

    return stars;
  };

  return <div className="flex flex-row items-center">{renderStars()}
  <span className={`ml-2 font-bold ${rating <= 1 ? "text-red-500" : rating <= 2 ? "text-amber-500 text-xl" : rating <= 3 ? "text-green-500 text-2xl" : rating <= 4 ? "text-sky-500 text-3xl" : "text-violet-500 text-4xl"} ${ratingNumberStyle}`}>{rating}</span></div>;
};

export default RatingStars;
