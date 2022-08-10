import { Link } from "react-router-dom";

function PlanCard({ title, description, dateTime, _id }) {
  return (
    <Link to={`/plans/${_id}`}>
      <div className='PlanCard card'>
        <h3>{title}</h3>
        {dateTime && (
          <p style={{ maxWidth: "400px" }}>
            <strong>
              &#62; {dateTime.slice(0, 10)} | {dateTime.slice(11, 16)}
            </strong>
          </p>
        )}
        <p style={{ maxWidth: "400px" }}>{description} </p>
      </div>
    </Link>
  );
}

export default PlanCard;
