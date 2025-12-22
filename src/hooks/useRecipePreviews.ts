import { useQuery } from "@tanstack/react-query";
import {
  getAllPreviewRecipes,
  getPreviewByArea,
  getPreviewByCategory,
} from "../service/mealDB";

const SHUFFLE_TIME = 1000 * 60 * 60 * 12;
const SHUFFLE_KEY = "explore_recipes_shuffle";

const shufflePreviews = <T,>(previews: T[]): T[] => {
  const result = [...previews];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const useRecipePreviews = (
  category: string,
  area: string,
) => {
    return useQuery({
        queryKey: ["previews", category, area],
        queryFn: async () => {
            if (category) return getPreviewByCategory(category);
            if (area) return getPreviewByArea(area);
            return getAllPreviewRecipes();
          },
          select: (data) => {
            if (category || area) {
              
              return data;
            }
      
            const cached = localStorage.getItem(SHUFFLE_KEY);
            const now = Date.now();
      
            if (cached) {
              const parsed = JSON.parse(cached);
      
              if (now - parsed.timestamp < SHUFFLE_TIME) {
                return parsed.data;
              }
            }
      
            const shuffled = shufflePreviews(data);
      
            localStorage.setItem(
              SHUFFLE_KEY,
              JSON.stringify({
                timestamp: now,
                data: shuffled,
              })
            );
      
            return shuffled;
          },
        });
      };

export default useRecipePreviews;
