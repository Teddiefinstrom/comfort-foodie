import { useQuery } from "@tanstack/react-query";
import {
  getAllPreviewRecipes,
  getPreviewByArea,
  getPreviewByCategory,
} from "../service/mealDB";

const useRecipePreviews = (
  category: string,
  area: string,
) => {
    return useQuery({
        queryKey: ["previews", category, area],
        queryFn: () => {
            if (category) return getPreviewByCategory(category);
            if (area) return getPreviewByArea(area);
            return getAllPreviewRecipes();
          },
        });
};

export default useRecipePreviews;
