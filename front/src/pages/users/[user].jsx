import useTheme from "../../lib/hooks/global-states/useTheme";
import { useParams } from "react-router-dom";
import useUser from "../../lib/hooks/users/useUser";
import usePosts from "../../lib/hooks/posts/usePosts";
import PostCard from "../../components/PostCard";

const UserPage = () => {
  const [theme] = useTheme();
  const { id } = useParams();
  const user = useUser(id);
  const posts = usePosts(id);

  return (
    <>
      <div className={`container mt-5 p-3 rounded ${theme}`}>
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={user?.image}
              className="rounded-circle img-fluid"
              alt="Profile"
              style={{ width: "8rem", height: "8rem" }}
            />
          </div>
          <div className="col-md-8">
            <div className="ms-2 me-2 mt-1 mb-1 ">
              <div className="card-body">
                <h3 className="">{user?.name}</h3>
                <p className="">{user?.email}</p>
                <button className="btn btn-primary">
                  Follow <i className="bi bi-plus-circle-fill"></i>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center m-2 p-2">
        {posts.length ? (
          <div className="d-flex flex-wrap p-4 justify-content-center">
            {posts.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })}
          </div>
        ) : (
          <h4>No posts Yet! </h4>
        )}
      </div>
    </>
  );
};

export default UserPage;
