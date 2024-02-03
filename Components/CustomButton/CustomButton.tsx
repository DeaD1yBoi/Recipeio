"use client";
import React from "react";
import { CustomButtonProps } from "@/types";

const CustomButton = (props: CustomButtonProps ) => {
  const {
    title,
    containerStyles,
    handleClick,
    btnType,
    isDisabled,
    textStyles,
    noDefaultStyles = false,
  } = props
  return (
    <button
      disabled={isDisabled}
      type={btnType || "button"}
      className={ noDefaultStyles ? `${containerStyles}` : `custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
    </button>
  );
};

export default CustomButton;
