import Carousel from "../components/Carousel";
import Loader from "../components/ErrorHandling/Loader";
import HeroBanner from "../components/HeroBanner";
import useHomeCategories from "../hooks/useHomeCategories";
import toast from "react-hot-toast";

const HomePage = () => {
  const { data, isLoading, isError, error } = useHomeCategories([
    "Side",
    "Vegetarian",
    "Chicken",
    "Dessert",
    "Lamb",
    "Pork",
    "Seafood",
  ]);

  const [sides, vegetarian, chicken, desserts, lamb, pork, seafood] = data;

  if (isError) {
    console.error(error);
    toast.error("Something went wrong. Please try again later.");
    return null;
  }

  return (
    <>
      <HeroBanner background="/src/styling/images/loveiiii.jpg">
      <h1>Food that feels like home</h1>
      </HeroBanner>
      <div className="intro-text-section">
      <p className="intro-text">
          A gentle, virtual cookbook made for anyone who wants to create
          something good, nourishing, and calming.
        </p>
        </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="home-carousel">
            <Carousel title="Sides" recipes={sides || []} />
            <Carousel title="Vegetarian" recipes={vegetarian || []} />
            <Carousel title="Chicken" recipes={chicken || []} />
            <Carousel title="Lamb" recipes={lamb || []} />
            <Carousel title="Pork" recipes={pork || []} />
            <Carousel title="Seafood" recipes={seafood || []} />
            <Carousel title="Desserts" recipes={desserts || []} />
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
