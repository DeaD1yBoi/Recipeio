"use client";
import { FaStar } from "react-icons/fa";
import { useStarRatingHooks } from "./hook";

interface Props {
  size?: number;
  textStyle?: string;
  rating: number | null;
  userRatePost: ({ rating }: { rating: number }) => void;
  userRated: number | null;
  ratingStyle?: string;
  justRated?: boolean;
}

const StarRating = (props: Props) => {
  const { size = 20, textStyle, userRatePost, rating, userRated, ratingStyle = 'font-bold', justRated } = props;
  const { setHover, color } = useStarRatingHooks({ userRated });

  return (
    <div className="flex flex-wrap items-center">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index} className="flex items-center">
            <input
            disabled={justRated}
              className="hidden"
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => userRatePost({ rating: currentRating })}
            />
            <FaStar
            className="max-sm:w-[70px] max-sm:h-[70px]"
              size={size}
              color={color(currentRating)}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      { justRated ? ( <span className={`transition ease-in-out mt-1 w-full flex flew-row items-end text-red-500 ${textStyle}`}>Thanks for your feedback!</span> )
      :userRated && (
        <span className={`transition ease-in-out mt-1 w-full flex flew-row items-end ${textStyle}`}>
          You rated this post:
          <p className={`ml-1 ${ratingStyle}`}>{userRated}</p>
        </span>
      )}
    </div>
  );
};

export default StarRating;
