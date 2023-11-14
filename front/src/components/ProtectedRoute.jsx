import useAuth from "../lib/hooks/global-states/useAuth";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children, is_only_editor }) {
  const [user] = useAuth();

  if (!user || (is_only_editor && !user?.isContentEditor)) {
    console.log(user?.isContentEditor);
    return <Navigate to="/sign-in" />;
  }
  return children;
}

export default ProtectedRoute;
