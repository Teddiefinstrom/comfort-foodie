export type RecipeDetails = {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    servings: number;
    summary: string;
    instructions: string;
    extendedIngredients: {
      id: number;
      original: string;
    }[];
    diets: string[];
  };
  