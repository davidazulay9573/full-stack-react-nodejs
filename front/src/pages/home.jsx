import PageHeader from "../components/PageHeader";
import useAuth from "../lib/hooks/global-states/useAuth";
import useTheme from "../lib/hooks/global-states/useTheme";
import { Link } from "react-router-dom";
function Home() {
  const [user, , , signOut] = useAuth();

  const [theme] = useTheme();

  return (
    <div className="text-center">
      <PageHeader title="Wellcome to Post-Actions !" description='In this platfoem you can create update and delete posts, you can also follow after users for see posts. '/>
      {!user && (
        <h5 className="p-2">
          For start you need to <br />
          <Link
            to="/sign-in"
            className={`btn btn-${theme === "dark" ? "light" : "dark"} m-1`}
          >
            Sign-In
          </Link>
          <Link
            to="/sign-up"
            className={`btn btn-${theme === "dark" ? "light" : "dark"} m-1`}
          >
            Sign-Up
          </Link>
        </h5>
      )}
      {user && !user?.isContentEditor && (
        <h5 className="p-2">
          <p>
            In this acount you can only Follow after users and read posts!
            <br />
            If you want to create posts you need to
          </p>
          <Link
            to="/sign-up-editor"
            onClick={signOut}
            className={`btn btn-${theme === "dark" ? "light" : "dark"} m-1`}
          >
            Sign-up-Editor
          </Link>
        </h5>
      )}
    </div>
  );
}

export default Home;
