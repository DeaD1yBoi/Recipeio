import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchButton = ({ btnClasses }: { btnClasses: string }) => {
  return (
    <button type="submit" className={`${btnClasses}`}>
      <FaSearch className="cursor-pointer" size={20} />
    </button>
  );
};

export default SearchButton;
