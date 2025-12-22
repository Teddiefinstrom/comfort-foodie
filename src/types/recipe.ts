import type { Timestamp } from "firebase/firestore";

export interface RecipePreview {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }
  
  export interface RecipeFull {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  
    strCategory: string;
    strArea: string;
    strInstructions: string;
  
    [key: string]: string | null; 
  }
  
  export interface Category {
    strCategory: string;
  }
  
  export interface Area {
    strArea: string;
  }
  
  export interface Ingredient {
    idIngredient: string;
    strIngredient: string;
    strDescription: string | null;
    strThumb: string | null;
    strType?: string | null;
  }

  export interface SavedRecipe {
    idMeal: string;
    title: string;
    image: string;
    createdAt: Timestamp;
  }
  
  export interface RecipeLikeData {
    idMeal: string;
    title: string;
    image: string;
}

export interface Collage {
    id: string;
    title: string;
    createdAt: Timestamp;
}