import PageHeader from "../components/PageHeader";
import useAuth from "../lib/hooks/global-states/useAuth";
import useTheme from "../lib/hooks/global-states/useTheme";
import { Link } from "react-router-dom";
function Home() {
  const [userAuth,] = useAuth();

  const [theme] = useTheme();

  return (
    <div className="text-center">
      <PageHeader
        title="Wellcome to Post-Actions !"
        description="In this platfoem you can create update and delete posts, you can also follow after userAuths for see posts. "
      />
      {!userAuth && (
        <h5 className="p-2">
          For start you need to <br />
          <Link
            to="/auth/sign-in"
            className={`btn btn-${theme === "dark" ? "light" : "dark"} m-1`}
          >
            Sign-In
          </Link>
          <Link
            to="/auth/sign-up"
            className={`btn btn-${theme === "dark" ? "light" : "dark"} m-1`}
          >
            Sign-Up
          </Link>
        </h5>
      )}
      {userAuth && !userAuth?.isContentEditor && (
        <h5 className="p-2">
          <p>
            In this acount you can only Follow after userAuths and read posts!
            <br />
            If you want to create posts you need to switch your acount type <br />
            you need to navigate to personal page.
          </p>
          <Link
            to={`/users/${userAuth._id}`}
            className={`btn btn-${theme === "dark" ? "light" : "dark"} m-1`}
          >
            Personal 
          </Link>
        </h5>
      )}
    </div>
  );
}

export default Home;
