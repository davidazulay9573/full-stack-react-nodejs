import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";



function NavBar() {
  const [user,,sinout] = useAuth()
  return (
    <nav
      className=" navbar navbar-expand-sm navbar-light bg-light shadow-sm p-3"
      aria-label="Fourth navbar example"
    >
      <h4 className="navbar-brand">
        Card__<i className="bi bi-card-checklist"></i>__Actions
      </h4>

      <div className="form-check form-switch flex-fill float-xl-start ">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />
        <label className="form-check-label"></label>
      </div>

      <div className="collapse navbar-collapse" id="navbarsExample04">
        <ul className="navbar-nav ms-auto mb-2 mb-md-0">
          {user && (
            <>
              <li
                onClick={sinout}
                className="nav-item"
              >
                <NavLink to="/" className="nav-link">
                  Log Out
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  My Cards
                </NavLink>
                <></>
              </li>{" "}
            </>
          )}
          {!user && (
            <>
              <li className="nav-item">
                <NavLink to="/sign-in" className="nav-link">
                  Sign In
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/sign-up" className="nav-link">
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/sign-up-biz" className="nav-link">
                  Sign Up Business
                </NavLink>
              </li>
            </>
          )}

          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </li>
        </ul>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarsExample04"
        aria-controls="navbarsExample04"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>
  );
}

export default NavBar;
