import Card from "react-bootstrap/Card";
import placeholderPic from "../styling/images/cf-default-profile.png";
import type { RecipePreview } from "../types/recipe";
import { Link } from "react-router";
import LikeBtn from "./UserProfile/Likebtn";

const RecipeCard = ({ strMeal, strMealThumb, idMeal }: RecipePreview) => {
  return (
    <>
<Card className="recipe-card">
    <div className="img-wrapper">
  <Link to={`/recipe/${idMeal}`}>
    <Card.Img 
      variant="top" 
      src={strMealThumb || placeholderPic} 
    />
  </Link>
  <LikeBtn
    recipe={{
      idMeal,
      title: strMeal,
      image: strMealThumb || placeholderPic
    }}
  />
  </div>
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
