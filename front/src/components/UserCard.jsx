import useTheme from "../lib/hooks/global-states/useTheme";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  const [theme] = useTheme();

  return (
   <div
      className={`card ms-2 me-2 mt-1 mb-1 shadow p-2 bg-body-tertiary rounded ${theme}`}
    >
      <div className="d-flex align-items-center">
       <Link to={`/users/${user._id}`}>
            <img
              src={user?.image}
              className="rounded-circle img-fluid"
              alt="Profile"
              style={{ width: "4rem", height: "4rem" }}
           />
       </Link>
        <div className="flex-grow-1 ms-3">
          <h5 className="card-title text-center">{user?.name}</h5>
        </div>
        <button className="btn btn-primary">
          Follow <i className="bi bi-plus-circle-fill"></i>
        </button>
      </div>

    </div>

  );
};

export default UserCard;
