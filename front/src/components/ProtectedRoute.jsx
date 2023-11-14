import useAuth from "../lib/hooks/useAuth";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children, is_only_biz }) {
  const [user] = useAuth();

  if (!user || (is_only_biz && !user?.isBusiness)) {
    console.log(user?.isBusiness);
    return <Navigate to="/sign-in" />;
  }
  return children;
}

export default ProtectedRoute;
