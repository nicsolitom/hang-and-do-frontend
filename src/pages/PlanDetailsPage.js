import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// import { AuthContext } from '../context/auth.context';
// import PlanCard from "../components/PlanCard";
// import JoinPlanPopup from "../components/JoinPlanPopup";
// import loadingInfinity from '../images/Infinity-1.4s-211px.gif';

// const REACT_APP_API_URL = "http://localhost:5005";

function PlanDetailsPage() {
  const [plan, setPlan] = useState(null);
  
  const { planId } = useParams();
  // const { _id, title, description, img_url, location, created_by, joined, posts } = plan.data;
  
  const getPlan = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/plans/${planId}`, {
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

      {plan ? (
        <>
        <h1>{plan.title}</h1>
        <p>{plan.description}</p>
       
        </>
        ):(
          <p>Loading plan...</p>
        )}



    </div>
  );
}

export default PlanDetailsPage;
