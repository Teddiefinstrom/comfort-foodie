import Card from 'react-bootstrap/Card';
import { Link } from 'react-router';
import type { RecipePreview } from "../types/recipe";

const Carousel = ({ title, recipes }: { title: string; recipes: RecipePreview[]; }) => {

  return (
    <>

<h2 className ="intro-header">{title}</h2>

<div className="carousel-swiper">
  {recipes.map((recipe) => (
<Card key={recipe.idMeal} style={{ width: '10rem' }}>
    <Link to={`/recipe/${recipe.idMeal}`}>
<Card.Img 
variant="top" 
src={recipe.strMealThumb || 
     "https://placehold.co/500x750?text=No+Image&font=roboto" 
      }
      alt={recipe.strMeal}
      />
    </Link>
      <Card.Body>
        <Card.Title>{recipe.strMeal}</Card.Title>
      </Card.Body>
      
    </Card>
    ))}
    </div>
    </>
  );
}

export default Carousel;
