import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../lib/hooks/global-states/useAuth";
import useTheme from "../lib/hooks/global-states/useTheme";
import useSearch from "../lib/hooks/useSearch";
import { Link } from "react-router-dom";
import useUser from "../lib/hooks/users/useUser";

function NavBar() {
  const [userAuth, , , signout] = useAuth();
  const [userDetailes] = useUser(userAuth?._id)
  const [theme, changeTheme] = useTheme();
  const [searchValue, onSearchChange, handleSearch] = useSearch();
  const location = useLocation();

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${theme} bg-${theme} shadow-sm p-3`}
    >
      <div className="container-fluid">
        {userAuth && (
          <Link to={`/users/${userAuth?._id}`} className="btn">
            <img
              src={userDetailes?.image}
              className="rounded-circle"
              alt="Profile"
              style={{ width: "3rem", height: "3rem" }}
            />
          </Link>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            {userAuth && (
              <>
                <li className="nav-item">
                  <NavLink to="/posts" className="nav-link">
                    Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/users" className="nav-link">
                    Users
                  </NavLink>
                </li>
                {userAuth.isContentEditor && (
                  <li className="nav-item">
                    <NavLink to="/posts/add" className="nav-link">
                      Add Post
                    </NavLink>
                  </li>
                )}
              </>
            )}
            {!userAuth && (
              <>
                <li className="nav-item">
                  <NavLink to="/auth/sign-in" className="nav-link">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/auth/sign-up" className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/auth/sign-up-editor" className="nav-link">
                    Sign Up Editor
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {userAuth &&
            (location.pathname.startsWith("/posts") ||
              location.pathname.startsWith("/users")) && (
              <form
                onSubmit={handleSearch}
                className="d-flex mx-auto my-2 my-lg-0 w-50 d-none d-lg-flex"
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchValue}
                  onChange={onSearchChange}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            )}

          <div className="d-flex">
            <button
              className={`btn btn-${theme === "light" ? "dark" : "light"} m-1`}
              onClick={changeTheme}
            >
              {theme === "light" ? (
                <i className="bi bi-moon-stars-fill"></i>
              ) : (
                <i className="bi bi-brightness-high-fill"></i>
              )}
            </button>
            {userAuth && (
              <button
                onClick={signout}
                className={`btn btn-${
                  theme === "light" ? "dark" : "light"
                } m-1`}
              >
                <i className="bi bi-box-arrow-left"></i> Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
