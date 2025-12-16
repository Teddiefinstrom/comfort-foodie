import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import {
  getIngredients,
  getIngredientsThumb,
  getRecipesByIngredients,
} from "../service/mealDB";
import Loader from "../components/ErrorHandling/Loader";
import Carousel from "../components/Carousel";

const IngredientDetailPage = () => {
 
  const { name } = useParams();
    const decodedName = decodeURIComponent(name!);

  const {
    data: allIngredients,
    isLoading: loadingIngredients
  } = useQuery({
    queryKey: ["ingredients"],
    queryFn: getIngredients,
  });

  const ingredient = allIngredients?.find(
    (i) => i.strIngredient.toLowerCase() === decodedName.toLowerCase()
  );

  const {
    data: recipes,
    isLoading: loadingRecipes
  } = useQuery({
    queryKey: ["ingredientRecipes", decodedName],
    queryFn: () => getRecipesByIngredients(decodedName)
  });

  if (loadingIngredients || loadingRecipes) return <Loader />;

  if (!ingredient) return <p>Ingredient not found...</p>;


  return (
    <>
      <div className="ingredient-detail-page">
        <h2>{ingredient.strIngredient}</h2>

        <img
          src={getIngredientsThumb(ingredient.strIngredient)}
          alt={ingredient.strIngredient}
        />

        {ingredient.strDescription ? (
          <p className="ingredient-description">{ingredient.strDescription}</p>
        ) : (
          <p>
            No description available for this ingredient.
          </p>
        )}

        <h2>Recipes with {ingredient.strIngredient}</h2>

        {recipes && recipes.length > 0 ? (
          <Carousel title="" recipes={recipes} />
        ) : (
          <p>No recipes found for this ingredient.</p>
        )}
      </div>
    </>
  );
};

export default IngredientDetailPage;
