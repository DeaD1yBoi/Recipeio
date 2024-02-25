import { SearchNameProps } from "@/types";
import React from "react";

const SearchName = ({ searchName, setSearchName }: SearchNameProps) => {
  return (
    <div>
      <input
        type="text"
        name="name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Name"
        className={`searchbar__input w-[325px]`}
      />
    </div>
  );
};

export default SearchName;
