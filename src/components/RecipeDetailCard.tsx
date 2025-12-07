import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import type { Recipe } from "../types/recipe";

const RecipeDetailCard = ({ recipe }: { recipe: Recipe }) => {

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
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={recipe.strMealThumb} />
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
      <ListGroup className="list-group-flush">
        {/** Ingredients */}
        <ListGroup.Item>
          Ingrediens:
          <ul style={{ marginTop: "0.5rem" }}>
            {ingredients.map((item, index) => (
              <li key={index}>
                {item.measure} {item.ingredient}
              </li>
            ))}
          </ul>
        </ListGroup.Item>

        {/** Instructions */}
        <ListGroup.Item>
          Instructions:
          <div style={{ marginTop: "0.5rem" }}>
            {steps?.map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default RecipeDetailCard;
