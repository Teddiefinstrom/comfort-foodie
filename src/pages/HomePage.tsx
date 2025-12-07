import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../service/mealDB";
import Carousel from "../components/Carousel";

const HomePage = () => {

  const { data: sides } = useQuery({
    queryKey: ["sides"],
    queryFn: () => getCategory("Side"),
  });

  const { data: vegeterian } = useQuery({
    queryKey: ["vegeterian"],
    queryFn: () => getCategory("Vegetarian"),
  });

  const { data: chicken } = useQuery({
    queryKey: ["chicken"],
    queryFn: () => getCategory("Chicken"),
  });

  const { data: desserts } = useQuery({
    queryKey: ["desserts"],
    queryFn: () => getCategory("Dessert"),
  });

  return (
    <>
      <div className="home-hero">
        <div className="hero-content">
          <h1>Welcome to Comfort Foodie</h1>
          <p>
            Welcome to Comfort Foodie — a gentle, virtual cookbook made for
            anyone who wants to create something good, nourishing, and calming.
            No pressure. No rules. Just food that feels like home.
          </p>
        </div>
      </div>

      <Carousel title="Sides" recipes={sides || []} />
      <Carousel title="Vegeterian" recipes={vegeterian || []} />
      <Carousel title="Chicken" recipes={chicken || []} />
      <Carousel title="Desserts" recipes={desserts || []} />

    </>
  );
};

export default HomePage;
