import type { Recipe } from "../types/recipe";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// One Category
export const getCategory = async (category: string): Promise<Recipe[]> => {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = await res.json();
  return data.meals || [];
};

// All Categories
export const getAllCategories = async (): Promise<string[]> => {
  const res = await fetch(`${BASE_URL}/categories.php`);

  if (!res.ok) {
    throw new Error("Failed to fetch all categories");
  }

  const data = await res.json();
  return data.categories.map((cat: any) => cat.strCategory);
};

// All Recipes
export const getAllRecipes = async (): Promise<Recipe[]> => {
  const categories = await getAllCategories();
  let allRecipes: Recipe[] = [];

  for (const category of categories) {
    const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await res.json();

    if (data.meals) {
      allRecipes = [...allRecipes, ...data.meals];
    }
  }
  return allRecipes;
};

// Full Recipe Info

export const getRecipeDetails = async (id: string) => {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);

  if (!res.ok) {
    throw new Error("Could not fetch recipe details");
  }
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
};
