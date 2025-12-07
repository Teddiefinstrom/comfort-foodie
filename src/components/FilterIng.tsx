
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";

type FilterIngredientsProps = {

  ingredients: { strIngredient: string }[] | undefined;
  onIngredientSelect: (ingredient: string) => void;
  defaultOpen: boolean;

};

const FilterIngredients = ({ ingredients, onIngredientSelect, defaultOpen = false}: FilterIngredientsProps) => {
    const [openFilter, setOpenFilter] = useState<boolean>(defaultOpen);
      const [selectedIngredient, setSelectedIngredient] = useState("");


      const handleIngredient = (ing: string) => {
        const newValue = selectedIngredient === ing ? "" : ing;
        setSelectedIngredient(newValue);
        onIngredientSelect(newValue);
          }


  return (
    <>
    <div className="filter-bar">

        <Button
        variant="warning"
        className="filter-main-btn"
        onClick={() => setOpenFilter(!openFilter)}
        >
        Ingredients
      </Button>
    </div>

{openFilter && (
    <div className="filter-submenu">
      {ingredients?.map((ing) => (
        <Button
        variant="outline-dark"
          key={ing.strIngredient}
          className={
            selectedIngredient === ing.strIngredient ? "sub-btn active" : "sub-btn"
          }
          onClick={() => handleIngredient(ing.strIngredient)}
        >
          {ing.strIngredient}
        </Button>
      ))}
    </div>
  )}
  </>
  );
};

export default FilterIngredients;
