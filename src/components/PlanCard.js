import { Link } from "react-router-dom";
 
function PlanCard ( { title, description, _id } ) {
    
  return (
    <div className="PlanCard card">
      <Link to={`/plans/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{description} </p>
    </div>
  );
}
 
export default PlanCard;