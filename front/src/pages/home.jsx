import PageHeader from "../components/PageHeader";
import PostCard from "../components/PostCard";
import usePosts from "../lib/hooks/posts/usePosts";
import useAuth from "../lib/hooks/global-states/useAuth";
import useTheme from "../lib/hooks/global-states/useTheme";
import { Link } from "react-router-dom";
function Home() {
  const [user, , , signOut] = useAuth();
  const posts = usePosts();
  const [theme] = useTheme();

  return (
    <div className="text-center">
      <PageHeader
        title="Wellcome to Post-Actions !"
        description=" You can manage your business here ! "
      />
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
            In this acount you can only get in! <br />
            If you want to add posts you need to
          </p>
          <Link
            to="/sign-up-editor"
            onClick={signOut}
            className={`btn btn-${theme === "dark" ? "light" : "dark"} m-1`}
          >
            Sign-up-business
          </Link>
        </h5>
      )}
      {user?.isContentEditor ? (
        posts.length ? (
          <>
            <Link
              to="/posts"
              className={`btn btn-${theme === "dark" ? "light" : "dark"} m-1`}
            >
              All your posts
            </Link>
            <div className="d-flex flex-wrap justify-content-center">
              {posts?.toReversed().map((post, index) => {
                if (index < 3) {
                  return <PostCard key={index} id={post._id} />;
                }
                return null;
              })}
            </div>
          </>
        ) : (
          <>
            <h4>No posts Yet! </h4>
          </>
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
