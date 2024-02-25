import { SearchNameProps } from "@/types";
import React from "react";

const SearchName = ({ searchName, setSearchName }: SearchNameProps) => {
  return (
    <div className="searchbar__item mt-3 ">
      <input
        type="text"
        name="name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Name"
        className={`searchbar__input w-[250px]`}
      />
    </div>
  );
};

export default SearchName;
