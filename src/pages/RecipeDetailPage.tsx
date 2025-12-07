import { useParams } from "react-router";
import RecipeDetailCard from "../components/RecipeDetailCard";
import { useQuery } from "@tanstack/react-query";
import { getRecipeDetails } from "../service/mealDB";

const RecipeDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details", id],
    queryFn: () => getRecipeDetails(id!),
  });

  if (isLoading) return <p>Loading...</p>
  if (error || !data) return <p>Error when loading recipe</p>

  return <>
  <RecipeDetailCard recipe={data}/>
  </>;
};

export default RecipeDetailPage;
