import { Link, useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import type { RecipeLikeData } from "../types/recipe";
import {
  getRecipesInCollage,
  removeRecipeFromCollage,
} from "../service/collages.service";
import toast from "react-hot-toast";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";

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
  if (loading) return <p>Loading...</p>;

  return (
    <div className="collage-detail-page">
      <h2>Collage</h2>

      {recipes.length === 0 ? (
        <p>This collage has no recipes yet</p>
      ) : (
        <div>
          {recipes.map((r) => (
            <Card key={r.idMeal} style={{ width: "12rem" }}>
              <Link to={`/recipe/${r.idMeal}`}>
                <Card.Img src={r.image || "/placeholder.png"} />
              </Link>

              <Card.Body>
                <Card.Title>{r.title}</Card.Title>

                <Button
                  variant="outline-danger"
                  onClick={() => handleRemove(r.idMeal)}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollageDetailPage;
