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

const RecipePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const {
    categories,
    areas,
    isLoading: filtersLoading,
    isError: filterError,
  } = useRecipeFilters();

  const previewsQuery = useRecipePreviews(
    selectedCategory,
    selectedArea,
  );

  const previews = previewsQuery.data || [];

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
      <HeroBanner background="/src/styling/images/bbbff.jpg">
        <h1>Recipes</h1>
        <SearchBar onSearch={setSearchQuery} />
      </HeroBanner>

      {filtersLoading || previewsQuery.isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
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
