import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchButton = ({ btnClasses }: { btnClasses: string }) => {
  return (
    <button type="submit" className={`z-10 ${btnClasses}`}>
      <FaSearch className="cursor-pointer" />
    </button>
  );
};

export default SearchButton;
