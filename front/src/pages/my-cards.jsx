import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import useCards from "../hooks/useCard/useCards";
import { Link } from "react-router-dom";

function MyCards() {
  const cards = useCards();
  return (
    <div className="text-center ">
      <PageHeader title="Here you can see all cards created!"></PageHeader>
      {cards.length ? (
        <div className="d-flex flex-wrap p-4 justify-content-center">
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
