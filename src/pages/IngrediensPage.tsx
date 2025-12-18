import { useQuery } from "@tanstack/react-query";
import HeroBanner from "../components/HeroBanner";
import type { Ingredient } from "../types/recipe";
import { getIngredients, getIngredientsThumb } from "../service/mealDB";
import Loader from "../components/ErrorHandling/Loader";
import { Link } from "react-router";
import { useMemo, useState } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Button from "react-bootstrap/esm/Button";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const IngredientsPage = () => {
  const [activeLetter, setActiveLetter] = useState<null | string>(null);

  const {
    data: ingredients,
    isLoading,
    isError,
  } = useQuery<Ingredient[]>({
    queryKey: ["ingredients"],
    queryFn: getIngredients,
  });

  const sortedIngredients = useMemo(() => {
    if (!ingredients) return [];
    return [...(ingredients || [])].sort((a, b) =>
      a.strIngredient.localeCompare(b.strIngredient)
    );
  }, [ingredients]);

  const filterByLetter = useMemo(() => {
    if (!activeLetter) return sortedIngredients;

    return sortedIngredients.filter(
      (i) => i.strIngredient[0]?.toUpperCase() === activeLetter
    );
  }, [sortedIngredients, activeLetter]);

  const { visibleItems, loadMoreRef, isLoadingMore } = useInfiniteScroll(
    activeLetter ? filterByLetter : sortedIngredients,
    20
  );

  const itemsToShow = activeLetter ? filterByLetter : visibleItems;
  const totalItems = activeLetter
    ? filterByLetter.length
    : sortedIngredients.length;

  return (
    <>
      <HeroBanner background="/src/styling/images/ingrediens.jpg">
        <h1>Get to know your ingredients</h1>
      </HeroBanner>

      <p className="letter-nav-label">Browse by letter</p>

      <div className="letter-nav">
        <Button
          onClick={() => setActiveLetter(null)}
          className={`all-letter-btn ${!activeLetter ? "active" : ""}`}
        >
          All
        </Button>
        {ALPHABET.map((letter) => (
          <Button
            key={letter}
            className={`letter-btn ${activeLetter === letter ? "active" : ""}`}
            onClick={() => setActiveLetter(letter)}
          >
            {letter}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="ingredients-page">
          <div className="ingredients-grid">
            {itemsToShow.map((ing) => (
              <Link
                key={ing.idIngredient}
                to={`/ingredients/${encodeURIComponent(ing.strIngredient)}`}
                className="ingredient-card"
              >
                <img
                  src={getIngredientsThumb(ing.strIngredient)}
                  alt={ing.strIngredient}
                />
                <p>{ing.strIngredient}</p>
              </Link>
            ))}
          </div>

          {!activeLetter && (
            <div ref={loadMoreRef} style={{ height: "40px" }}></div>
          )}

          {isLoadingMore && !activeLetter && (
            <div>
              <Loader />
            </div>
          )}
          {!isLoadingMore &&
            !activeLetter &&
            visibleItems.length >= totalItems && <p>End of ingredients</p>}
        </div>
      )}
    </>
  );
};

export default IngredientsPage;
