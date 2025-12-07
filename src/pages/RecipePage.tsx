import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../components/SearchBar";
import FilterSearch from "../components/FilterSearch";
import RecipeCard from "../components/RecipeCard";
import {
    getCategories,
    getAreas,
    getIngredients,
    getAllPreviewRecipes,
    getPreviewByCategory,
    getPreviewByArea,
    getPreviewByIngredient,
  } from "../service/mealDB";
import type { RecipePreview } from "../types/recipe";

const RecipePage = () => {
  const [visibleCount, setVisibleCount] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  
  const { data: categories } = useQuery({
    queryKey: ["categories"], 
    queryFn: getCategories});

  const { data: areas } = useQuery({
    queryKey: ["areas"], 
    queryFn: getAreas});

  const { data: ingredients } = useQuery({
    queryKey: ["ingredients"], 
    queryFn: getIngredients});

  const { data: previews } = useQuery({
  queryKey: ["preview", selectedCategory, selectedArea, selectedIngredient],
  queryFn: async () => {
    if (selectedCategory) return getPreviewByCategory(selectedCategory);
    if (selectedArea) return getPreviewByArea(selectedArea);
    if (selectedIngredient) return getPreviewByIngredient(selectedIngredient);

    return getAllPreviewRecipes();
  },
});

  const filteredRecipes = useMemo<RecipePreview[]>(() => {
    if (!previews) return [];

    let list = previews;
  
    if (searchQuery.trim()) {
      list = list.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  return list;
    }, [previews, searchQuery]);
  
  
  const visibleRecipes = filteredRecipes.slice(0, visibleCount);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setVisibleCount((prev) => {
                if (prev >= filteredRecipes.length) return prev;
                return prev + 20;
              });
          }
        });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [filteredRecipes]);


  return (
    <>
      <div className="recipe-hero">
        <div className="hero-content">
          <h1>Recipes</h1>
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </div>

      <div>
        <FilterSearch 
        categories={categories}
        areas={areas}
        ingredients={ingredients}
        onCategorySelect={(v) => {
            setSelectedCategory(v);
            setSelectedArea("");
            setSelectedIngredient("");
          }}
          onAreaSelect={(v) => {
            setSelectedArea(v);
            setSelectedCategory("");
            setSelectedIngredient("");
          }}
          onIngredientSelect={(v) => {
            setSelectedIngredient(v);
            setSelectedCategory("");
            setSelectedArea("");
          }}
        />
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
