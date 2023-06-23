import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";

function Card({card}) {
  const [theme] = useTheme();
  return (
    <div
      className={`card ms-2 me-2 mt-3 mb-3 shadow p-3 bg-body-tertiary rounded ${theme}`}
    >
      <div className="text-center mb-1">
        <img
          src={card.bizImage}
          className="card-img-top mt-2"
          alt={card.bizName}
          style={{ width: "250px", height: "200px" }}
        />
      </div>
      <div className="justify-content-start">
        <ul className="list pt-2">
          <div className="d-flex lh-sm">
            <p className="fs-6 me-2 text-secondary">
              <i className="bi bi-bank2"></i>
            </p>
            <Link to={`/my-cards/${card._id}`} className="fs-6 nav-link">
              {card.bizName}
            </Link>
          </div>
          <div className="d-flex lh-sm">
            <p className="fs-6 me-2 text-secondary">
              <i className="bi bi-blockquote-left"></i>
            </p>
            <p className="fs-6">{card.bizDescription}</p>
          </div>
          <div className="d-flex lh-sm">
            <p className="fs-6 me-2 text-secondary">
              <i className="bi bi-geo-alt-fill"></i>
            </p>
            <a
              href={`https://www.google.com/maps/place/${card.bizAddress}`}
              className="fs-6 nav-link"
            >
              {card.bizAddress}
            </a>
          </div>
          <div className="d-flex lh-sm">
              <i className="bi bi-telephone-inbound-fill fs-6 me-2 text-secondary"></i>
            <a href={`tel:${card.bizPhone}`} className="fs-6 nav-link">
              {card.bizPhone}
            </a>
          </div>
        </ul>
        <div className="d-flex justify-content-between me-3 ms-3">
          <Link to={`/my-cards/edit-card/${card._id}`}>
            <button className="btn btn-primary border-0 fs-5 hover-zoomin">
              <i className="bi bi-pencil"></i>
            </button>
          </Link>
          <Link to={`/my-cards/${card._id}`}>
            <button className="btn btn-success border-0 fs-5 hover-zoomin">
              <i className="bi bi-eye"></i>
            </button>
          </Link>
          <Link to={`/my-cards/delete-card/${card._id}`}>
            <button className="btn btn-danger border-0 fs-5 hover-zoomin">
              <i className="bi bi-trash3"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
