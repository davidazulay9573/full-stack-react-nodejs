import useTheme from "../../lib/hooks/global-states/useTheme";
import { useParams } from "react-router-dom";
import useUser from "../../lib/hooks/users/useUser";
import usePosts from "../../lib/hooks/posts/usePosts";
import PostCard from "../../components/common/PostCard";
import useAuth from "../../lib/hooks/global-states/useAuth";

const UserPage = () => {
  const { id } = useParams();
  const [user, handleFollow, isFollow, handleSwitchEditorStatus] = useUser(id);
  const [posts, isLoading] = usePosts(id);
  const [userAuth] = useAuth();
  const isUserAuth = id === userAuth._id;
  const [theme] = useTheme();

  return (
    <>
      <div className={` container mt-5 p-3 rounded ${theme} text-center`}>
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
                {isUserAuth &&  user?.isContentEditor && 
                 <p>Your acount is Editor</p> }
                {isUserAuth && user?.isContentEditor === false &&  
                 <>
                    <button
                      onClick={handleSwitchEditorStatus}
                      className="btn btn-primary"
                    >
                      Switch to Editor acount
                    </button>
                    <p>
                      After you switch the status you need to sign in again!
                    </p>
                  </>}
                {!isUserAuth && (
                  <button
                    onClick={handleFollow}
                    className={`btn ${
                      isFollow ? "btn-danger" : "btn-primary"
                    }`}
                  >
                    {isFollow ? "Unfollow" : "Follow"}
                    <i
                      className={`bi ${
                        isFollow ? "bi-person-x-fill" : "bi-person-plus-fill"
                      }`}
                    ></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center m-2 p-2">
        {posts.length ? (
          <div className="d-flex flex-wrap p-4 justify-content-center">
            {posts.map((post) => {
              return <PostCard key={post._id} id={post._id} />;
            })}
          </div>
        ) : isLoading ? (
          <h4>Loading...</h4>
        ) : (
          <h4>No posts Yet! </h4>
        )}
      </div>
    </>
  );
};

export default UserPage;
