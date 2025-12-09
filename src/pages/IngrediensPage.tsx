import { useQuery } from "@tanstack/react-query";
import FilterIngredients from "../components/FilterIng";
import { getIngredients } from "../service/mealDB";
import HeroBanner from "../components/HeroBanner";

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
      <HeroBanner background="/src/styling/images/ingrediens.jpg">
        <h1>Ingrediens Library</h1>

      </HeroBanner>

      <FilterIngredients
        ingredients={ingredients}
        onIngredientSelect={handleSelect}
        defaultOpen={true}
      />
    </>
  );
};

export default IngrediensPage;
