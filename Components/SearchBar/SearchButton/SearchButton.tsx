import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchButton = ({ btnClasses }: { btnClasses: string }) => {
  return (
    <button type="submit" className={`${btnClasses}`}>
      <FaSearch className="cursor-pointer max-sm:min-w-[40px] max-sm:min-h-[40px]" size={20} />
    </button>
  );
};

export default SearchButton;
