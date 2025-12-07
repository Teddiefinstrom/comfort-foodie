import { useState } from "react";
import Button from "react-bootstrap/esm/Button";

type SearchFilterProps = {
  categories: { strCategory: string }[] | undefined;
  areas: { strArea: string }[] | undefined;
  ingredients: { strIngredient: string }[] | undefined;

  onCategorySelect: (category: string) => void;
  onAreaSelect: (area: string) => void;
  onIngredientSelect: (ingredient: string) => void;

};

const FilterSearch = ({ categories, areas, ingredients, onCategorySelect, onAreaSelect, onIngredientSelect,}: SearchFilterProps) => {
  const [openFilter, setOpenFilter] = useState<
    "" | "category" | "area" | "ingredient"
  >("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");


  const handleCategory = (cat: string) => {
const newValue = selectedCategory === cat ? "" : cat;
setSelectedCategory(newValue);
onCategorySelect(newValue);
  }

  const handleArea = (area: string) => {
    const newValue = selectedArea === area ? "" : area;
    setSelectedArea(newValue);
    onAreaSelect(newValue);
      }

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
        onClick={() =>
          setOpenFilter(openFilter === "category" ? "" : "category")
        }
      >
        Categories
      </Button>

      <Button
      variant="warning"
        className="filter-main-btn"
        onClick={() => setOpenFilter(openFilter === "area" ? "" : "area")}
      >
        Areas
      </Button>

      <Button
      variant="warning"
        className="filter-main-btn"
        onClick={() =>
          setOpenFilter(openFilter === "ingredient" ? "" : "ingredient")
        }
      >
        Ingredients
      </Button>
    </div>

{openFilter === "category" && (
    <div className="filter-submenu">
      {categories?.map((cat) => (
        <Button
        variant="outline-dark"
          key={cat.strCategory}
          className={
            selectedCategory === cat.strCategory ? "sub-btn active" : "sub-btn"
          }
          onClick={() => handleCategory(cat.strCategory)}
        >
          {cat.strCategory}
        </Button>
      ))}
    </div>
  )}

{openFilter === "area" && (
    <div className="filter-submenu">
      {areas?.map((area) => (
        <Button
        variant="outline-dark"
          key={area.strArea}
          className={
            selectedArea === area.strArea ? "sub-btn active" : "sub-btn"
          }
          onClick={() => handleArea(area.strArea)}
        >
          {area.strArea}
        </Button>
      ))}
    </div>
  )}

{openFilter === "ingredient" && (
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

export default FilterSearch;
