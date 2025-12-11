import Card from "react-bootstrap/Card";
import placeholderPic from "../styling/images/cf-default-profile.png";
import type { RecipePreview } from "../types/recipe";
import { Link } from "react-router";

const RecipeCard = ({ strMeal, strMealThumb, idMeal }: RecipePreview) => {
  return (
    <>
<Card className="recipe-card">
  <Link to={`/recipe/${idMeal}`}>
    <Card.Img 
      variant="top" 
      src={strMealThumb || placeholderPic} 
    />
  </Link>

  <Card.Body>
    <Link to={`/recipe/${idMeal}`} className="recipe-card-title">
      <Card.Title>{strMeal}</Card.Title>
    </Link>
  </Card.Body>
</Card>

    </>
  );
};

export default RecipeCard;
