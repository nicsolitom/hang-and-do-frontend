import { useState, useEffect } from "react";
import axios from "axios";

import PlanCard from "../components/PlanCard";

const API_URL = "http://localhost:5005";

function PlansListPage() {
  const [plans, setPlans] = useState([]);

  const getAllPlans = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/plans`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setPlans(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  return (
    <div className='plans-list-page'>
      <button>Create Plan</button>
      <button>Join Plan</button>
      {plans.length === 0 ? (
        <p>Searching for plans...</p>
      ) : (
        plans.map((plan) => <PlanCard key={plan._id} {...plan} />)
      )}
    </div>
  );
}

export default PlansListPage;
