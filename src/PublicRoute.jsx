import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function PublicRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h1>Loading...</h1>;

  return user ? <Navigate to="/" replace /> : <Outlet />; 
}

export default PublicRoute;
