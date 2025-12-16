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
import AddToCollageModal from "../AddToCollageModal";
import SaveOptionsModal from "../SaveOptionsModal";

const LikeBtn = ({ recipe }: { recipe: RecipeLikeData }) => {
  const { currentUser } = useAuth();
  const [saved, setSaved] = useState(false);

  const [showSaveOptions, setShowSaveOptions] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    isSaved(currentUser.uid, recipe.idMeal).then(setSaved);
  }, [currentUser, recipe.idMeal]);

  // Save Racipe
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
      <Button
        variant="outline-warning"
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
        {saved ? "Remove" : "Save"}
      </Button>

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
