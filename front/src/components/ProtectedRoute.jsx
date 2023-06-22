import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children, is_only_biz }) {
  const [user] = useAuth();

  if (!user || (is_only_biz && !user.biz)) {
    return <Navigate to="/sign-in" />;
  }
  return children;
}

export default ProtectedRoute;
