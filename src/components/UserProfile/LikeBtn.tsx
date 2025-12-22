import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {
  saveRecipe,
  removeRecipe,
  isSaved,
} from "../../service/savedRecipes.service";
import type { RecipeLikeData } from "../../types/recipe";
import toast from "react-hot-toast";
import AddToCollageModal from "./AddToCollageModal";
import SaveOptionsModal from "./SaveOptionsModal";
import heartEmpty from "../../styling/images/like-recipe.webp";
import heartFull from "../../styling/images/liked-heart-icon.png";

const LikeBtn = ({ recipe }: { recipe: RecipeLikeData }) => {
  const { currentUser } = useAuth();
  const [saved, setSaved] = useState(false);

  const [showSaveOptions, setShowSaveOptions] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    isSaved(currentUser.uid, recipe.idMeal).then(setSaved);
  }, [currentUser, recipe.idMeal]);

  // Save Recipe
  const handleSaveOnly = async () => {
    if (!currentUser) return;

    await saveRecipe(currentUser.uid, recipe);
    setSaved(true);
    toast.success("Recipe Saved");

    setShowSaveOptions(false);
  };

  const handleRemove = async () => {
    if (!currentUser) return;

    await removeRecipe(currentUser.uid, recipe.idMeal);
    setSaved(false);
    toast.success("Removed from saved recipes");
  };

  const handleAddToCollage = async () => {
    if (!currentUser) return;

    if (!saved) {
      await saveRecipe(currentUser.uid, recipe);
      setSaved(true);
    }
    setShowSaveOptions(false);
    setShowAddModal(true);
  };

  return (
    <>
      <button
        className="like-heart-btn"
        onClick={() => {
          if (!currentUser) {
            toast.error("Log in to save recipes ❤️");
            return;
          }

          if (saved) {
            handleRemove();
            return;
          }
          setShowSaveOptions(true);
        }}
      >
        <img
          src={saved ? heartFull : heartEmpty}
          alt={saved ? "Remove" : "Save"}
        />
      </button>

      <SaveOptionsModal
        show={showSaveOptions}
        onClose={() => setShowSaveOptions(false)}
        onSaveOnly={handleSaveOnly}
        onAddToCollage={handleAddToCollage}
      />

      <AddToCollageModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        recipe={recipe}
      />
    </>
  );
};

export default LikeBtn;
