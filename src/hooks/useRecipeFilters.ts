import { useQuery } from "@tanstack/react-query";
import { getCategories, getAreas, getIngredients } from "../service/mealDB";

const useRecipeFilters = () => {

    const categoriesQuery = useQuery({
        queryKey: ["categories"], 
        queryFn: getCategories,
});
    
const areasQuery = useQuery({
        queryKey: ["areas"], 
        queryFn: getAreas,
    });
    
    const ingredientsQuery = useQuery({
        queryKey: ["ingredients"], 
        queryFn: getIngredients,
    });

    return {
        categories: categoriesQuery.data,
        areas: areasQuery.data,
        ingredients: ingredientsQuery.data,
        isLoading: categoriesQuery.isLoading || areasQuery.isLoading || ingredientsQuery.isLoading,
        isError: categoriesQuery.isError || areasQuery.isError || ingredientsQuery.isError,
    }
    
}

export default useRecipeFilters;