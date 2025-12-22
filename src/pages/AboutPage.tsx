import HeroBanner from "../components/HeroBanner";
import aboutimg from "../styling/images/aboutimg.jpg";

const AboutPage = () => {
  return (
    <>
      <HeroBanner background={aboutimg}>
        <h1>About Comfort Foodie</h1>
      </HeroBanner>
      <div className="about-page">
        <p>
          Comfort Foodie is a recipe platform created to inspire joy, curiosity,
          and a relaxed relationship with food. It’s a place for people who love
          cooking, discovering new flavors, and exploring food from different
          cultures – without pressure, rules, or diet-focused thinking.
        </p>
        <p>
          Instead of focusing on calories or restrictions, Comfort Foodie
          encourages users to cook for pleasure, creativity, and comfort.
          Whether you’re looking for a familiar favorite or something completely
          new, the goal is to make food exploration feel warm, accessible, and
          enjoyable.
        </p>
      </div>
    </>
  );
};

export default AboutPage;
