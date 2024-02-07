import * as React from "react";
import useSliderHooks from "./hooks";
import { UseStatePostProps } from "@/types";
import { timeTextColor } from "@/utils";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Image from "next/image";


export default function InputSlider(props: UseStatePostProps) {
  const { setPost, post } = props;
  const { handleSliderChange, handleInputChange, handleBlur, isSmallScreen } =
    useSliderHooks({ setPost, post });
  return (
    <Box sx={{ width: isSmallScreen ? "100%" : 600 }}>
      <Typography id="input-slider" gutterBottom>
        Time needed
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item className="flex items-center">
          <Image src="/clock.png" alt="clock" width={20} height={20} />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof post.timeNeeded === "number" ? post.timeNeeded : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={540}
            marks
            step={10}
          />
        </Grid>
        <Grid item>
          <Input
            value={post.timeNeeded}
            size="small"
            onChange={handleInputChange}
            className={`${timeTextColor(post.timeNeeded)} text-xl font-semibold`}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 540,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
        <p className="mt-4">min.</p>
      </Grid>
    </Box>
  );
}
