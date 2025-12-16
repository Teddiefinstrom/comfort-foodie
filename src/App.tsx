import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/Auth/ProtectedRoutes";
import RecipePage from "./pages/RecipePage";
import IngredientsPage from "./pages/IngrediensPage";
import AboutPage from "./pages/AboutPage";
import NavbarMeny from "./components/NavbarMeny";
import EditProfilePage from "./pages/EditProfilePage";
import Footer from "./components/Footer";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import ErrorPage from "./pages/ErrorPage";
import SavedRecipesPage from "./pages/SavedRecipesPage";
import CollageDetailPage from "./pages/CollageDetailPage";
import IngredientDetailPage from "./pages/IngredientDetailPage";

function App() {
  return (
    <>
      <NavbarMeny />
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
        <Route path="/ingredients/:name" element={<IngredientDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<ErrorPage />} />

        {/*ProtectedRoutes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="profile/recipes" element={<SavedRecipesPage />} />
          <Route path="/collages/:collageId" element={<CollageDetailPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
