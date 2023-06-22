import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import useCards from "../hooks/useCard/useCards";
import { Link } from "react-router-dom";

function MyCards() {
  const cards = useCards();
  return (
    <div className="text-center " >
      <PageHeader title="My Cards"></PageHeader>
      <br />
      {cards.length ? (
        <div
          className="d-flex flex-wrap p-4 justify-content-center"
        
        >
          {cards.map((card) => {
            return <Card key={card._id} card={card} />;
          })}
        </div>
      ) : (
        <>
          <h4>No Cards Yet! </h4>
          <p>
            <Link to="/add-card"> Click </Link>to add a new card!
          </p>
        </>
      )}
    </div>
  );
}

export default MyCards;
