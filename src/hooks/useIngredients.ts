import { useQuery } from "@tanstack/react-query"
import type { Ingredient } from "../types/recipe";
import { getIngredients } from "../service/mealDB"

const useIngredients = () => {

    return useQuery<Ingredient[]>({
        queryKey: ["ingredients"],
        queryFn: getIngredients,
    });
};

export default useIngredients;