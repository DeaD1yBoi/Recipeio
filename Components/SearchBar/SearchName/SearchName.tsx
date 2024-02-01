import { SearchNameProps } from "@/types";
import Image from "next/image";
import React from "react";


const SearchName = ({ searchName, setSearchName }: SearchNameProps) => {
  return (
    <div className="searchbar__item">
        <Image
        src='/recipe-name.png'
        width={25}
        height={25}
        className="absolute w-[20px] h-[20px] ml-4"
        alt='name'/>
        <input
        type='text'
        name='name'
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Name"
        className="searchbar__input"/>
      </div>
  );
};

export default SearchName;
