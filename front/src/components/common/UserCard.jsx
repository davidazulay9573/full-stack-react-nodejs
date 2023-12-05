import useTheme from "../../lib/hooks/global-states/useTheme";
import { Link } from "react-router-dom";
import useUser from "../../lib/hooks/users/useUser";
import useAuth from "../../lib/hooks/global-states/useAuth";

const UserCard = ({ id , buttonDisplay}) => {
  const [theme] = useTheme();
  const [userAuth] = useAuth();
  const [user, handleFollow, isFollow] = useUser(id);
 
  return (
    <div className={`card ms-2 me-2 mt-1 mb-1 shadow p-2 rounded ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="d-flex align-items-center">
        <Link to={`/users/${id}`} className="text-decoration-none">
          <div className="d-flex flex-column align-items-center">
            <span
              className={`rounded-circle border border-2 ${theme === 'dark' ? 'border-light' : 'border-dark'}`}
              style={{ width: "4rem", height: "4rem"}}
            >
            <img
              src={user?.image}
              className="rounded-circle"
              alt="Profile"
              style={{ width: '100%', height: '100%', objectFit: "cover" }}
            />
            </span>
          </div>
        </Link>
        <div className="flex-grow-1 ms-3">
          <h5 className="card-title text-center">{user?.name}</h5>
        </div>
         { buttonDisplay && id !== userAuth._id && (
          <button
            onClick={handleFollow}
            className={`btn ${isFollow ? "btn-danger" : "btn-primary"}`}
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
  );
};

export default UserCard;
