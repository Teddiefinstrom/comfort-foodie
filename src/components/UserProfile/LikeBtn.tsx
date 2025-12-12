import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {
  saveRecipe,
  removeRecipe,
  isSaved,
} from "../../service/savedRecipes.service";
import type { RecipeLikeData } from "../../types/recipe";
import Button from "react-bootstrap/esm/Button";
import toast from "react-hot-toast";

const LikeBtn = ({ recipe }: { recipe: RecipeLikeData }) => {
  const { currentUser } = useAuth();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    isSaved(currentUser.uid, recipe.idMeal).then(setSaved);
  }, [currentUser, recipe.idMeal]);

  const toggleSave = async () => {
    if (!currentUser) return;

    if (saved) {
      await removeRecipe(currentUser.uid, recipe.idMeal);
      setSaved(false);
    } else {
      await saveRecipe(currentUser.uid, recipe);
      setSaved(true);
    }
  };

  return (
    <>
      <Button 
      variant="outline-warning" 
      onClick={() => {
        if (!currentUser) {
          toast.error("Log in to save recipes ❤️");
          return;
        }
        toggleSave();
      }}
      >
        {saved ? "Remove" : "Save"}
      </Button>
    </>
  );
};

export default LikeBtn;
