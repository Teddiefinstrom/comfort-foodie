import Card from "react-bootstrap/Card";
import { Link } from "react-router";
import type { RecipePreview } from "../types/recipe";
import LikeBtn from "./UserProfile/LikeBtn";

const Carousel = ({
  title,
  recipes,
}: {
  title: string;
  recipes: RecipePreview[];
}) => {
  return (
    <>
      <h2 className="carousel-header">{title}</h2>

      <div className="carousel-swiper">
        {recipes.map((recipe) => (
          <Card key={recipe.idMeal} style={{ width: "10rem" }}>
            <div className="img-wrapper">
              <Link to={`/recipe/${recipe.idMeal}`}>
                <Card.Img
                  variant="top"
                  src={
                    recipe.strMealThumb ||
                    "https://placehold.co/500x750?text=No+Image&font=roboto"
                  }
                  alt={recipe.strMeal}
                />
              </Link>
              <LikeBtn
                recipe={{
                  idMeal: recipe.idMeal,
                  title: recipe.strMeal,
                  image: recipe.strMealThumb,
                }}
              />
            </div>

            <Card.Body>
              <Link
                to={`/recipe/${recipe.idMeal}`}
                className="recipe-title-link"
              >
                <Card.Title>{recipe.strMeal}</Card.Title>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Carousel;
