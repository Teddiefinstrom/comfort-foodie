import type {
  RecipePreview,
  RecipeFull,
  Area,
  Category,
  Ingredient,
} from "../types/recipe";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";


//  Category Preview
export const getPreviewByCategory = async (
  category: string
): Promise<RecipePreview[]> => {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data: { meals: RecipePreview[] | null } = await res.json();
  return data.meals || [];
};

// Area Preview
export const getPreviewByArea = async (
  area: string
): Promise<RecipePreview[]> => {
  const res = await fetch(`${BASE_URL}/filter.php?a=${area}`);
  if (!res.ok) {
    throw new Error("Failed to fetch areas");
  }
  const data: { meals: RecipePreview[] | null } = await res.json();
  return data.meals || [];
};

// Ingredient Preview
export const getPreviewByIngredient = async (
  ingredient: string
): Promise<RecipePreview[]> => {
  const res = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
  if (!res.ok) {
    throw new Error("Failed to fetch ingredients");
  }
  const data: { meals: RecipePreview[] | null } = await res.json();
  return data.meals || [];
};

// Get all recipes in cagetogires, area and ingredients at once
export const getAllPreviewRecipes = async (): Promise<RecipePreview[]> => {
  const categories = await getAllCategories();
  const allRecipesMap = new Map<string, RecipePreview>();

  for (const cat of categories) {
    const res = await fetch(`${BASE_URL}/filter.php?c=${cat}`);
    const data: { meals: RecipePreview[] } = await res.json();

    data.meals.forEach((meal) => {
      if (!allRecipesMap.has(meal.idMeal)) {
        allRecipesMap.set(meal.idMeal, meal);
      }
    });
  }

  return Array.from(allRecipesMap.values());
};

// Get recipies from categories so render on explore page
export const getAllCategories = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}/list.php?c=list`);
  if (!res.ok) throw new Error("Failed to fetch category list");

  const data = await res.json();
  return data.meals.map((c: { strCategory: string }) => c.strCategory);
};

// Full Recipe Info
export const getRecipeDetails = async (
  id: string
): Promise<RecipeFull | null> => {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);

  if (!res.ok) {
    throw new Error("Could not fetch recipe details");
  }
  const data: { meals: RecipeFull[] | null } = await res.json();
  return data.meals ? data.meals[0] : null;
};

// Get Categories for filtering
export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${BASE_URL}/list.php?c=list`);
  if (!res.ok) throw new Error("Failed to fetch categories");

  const data: { meals: Category[] } = await res.json();
  return data.meals;
};

// Get Areas for filtering
export const getAreas = async (): Promise<Area[]> => {
  const res = await fetch(`${BASE_URL}/list.php?a=list`);

  if (!res.ok) {
    throw new Error("Failed to fetch areas");
  }

  const data: { meals: Area[] } = await res.json();
  return data.meals;
};

// Ingredients Page
export const getIngredients = async (): Promise<Ingredient[]> => {
  const res = await fetch(`${BASE_URL}/list.php?i=list`);
  if (!res.ok) throw new Error("Failed to fetch ingredients");

  const data: { meals: Ingredient[] } = await res.json();
  return data.meals;
};

// Ingredients Page - Get Img
export const getIngredientsThumb = (name: string) => {
  const safe = encodeURIComponent(name);
  return `https://www.themealdb.com/images/ingredients/${safe}.png`;
};

// Ingredients Detail Info
// export const getIngredientsDetails = async (name: string): Promise<Ingredient | null> => {
//   const res = await fetch(`${BASE_URL}/search.php?i=${name}`);
//   if (!res.ok) throw new Error ("Failed to fetch ingredients details");

//   const data = await res.json();
//   return data.ingredients ? data.ingredients[0] : null;
// };

// Get recipes by ingredients (detail page)
export const getRecipesByIngredients = async (ingredient: string): Promise<RecipePreview[]> => {
  const res = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
  if (!res.ok) {
    throw new Error("Failed to fetch ingredient recipes");
  }
  const data: { meals: RecipePreview[] | null } = await res.json();
  return data.meals || [];
}