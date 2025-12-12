import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { savedRecipesCol } from "./collections.service";
import type { RecipeLikeData } from "../types/recipe";

// Save Recipe to Profile
export const saveRecipe = async (uid: string, recipe: RecipeLikeData) => {
  return setDoc(doc(savedRecipesCol(uid), recipe.idMeal), {
    ...recipe,
    createdAt: serverTimestamp(),
  });
};

// Remove Recipe from profile
export const removeRecipe = async (uid: string, idMeal: string) => {
    return deleteDoc(doc(savedRecipesCol(uid), idMeal));
};

// Check if Recipe is already saved
export const isSaved = async (uid: string, idMeal: string) => {
    const snap = await getDoc(doc(savedRecipesCol(uid), idMeal));
    return snap.exists();
};