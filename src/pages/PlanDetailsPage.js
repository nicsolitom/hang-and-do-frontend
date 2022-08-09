import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// import { AuthContext } from '../context/auth.context';
// import PlanCard from "../components/PlanCard";
// import JoinPlanPopup from "../components/JoinPlanPopup";
// import loadingInfinity from '../images/Infinity-1.4s-211px.gif';

const API_URL = "http://localhost:5005";

function PlanDetailsPage() {
  const [plan, setPlan] = useState(null);
  
  const { planId } = useParams();
  // const { _id, title, description, img_url, location, created_by, joined, posts } = plan.data;
  
  const getPlan = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/plans/${planId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setPlan(response.data);
        // console.log("plan: ", plan)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPlan();
  }, []);

  return (
    <div className='plan-details-page p-top-4em'>
      {/* <h1>{plan.title}</h1> */}
      {/* {img_url && <img src={img_url} alt={title} />} */}
      {/* <p>{plan.data.description}</p> */}


    </div>
  );
}

export default PlanDetailsPage;
