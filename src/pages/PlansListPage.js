import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { AuthContext } from '../context/auth.context';
import PlanCard from "../components/PlanCard";

// import loadingInfinity from '../images/Infinity-1.4s-211px.gif';

// const API_URL = "http://localhost:5005";

function PlansListPage() {
  const [plans, setPlans] = useState(null);

  const { user } = useContext(AuthContext);

  const getAllPlans = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.API_URL}/api/plans`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        const myPlans = response.data.filter((plan) => {
          return plan.created_by === user?._id;
        })
        setPlans(myPlans)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPlans();
  }, [user?._id]);

  return (
    <div className='plans-list-page p-top-4em'>
      <div className='join-create-buttons'>
        <Link to={"/join-plan"}>Join plan</Link>
        <Link to={"/create-plan"}>Create new plan</Link>
      </div>

      {plans ? (
        plans.map((plan) => <PlanCard key={plan._id} {...plan} />)
      ) : (
        <>
        <p>Searching for plans...</p>
        {/* <img src='{loadingInfinity}' alt='loading symbol' /> */}
        </>
      )}

      {/* <JoinPlanPopup /> */}
    </div>
  );
}

export default PlansListPage;
