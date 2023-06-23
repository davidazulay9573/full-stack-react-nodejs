import PageHeader from "../components/PageHeader";
import useCards from "../hooks/useCard/useCards";
import Card from "../components/Card";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
function Home() {
  const [user,,,signOut] = useAuth();
  const cards = useCards();
  const [theme] = useTheme();
  
    return (
      <div className="text-center">
        <PageHeader
          title="Wellcome to Card-Actions !"
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
        {user && !user.biz && (
          <h5 className="p-2">
            <p>
              In this acount you can only get in! <br />
              If you want to add cards and to manage your business you need to
            </p>
            <Link
              to="/sign-up-biz"
              onClick={signOut}
              className={`btn btn-${theme === "dark" ? "light" : "dark"} m-1`}>
              Sign-up-business
            </Link>
          </h5>
        )}
        {user?.biz ? (
          cards.length ? (
            <>
              <Link
                to="/my-cards"
                className={`btn btn-${theme === "dark" ? "light" : "dark"} m-1`}
              >
                All your cards
              </Link>
              <div className="d-flex flex-wrap justify-content-center">
                {cards.toReversed().map((card, index) => {
                  if (index < 3) {
                    return <Card key={card._id} card={card} />;
                  }
                  return null;
                })}
              </div>
            </>
          ) : (
            <>
              <h4>No Cards Yet! </h4>
              <Link to="/add-card"> Click </Link>to add a new card!
            </>
          )
        ) : (
          ""
        )}
      </div>
    );
}

export default Home;
