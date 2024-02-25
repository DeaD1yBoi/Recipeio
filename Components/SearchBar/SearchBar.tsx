"use client";
import { FilterProps } from "@/types";
import SearchButton from "./SearchButton/SearchButton";
import SearchIngridients from "./SearchIngridients/SearchIngridients";
import SearchName from "./SearchName/SearchName";
import useSearchBarHooks from "./hooks";
import Image from "next/image";
import { ImCross } from "react-icons/im";


interface Props {
  setFilter: (values: FilterProps) => void;
}

const SearchBar = (props: Props) => {
  const { setFilter } = props;

  const {
    searchName,
    setSearchName,
    handleSearch,
    ingredients,
    setIngredients,
    clearSearch
  } = useSearchBarHooks({ setFilter });

  return (
    <form className="searchbar" onSubmit={handleSearch}>
        <Image src="/recipe-name.png" alt="recipe" width={20} height={20} className="hidden md:flex"/>
        <SearchName searchName={searchName} setSearchName={setSearchName} />
        <SearchIngridients
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
        <ImCross className="cursor-pointer" size={20} onClick={()=>clearSearch()}/>
        <SearchButton btnClasses="mx-4" />
    </form>
  );
};

export default SearchBar;
