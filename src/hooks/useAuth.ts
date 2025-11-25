import { createContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const context = createContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider!");
  }
  return context;

};

export default useAuth;
