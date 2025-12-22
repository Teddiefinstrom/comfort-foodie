import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterSearch from "../components/FilterSearch";
import RecipeCard from "../components/RecipeCard";
import useRecipeFilters from "../hooks/useRecipeFilters";
import useRecipePreviews from "../hooks/useRecipePreviews";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import toast from "react-hot-toast";
import Loader from "../components/ErrorHandling/Loader";
import HeroBanner from "../components/HeroBanner";
import type { RecipePreview } from "../types/recipe";
import recipepageimg from "../styling/images/recipepage.jpg";
import Button from "react-bootstrap/esm/Button";

const RecipePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const hasActiveFilters = searchQuery || selectedCategory || selectedArea;

  const {
    categories,
    areas,
    isLoading: filtersLoading,
    isError: filterError,
  } = useRecipeFilters();

  const previewsQuery = useRecipePreviews(selectedCategory, selectedArea);

  const previews: RecipePreview[] = previewsQuery.data || [];

  const filteredRecipes = useMemo(() => {
    return searchQuery.trim()
      ? previews.filter((recipe) =>
          recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : previews;
  }, [previews, searchQuery]);

  const { visibleItems, loadMoreRef } = useInfiniteScroll(filteredRecipes);

  if (filterError || previewsQuery.isError) {
    console.error(previewsQuery.error);
    toast.error("Something went wrong. Please try again later.");
    return null;
  }

  return (
    <>
      <HeroBanner background={recipepageimg}>
        <h1>Find recipes worth returning to</h1>
      </HeroBanner>

      {filtersLoading || previewsQuery.isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchBar onSearch={setSearchQuery} />



          <div className="control-section">
            <FilterSearch
              categories={categories}
              areas={areas}
              onCategorySelect={(v) => {
                setSelectedCategory(v);
                setSelectedArea("");
              }}
              onAreaSelect={(v) => {
                setSelectedArea(v);
                setSelectedCategory("");
              }}
            />
          </div>

          {hasActiveFilters && (
            <Button
            variant="danger"
              className="clear-filter-btn"
              aria-label="Clear search and filters"
              title="Clear search and filters"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
                setSelectedArea("");
              }}
            >
              Clear Search
            </Button>
          )}
          <div className="recipe-page">
            <div className="recipe-grid">
              {visibleItems.map((recipe) => (
                <RecipeCard key={recipe.idMeal} {...recipe} />
              ))}
            </div>
            <div ref={loadMoreRef}></div>
          </div>
        </>
      )}
    </>
  );
};

export default RecipePage;
