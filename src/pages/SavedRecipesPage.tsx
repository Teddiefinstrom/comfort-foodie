import { useState } from "react";
import ToggleBtns from "../components/UserProfile/ToggleBtns";
import UserRecipeList from "../components/UserProfile/UserRecipeList";
import UserCollageList from "../components/UserProfile/UserCollageList";

const SavedRecipesPage = () => {
  const [view, setView] = useState("recipes");

  return (
    <>
      <ToggleBtns view={view} setView={setView} />

      {view === "recipes" && <UserRecipeList />}
      {view === "collages" && <UserCollageList />}
    </>
  );
};

export default SavedRecipesPage;
