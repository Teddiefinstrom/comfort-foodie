import Card from "react-bootstrap/Card";
import type { RecipeFull } from "../types/recipe";

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
  <Card.Body>
    <Card.Title as="h1" className="recipe-title">
      {recipe.strMeal}
    </Card.Title>

    <Card.Text className="recipe-meta text-muted">
      {recipe.strCategory && <span>{recipe.strCategory}</span>}
      {recipe.strArea && <span> · {recipe.strArea}</span>}
    </Card.Text>
  </Card.Body>

  <Card.Body className="recipe-main">
    <div className="recipe-media">
      <Card.Img
        src={recipe.strMealThumb}
        className="detail-img"
        alt={recipe.strMeal}
      />
    </div>

    <div className="recipe-ingredients">
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.measure} {item.ingredient}
          </li>
        ))}
      </ul>
    </div>
  </Card.Body>

  <Card.Body className="recipe-instructions">
    <h3>Instructions</h3>
    {steps?.map((step, index) => (
      <p key={index}>{step}</p>
    ))}
  </Card.Body>
</Card>

  );
};

export default RecipeDetailCard;
