import { Outlet, Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const ProtectedRoutes = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" replace state={{ openLogin: true }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
