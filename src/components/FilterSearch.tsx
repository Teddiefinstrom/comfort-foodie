import { useState } from "react";
import Button from "react-bootstrap/esm/Button";

type SearchFilterProps = {
  categories: { strCategory: string }[] | undefined;
  areas: { strArea: string }[] | undefined;

  onCategorySelect: (category: string) => void;
  onAreaSelect: (area: string) => void;

};

const FilterSearch = ({ categories, areas, onCategorySelect, onAreaSelect,}: SearchFilterProps) => {
  const [openFilter, setOpenFilter] = useState<
    "" | "category" | "area" >("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");


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

  </>
  );
};

export default FilterSearch;
