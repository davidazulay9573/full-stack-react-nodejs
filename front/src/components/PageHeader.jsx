import { Link } from "react-router-dom";
function PageHeader({ title, description }) {
  return (
    <div>
      <div className="row">
        <div className="col-12 mt-4">
        <Link to='/' className="nav-link">Card__<i className="bi bi-card-checklist"></i>__Actions</Link> 
        </div>
       
        <div className="col-12 mt-4">
          <h3>{title}</h3>
        </div>
      </div>
      {description ? (
        <div className="row">
          <div className="col-12 mt-4">
            <p>{description}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PageHeader;
