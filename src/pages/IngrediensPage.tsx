import { useQuery } from "@tanstack/react-query";
import FilterIngredients from "../components/FilterIng";
import { getIngredients } from "../service/mealDB";

const IngrediensPage = () => {
  const { data: ingredients } = useQuery({
    queryKey: ["ingredients"],
    queryFn: getIngredients
  });

  const handleSelect = (ing: string) => {
    console.log("Selected ingredient:", ing);
  };
  

  return (
    <>
      <div className="ingrediens-hero">
        <h1>IngrediensPage</h1>
      </div>

      <FilterIngredients
        ingredients={ingredients}
        onIngredientSelect={handleSelect}
        defaultOpen={true}
      />
    </>
  );
};

export default IngrediensPage;
