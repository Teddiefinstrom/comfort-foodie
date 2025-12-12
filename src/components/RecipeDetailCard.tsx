import Card from "react-bootstrap/Card";
import type { RecipeFull } from "../types/recipe";
import LikeBtn from "./UserProfile/Likebtn";

const RecipeDetailCard = ({ recipe }: { recipe: RecipeFull }) => {
  const ingredients: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const meas = recipe[`strMeasure${i}`];

    if (ing && ing.trim() !== "") {
      ingredients.push({
        ingredient: ing,
        measure: meas || "",
      });
    }
  }

  const steps = recipe.strInstructions
    ?.split(/\r?\n/)
    .filter((s) => s.trim() !== "");

  return (
    <Card className="recipe-detail-card">
      <div className="detail-layout">
        <div className="left-section">
          <div className="detail-img-wrapper">
            <Card.Img
              variant="top"
              src={recipe.strMealThumb}
              className="detail-img"
            />

            <LikeBtn
              recipe={{
                idMeal: recipe.idMeal,
                title: recipe.strMeal,
                image: recipe.strMealThumb,
              }}
            />
          </div>
          <Card.Body>
            <Card.Title>{recipe.strMeal}</Card.Title>

            {recipe.strCategory && (
              <Card.Text>
                <strong>Category:</strong> {recipe.strCategory}
              </Card.Text>
            )}

            {recipe.strArea && (
              <Card.Text>
                <strong>Origin:</strong> {recipe.strArea}
              </Card.Text>
            )}
          </Card.Body>

          <div className="ingredients-box">
            <h4>Ingredients</h4>
            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>
                  {item.measure} {item.ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="right-section">
          <h3>Instructions</h3>
          {steps?.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RecipeDetailCard;
