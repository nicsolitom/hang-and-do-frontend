import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth.context";
import PlanCard from "../components/PlanCard";


function PlansListPage() {
  const [plans, setPlans] = useState(null);

  const { user } = useContext(AuthContext);

  const getAllPlans = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/plans`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const myPlans = response.data.filter((plan) => {
          return plan.createdBy == user?._id || plan.joined.includes(user?._id)
        });
        // console.log(myPlans)
        setPlans(myPlans);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPlans();
  }, [user?._id]);

  return (
    <div className='plans-list-page p-top-4em'>
      <div className='join-create-buttons'>
        <Link to={"/join-plan"}><strong>Join plan</strong></Link>
        <Link to={"/create-plan"}><strong>Create new plan</strong></Link>
      </div>
      <div className='plans-list'>

      {plans ? (
        plans.map((plan) => 
        <PlanCard key={plan._id} {...plan} />)
        ) : (
          <>
          <p>Searching for plans...</p>
        </>
      )}
      {/* <JoinPlanPopup /> */}
      </div>
    </div>
  );
}

export default PlansListPage;
