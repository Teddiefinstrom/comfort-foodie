import { Link, useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import type { RecipeLikeData } from "../types/recipe";
import {
  getRecipesInCollage,
  removeRecipeFromCollage,
} from "../service/collages.service";
import toast from "react-hot-toast";
import Loader from "../components/ErrorHandling/Loader";

const CollageDetailPage = () => {
  const { currentUser } = useAuth();
  const { collageId } = useParams();
  const [recipes, setRecipes] = useState<RecipeLikeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || !collageId) return;

    const load = async () => {
      setLoading(true);
      const data = await getRecipesInCollage(currentUser.uid, collageId);
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

  if (!currentUser) return <p>You must be logged in.</p>;
  if (loading) return <Loader />;

  return (
    <div className="recipe-page collage-detail-page">
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
