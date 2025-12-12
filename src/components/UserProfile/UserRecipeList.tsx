import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import type { SavedRecipe } from "../../types/recipe";
import { getDocs } from "firebase/firestore";
import { savedRecipesCol } from "../../service/collections.service";
import RecipeCard from "../RecipeCard";
import Loader from "../ErrorHandling/Loader";

const UserRecipeList = () => {
  const { currentUser } = useAuth();
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchRecipes = async () => {
      const snapshot = await getDocs(savedRecipesCol(currentUser.uid));
      const list = snapshot.docs.map((d) => d.data() as SavedRecipe);
      setRecipes(list);
      setLoading(false);
    };
    fetchRecipes();
  }, [currentUser]);

  if (loading) return <Loader />;

  if (recipes.length === 0) {
    return <p> You have not saved any recipes yet...</p>
  }

  return (
    <>
      <h2>Saved Recipes</h2>

      {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            idMeal={recipe.idMeal}
            strMeal={recipe.title}
            strMealThumb={recipe.image}
          />
        ))}
    </>
  );
};

export default UserRecipeList;
