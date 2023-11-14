import useTheme from "../../lib/hooks/global-states/useTheme";
import { useParams } from "react-router-dom";
import useUser from "../../lib/hooks/users/useUser";

const UserPage = () => {
  const [theme] = useTheme();
  const { id } = useParams()
  const user = useUser(id);
  return (
    <div className={`container mt-5 p-3 rounded ${theme}`}>
      <div className="row">
        <div className="col-md-4 text-center">
          <img
            src={user?.image}
            className="rounded-circle img-fluid"
            alt="Profile"
            style={{ width: "8rem", height: "8rem" }} // Adjust size as needed
          />
        </div>
        <div className="col-md-8">
          <div className="card ms-2 me-2 mt-1 mb-1 shadow p-2 bg-body-tertiary rounded">
            <div className="card-body">
              <h3 className="card-title">{user?.name}</h3>
              <p className="card-text">{user?.email}</p>
              <button className="btn btn-primary">
                Follow <i className="bi bi-plus-circle-fill"></i>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
