import * as React from "react";
import { UseStatePostProps } from "@/types";
import useTheme from "@mui/material/styles/useTheme";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


export default function useSliderHooks(props: UseStatePostProps) {
  const { setPost, post } = props;
  const theme: Theme = useTheme();
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setPost({ ...post, timeNeeded: newValue as number });
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, timeNeeded: parseInt(event.target.value) });
  };

  const handleBlur = () => {
    if (post.timeNeeded < 0) {
      setPost({ ...post, timeNeeded: 0 });
    } else if (post.timeNeeded > 540) {
      setPost({ ...post, timeNeeded: 540 });
    }
  };

  return { handleSliderChange, handleInputChange, handleBlur, isSmallScreen };
}
