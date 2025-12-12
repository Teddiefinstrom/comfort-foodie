import {
    collection,
    type CollectionReference,
    type DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";
import type { SavedRecipe } from "../types/recipe";


export const subCol = <T = DocumentData>(...paths: string[]) =>
  collection(db, paths.join("/")) as CollectionReference<T>;


  export const savedRecipesCol = (uid: string) =>
  subCol<SavedRecipe>("users", uid, "savedRecipes");