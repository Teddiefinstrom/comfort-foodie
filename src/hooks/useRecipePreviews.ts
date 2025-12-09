import { useQuery } from "@tanstack/react-query";
import {
  getAllPreviewRecipes,
  getPreviewByArea,
  getPreviewByCategory,
  getPreviewByIngredient,
} from "../service/mealDB";

const useRecipePreviews = (
  category: string,
  area: string,
  ingredient: string
) => {
    return useQuery({
        queryKey: ["previews", category, area, ingredient],
        queryFn: () => {
            if (category) return getPreviewByCategory(category);
            if (area) return getPreviewByArea(area);
            if (ingredient) return getPreviewByIngredient(ingredient);
            return getAllPreviewRecipes();
          },
        });
};

export default useRecipePreviews;
