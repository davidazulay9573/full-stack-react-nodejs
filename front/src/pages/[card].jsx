import { useParams } from "react-router-dom";
import useCard from "../hooks/useCard/useCard";
import useTheme from "../hooks/useTheme";
function Card() {
  const { id } = useParams();
  const card = useCard(id);
  const [ theme] = useTheme();

  return (
    <div className=" text-center d-flex flex-wrap justify-content-center">
      <img src={card.bizImage} alt="business view" className={`w-50 p-5 `} />
      <div
        className={`text-center p-5 m-5 border border-${
          theme === "dark" ? "light" : "dark"
        } rounded bg-${theme} `}
      >
        <h1 className="mt-4">{card.bizName}</h1>
        <p className="mt-4 mb-5">{card.bizDescription}</p>
        <a
          href={`tel:${card.bizPhone}`}
          className={`btn btn-${theme === "dark" ? "light" : "dark"} `}
        >
          <i className="bi bi-telephone-fill"></i> {card.bizPhone}
        </a>
        <p className="mt-3 fs-5 fw-bold">
          <a
            href={`https://www.google.com/maps/place/${card.bizAddress}`}
            target={`_blank`}
            className={`btn btn-${theme === "dark" ? "light" : "dark"} `}
          >
            <i className="bi bi-geo-alt-fill"></i>
            {card.bizAddress}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Card;
