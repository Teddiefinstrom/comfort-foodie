import Card from "react-bootstrap/Card";
import placeholderPic from "../styling/images/cf-default-profile.png";
import type { Recipe } from "../types/recipe";
import { Link } from "react-router";

const RecipeCard = ({ strMeal, strMealThumb, idMeal }: Recipe) => {

  return (
    <>
        <Card className="recipe-card" style={{ width: "20rem" }}>
        <Link to={`/recipe/${idMeal}`}>
          <Card.Img variant="top" src={strMealThumb || placeholderPic} />
          <Card.Body>
            <Card.Title>{strMeal}</Card.Title>
          </Card.Body>
          </Link>
        </Card>
    
    </>
  );
};

export default RecipeCard;
