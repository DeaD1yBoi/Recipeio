import { useState } from "react";

interface Props {
  userRated: number | null;
}

export const useStarRatingHooks = (props : Props) => {
  const { userRated } = props;
  const [hover, setHover] = useState<number | null>(null);
  const color = (currentRating: number) =>
    currentRating <= (hover! || userRated!) ? "#ffc107" : "#e4e5e9";
  return { hover, setHover, color };
};
