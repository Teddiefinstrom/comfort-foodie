import { useQuery } from "@tanstack/react-query";
import RecipeCard from "../components/RecipeCard";
import { getAllRecipes } from "../service/mealDB";
import { useEffect, useMemo, useRef, useState } from "react";

const RecipePage = () => {
  const [visibleCount, setVisibleCount] = useState(20);

  const { data: allRecipes } = useQuery({
    queryKey: ["all-recipes"],
    queryFn: getAllRecipes,
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const randomRecipe = useMemo(() => {
    if (!allRecipes) return [];
    return [...allRecipes].sort(() => Math.random() - 0.5);
  }, [allRecipes]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setVisibleCount((prev) => prev + 20);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, []);

  const visibleRecipes = randomRecipe.slice(0, visibleCount);

  return (
    <>
      <div className="recipe-hero">
        <h1>Recipes</h1>
      </div>
      <div className="recipe-page">
        <div className="recipe-grid">
          {visibleRecipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} {...recipe} />
          ))}
        </div>
        <div ref={loadMoreRef}></div>
      </div>
    </>
  );
};

export default RecipePage;
