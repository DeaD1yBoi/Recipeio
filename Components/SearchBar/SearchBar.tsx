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
    clearSearch,
  } = useSearchBarHooks({ setFilter });

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <Image
        src="/recipe-name.png"
        alt="recipe"
        width={30}
        height={30}
        className="hidden md:flex mt-2 mr-2"
      />
      <div className="flex flex-col items-end justify-end md:flex-row gap-2">
        <SearchName searchName={searchName} setSearchName={setSearchName} />
        <SearchIngridients
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      </div>
      <div className="flex flex-row items-center justify-center ml-2">
        <ImCross
          className="cursor-pointer max-sm:min-w-[40px] max-sm:min-h-[40px]"
          size={20}
          onClick={() => clearSearch()}
        />
        <SearchButton btnClasses="mx-4 max-sm:min-w-[40px] max-sm:min-h-[40px]"/>
      </div>
    </form>
  );
};

export default SearchBar;
