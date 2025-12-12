import { useParams } from "react-router";
import RecipeDetailCard from "../components/RecipeDetailCard";
import { useQuery } from "@tanstack/react-query";
import { getRecipeDetails } from "../service/mealDB";
import Loader from "../components/ErrorHandling/Loader";
import toast from "react-hot-toast";

const RecipeDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details", id],
    queryFn: () => getRecipeDetails(id!),
  });

  if (isLoading) return <Loader />
  if (error || !data) return toast.error("Something went wrong. Please try again later");

  return ( 
  <div className="recipe-detail-page">
  <RecipeDetailCard recipe={data}/>
  </div>
  );
};

export default RecipeDetailPage;
