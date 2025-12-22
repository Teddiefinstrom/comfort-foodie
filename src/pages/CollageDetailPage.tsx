import { Link, useNavigate, useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import type { RecipeLikeData } from "../types/recipe";
import {
  deleteCollage,
  getCollageTitle,
  getRecipesInCollage,
  removeRecipeFromCollage,
} from "../service/collages.service";
import toast from "react-hot-toast";
import Loader from "../components/ErrorHandling/Loader";
import Button from "react-bootstrap/esm/Button";

const CollageDetailPage = () => {
  const { currentUser } = useAuth();
  const { collageId } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<RecipeLikeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [collageTitle, setCollageTitle] = useState("");

  useEffect(() => {
    if (!currentUser || !collageId) return;

    const load = async () => {
      setLoading(true);

      const title = await getCollageTitle(currentUser.uid, collageId);
      const data = await getRecipesInCollage(currentUser.uid, collageId);

      setCollageTitle(title);
      setRecipes(data);
      setLoading(false);
    };
    load();
  }, [currentUser, collageId]);

  const handleRemove = async (idMeal: string) => {
    if (!currentUser || !collageId) return;

    await removeRecipeFromCollage(currentUser.uid, collageId, idMeal);
    setRecipes((prev) => prev.filter((r) => r.idMeal !== idMeal));
    toast.success("Recipe removed");
  };

  const handleDeleteCollage = async () => {
    if (!currentUser || !collageId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this collage? This action cannot be undone."
    );

    if (!confirmed) return;

    await deleteCollage(currentUser.uid, collageId);
    toast.success("Collage deleted");
    navigate("/collages");
  };

  if (!currentUser) return <p>You must be logged in.</p>;
  if (loading) return <Loader />;

  return (
    <div className="recipe-page collage-detail-page">
      <div className="collage-header">
        <h2>{collageTitle}</h2>

        <Button
          variant="danger"
          className="delete-collage-btn"
          onClick={handleDeleteCollage}
        >
          Delete collage
        </Button>
      </div>

      <div className="recipe-grid">
        {recipes.map((r) => (
          <div key={r.idMeal} className="recipe-card collage-recipe-card">
            <button
              className="remove-recipe-btn"
              onClick={() => handleRemove(r.idMeal)}
              aria-label="Remove recipe"
            >
              ❌
            </button>

            <Link to={`/recipe/${r.idMeal}`}>
              <img src={r.image || "/placeholder.png"} alt={r.title} />
            </Link>
            <div className="recipe-card-body">
              <Link to={`/recipe/${r.idMeal}`} className="recipe-card-title">
                {r.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollageDetailPage;
