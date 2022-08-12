import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import PostsWall from "../components/PostsWall";

function PlanDetailsPage() {
  const [plan, setPlan] = useState(null);
  const [users, setUsers] = useState(null);
  const [whoCreated, setWhoCreated] = useState(null);
  const [whoJoined, setWhoJoined] = useState(null);
  const [postText, setPostText] = useState(null);

  const { user, isLoggedIn } = useContext(AuthContext);
  const { planId } = useParams();

  const navigate = useNavigate();

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
            // console.log("trying to setUsers: ", response.data);
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
            // console.log("response.result", responseResult);
            // console.log("users", userList);
            return userList?.filter((user) => {
              return user._id === joinedUser;
            });
          });
        });
      })
      .catch((error) => console.log(error));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      postText,
      planId,
      createdBy: user._id,
    };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/posts`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setPostText("");
        // window.location.reload();
      })
      .catch((error) => console.log(error));
  };


  const joinPlan = () => {
    const storedToken = localStorage.getItem("authToken");

    const requestBody = {
      userId: user._id,
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/plans/${planId}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const deletePlan = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/plans/${planId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/plans");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPlan();
  },[]);

  if (isLoggedIn) {

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
                      return (
                        <p key={user[0]._id}>
                            <strong>{user[0].email}</strong>
                          </p>
                        );
                      })
                    : <p>"no one"</p>}
                </>
              )}
            </div>

            {(whoCreated && whoCreated === user?.email) ||
            whoJoined?.includes(user?._id) ? (
              <div className='post-form-wrapper'>
                <form onSubmit={handlePostSubmit}>
                  <label>Add post:</label>
                  <input
                    type='text'
                    name='postText'
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    />
                  <button type='submit' className='button-dark'>
                    Submit post
                  </button>
                </form>
                
              </div>
            ) : (
              <button className='button-dark' onClick={joinPlan}>
                Join
              </button>
            )}
            <PostsWall planId={planId} />

            {whoCreated === user.email && (
              <>
                <Link to={`/plans/${planId}/edit`} >
                  <button className="button-dark">Edit Plan</button>
                </Link>
                <button className='button-red' onClick={deletePlan}>
                  Delete Plan
                </button>
              </>
            )}
          </>
        ) : (
          <p>Loading plan...</p>
        )}
      </div>
    </div>
  );
} else {
  navigate('/');
}
}

export default PlanDetailsPage;
