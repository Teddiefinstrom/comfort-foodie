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
  ]);

  const [sides, vegetarian, chicken, desserts] = data;

  //if (isLoading) return <Loader />;
  if (isError) {
    console.error(error);
    toast.error("Something went wrong. Please try again later.");
    return null;
  }

  return (
    <>
      <HeroBanner background="/src/styling/images/loveiiii.jpg">
        <h1>Welcome to Comfort Foodie</h1>
        <p>
          Welcome to Comfort Foodie — a gentle, virtual cookbook made for anyone
          who wants to create something good, nourishing, and calming.
        </p>
      </HeroBanner>

      {isLoading ? (
        <Loader />
      ) : (
<>
      <div>
        <Carousel title="Sides" recipes={sides || []} />
        <Carousel title="Vegetarian" recipes={vegetarian || []} />
        <Carousel title="Chicken" recipes={chicken || []} />
        <Carousel title="Desserts" recipes={desserts || []} />
      </div>
      </>
      )}
    </>
  );
};

export default HomePage;
