import { NavLink } from "react-router-dom";
import useAuth from "../lib/hooks/global-states/useAuth";
import useTheme from "../lib/hooks/global-states/useTheme";

function NavBar() {
  const [user, , , sinout] = useAuth();
  const [theme, changeTheme] = useTheme();

  return (
    <nav
      className={`navbar navbar-expand-sm navbar-${theme} bg-${theme} shadow-sm p-3 `}
      aria-label="Fourth navbar example"
    >
      <NavLink to="/" className="nav-link">
        <h4 className="navbar-brand">
          Post__<i className="bi bi-post-checklist"></i>__Actions
        </h4>
      </NavLink>
      <button className={`btn btn-light m-1`} onClick={changeTheme}>
        {theme === "light" ? (
          <i className="bi bi-moon-stars-fill"></i>
        ) : (
          <i className="bi bi-brightness-high-fill"></i>
        )}
      </button>
      {user && (
        <button onClick={sinout} className={`btn btn-light m-1`}>
          <i className="bi bi-box-arrow-left"></i> Log Out
        </button>
      )}

      <div className="collapse navbar-collapse" id="navbarsExample04">
        <ul className="navbar-nav ms-auto mb-2 mb-md-0">
          {user?.isContentEditor && (
            <>
              <li className="nav-item">
                <NavLink to="/posts" className="nav-link">
                  posts
                </NavLink>
                <></>
              </li>
              <li className="nav-item">
                <NavLink to="/posts/add" className="nav-link">
                  Add post
                </NavLink>
              </li>
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
                <NavLink to="/sign-up-editor" className="nav-link">
                  Sign Up Editor
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
