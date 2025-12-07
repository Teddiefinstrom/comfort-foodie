import { useQuery } from "@tanstack/react-query";
import RecipeCard from "../components/RecipeCard";
import { getAllRecipes } from "../service/mealDB";
import { useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";

const RecipePage = () => {
  const [visibleCount, setVisibleCount] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allRecipes } = useQuery({
    queryKey: ["all-recipes"],
    queryFn: getAllRecipes,
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const randomRecipe = useMemo(() => {
    if (!allRecipes) return [];
    return [...allRecipes].sort(() => Math.random() - 0.5);
  }, [allRecipes]);

  const filteredRecipies = useMemo(() => {
    if (!searchQuery) return randomRecipe;

    return randomRecipe.filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, randomRecipe]);

  const selectedRecipes = searchQuery ? filteredRecipies : randomRecipe;

  const visibleRecipes = selectedRecipes.slice(0, visibleCount);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setVisibleCount((prev) => prev + 20);
          }
        });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, []);



  return (
    <>
      <div className="recipe-hero">
        <div className="hero-content">
          <h1>Recipes</h1>
          <SearchBar onSearch={(value) => setSearchQuery(value)} />
        </div>
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
