import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/Auth/ProtectedRoutes";
import RecipePage from "./pages/RecipePage";
import IngrediensPage from "./pages/IngrediensPage";
import AboutPage from "./pages/AboutPage";
import NavbarMeny from "./components/NavbarMeny";

function App() {
  return (
    <>
      <NavbarMeny />
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/ingrediens" element={<IngrediensPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/*ProtectedRoutes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
