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
  
    [key: string]: any; 
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
  }
  