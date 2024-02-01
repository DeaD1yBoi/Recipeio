"use client";
import { AutocompleteInput } from "@/Components";
import { AllPossibleIngredients } from "@/constants";

interface Props {
  ingredients: string;
  setIngredients: (ingredients: string) => void;
}
const SearchIngridients = (props: Props) => {
  const { ingredients, setIngredients } = props;
  return (
    <div className="searchbar__item">
      <AutocompleteInput variable={ingredients} setVariable={setIngredients} constArr={AllPossibleIngredients} placeholder="Ingredients"/>
    </div>
  );
};

export default SearchIngridients;
