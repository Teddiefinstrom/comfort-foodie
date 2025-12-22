import {
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { subCol } from "./collections.service";
import type { Collage, RecipeLikeData } from "../types/recipe";

export const collagesCol = (uid: string) => subCol("users", uid, "collages");

export const createCollage = async (uid: string, title: string) => {
  const cleanTitle = title.trim();
  if (!cleanTitle) throw new Error("Collage Title cannot be empty");

  const ref = doc(collagesCol(uid));
  await setDoc(ref, {
    title: cleanTitle,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

export const getCollages = async (uid: string) => {
  const snaps = await getDocs(collagesCol(uid));

  return snaps.docs.map((d) => {
    const data = d.data() as Omit<Collage, "id">;
    return { id: d.id, ...data };
  });
};


export const getCollageTitle = async (uid: string, collageId: string): Promise<string> => {
  const ref = doc(collagesCol(uid), collageId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("Collage not found");
  }

  return snap.data().title as string;
};


export const addRecipeToCollage = async (
  uid: string,
  collageId: string,
  recipe: RecipeLikeData
) => {
  const ref = doc(
    subCol("users", uid, "collages", collageId, "recipes"),
    recipe.idMeal
  );
  await setDoc(ref, {
    ...recipe,
    addedAt: serverTimestamp(),
  });
};

export const removeRecipeFromCollage = async (
  uid: string,
  collageId: string,
  idMeal: string
) => {
  const ref = doc(
    subCol("users", uid, "collages", collageId, "recipes"),
    idMeal
  );
  await deleteDoc(ref);
};

export const getRecipesInCollage = async (uid: string, collageId: string) => {
  const snaps = await getDocs(
    subCol("users", uid, "collages", collageId, "recipes")
  );
  return snaps.docs.map((d) => {
    const data = d.data() as RecipeLikeData;
    return {
      ...data,
      idMeal: d.id,
    };
  });
};

export const deleteCollage = async (uid: string, collageId: string) => {
  const ref = doc(collagesCol(uid), collageId);
  await deleteDoc(ref);
};
