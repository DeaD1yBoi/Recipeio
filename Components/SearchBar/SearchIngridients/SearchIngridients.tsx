"use client";
import { AutocompleteInputArray } from "@/Components";
import { AllPossibleIngredients } from "@/constants";

interface Props {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
}
const SearchIngridients = (props: Props) => {
  const { ingredients, setIngredients } = props;
  return (
    <div className="searchbar__item">
      <AutocompleteInputArray variable={ingredients} setVariable={setIngredients} constArr={AllPossibleIngredients} placeholder="Ingredients" autocompleteId="ingredients" />
    </div>
  );
};

export default SearchIngridients;
