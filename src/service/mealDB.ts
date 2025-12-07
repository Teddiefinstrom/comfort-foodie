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

// ingredient preview
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

// Get all recipes in cagetogires at once
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

// Get Ingredients for filtering
export const getIngredients = async (): Promise<Ingredient[]> => {
  const res = await fetch(`${BASE_URL}/list.php?i=list`);
  if (!res.ok) throw new Error("Failed to fetch ingredients");

  const data: { meals: Ingredient[] } = await res.json();
  return data.meals;
};
