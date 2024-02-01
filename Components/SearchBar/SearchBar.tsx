"use client";
import { FilterProps } from "@/types";
import SearchButton from "./SearchButton/SearchButton";
import SearchIngridients from "./SearchIngridients/SearchIngridients";
import SearchName from "./SearchName/SearchName";
import useSearchBarHooks from "./hooks";


interface Props {
  setFilter: (values: FilterProps) => void;
};


const SearchBar = (props: Props) => {
  const { setFilter } = props;

  const {
    searchName,
    setSearchName,
    handleSearch,
    ingredients,
    setIngredients,
  } = useSearchBarHooks({ setFilter });

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchName searchName={searchName} setSearchName={setSearchName} />
        <SearchIngridients
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
        <SearchButton btnClasses="mx-4" />
      </div>
    </form>
  );
};

export default SearchBar;
