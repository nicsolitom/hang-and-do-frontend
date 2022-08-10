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
  const [users, setUsers] = useState(null);
  const [whoCreated, setWhoCreated] = useState(null);
  const [whoJoined, setWhoJoined] = useState(null);

  const { planId } = useParams();
  // const { _id, title, description, img_url, location, created_by, joined, posts } = plan.data;

  const getPlan = () => {
    const storedToken = localStorage.getItem("authToken");
    let responseResult;
    let userList;
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/plans/${planId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        responseResult = response.data;
        setPlan(response.data);
        // return displayCreator(response.data.createdBy);
        // return users;
        // displayJoined(response.data);
        return axios
          .get(`${process.env.REACT_APP_API_URL}/api/users`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            console.log("trying to setUsers: ", response.data);
            userList = response.data;
            setUsers(response.data);
            const userToDisplay = response.data.filter((user) => {
              return user._id === responseResult.createdBy;
            });
            setWhoCreated(userToDisplay[0].email);
          });
      })
      .then(() => {
        setWhoJoined(() => {
          return responseResult?.joined?.map((joinedUser) => {
            console.log("response.result", responseResult);
            console.log("users", userList);
            return userList?.filter((user) => {
              return user._id === joinedUser;
            });
          });
        });
      })
      .catch((error) => console.log(error));
  };

  // const displayCreator = (userId) => {
  //   const storedToken = localStorage.getItem("authToken");
  //   console.log("displayUser with id: ", userId);
  //   // axios
  //   //   .get(`${process.env.REACT_APP_API_URL}/api/users`, {
  //   //     headers: { Authorization: `Bearer ${storedToken}` },
  //   //   })
  //   //   .then((response) => {
  //   //     setUsers(response.data);
  //   //     const userToDislay = response.data.filter((user) => {
  //   //       return user._id === userId;
  //   //     });
  //   //     setWhoCreated(userToDislay[0].email);

  //   //   })
  //   // .catch((error) => {
  //   //   console.log(error);
  //   // });
  // };

  // const displayJoined = (plans) => {
  //   // console.log(resultArr);
  // };

  useEffect(() => {
    getPlan();
  }, []);

  return (
    <div className='plan-details-wrapper p-top-4em'>
      <div className='plan-header'>
        {plan ? (
          <>
            <h1>{plan.title}</h1>
            <p className='plan-date'>
              Date: <strong>{plan.dateTime.slice(0, 10)}</strong> - Time:{" "}
              <strong>{plan.dateTime.slice(11, 16)}</strong>
            </p>
            <p className='plan-location'>
              Location: <strong>{plan.location}</strong>
            </p>

            {plan.imgUrl && (
              <img src={plan.imgUrl} className='plan-img' alt='Plan idea' />
            )}

            <p>{plan.description}</p>

            <div className='created-by-wrapper'>
              {whoCreated && (
                <>
                  <p>Plan made by:</p>
                  <p>
                    <strong>{whoCreated}</strong>
                  </p>
                </>
              )}
            </div>

            <div className='joined-plan-wrapper'>
              {plan.joined.length > 0 && (
                <>
                  <p>Joined plan:</p>
                  {whoJoined
                    ? whoJoined.map((user) => {
                        console.log("WHO JOINED: ", whoJoined);
                        console.log("USER: ", user);
                        return (
                          <p>
                            <strong>{user[0].email}</strong>
                          </p>
                        );
                      })
                    : "no one"}
                </>
              )}
            </div>
            
          </>
        ) : (
          <p>Loading plan...</p>
        )}
      </div>
    </div>
  );
}

export default PlanDetailsPage;
