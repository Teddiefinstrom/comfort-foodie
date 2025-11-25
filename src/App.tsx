import {Routes, Route} from "react-router";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {

  return (
    <>
     <Toaster position="top-right" />
    <Routes>
      <Route path='/' element={<HomePage />} />

    {/*ProtectedRoutes */}
    <Route element={<ProtectedRoutes />} >
      <Route path='/profile' element={<ProfilePage />} />
      </Route>

    </Routes>
    </>
  )
}

export default App
