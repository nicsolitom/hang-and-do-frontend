import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

import { useNavigate, useParams } from "react-router-dom";

function EditPlanPage() {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [location, setLocation] = useState("");

  const { user } = useContext(AuthContext);
  const { planId } = useParams();

  const navigate = useNavigate();

  const getPlan = () => {
    const storedToken = localStorage.getItem("authToken");
    let responseResult;
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/plans/${planId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        responseResult = response.data;
        setTitle(responseResult.title);
        setDateTime(responseResult.dateTime.slice(0, 16))
        setDescription(responseResult.description);
        setImgUrl(responseResult.imgUrl);
        setLocation(responseResult.location);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      dateTime,
      description,
      imgUrl,
      location,
      createdBy: user._id
    };

    const storedToken = localStorage.getItem("authToken");

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/plans/${planId}/edit`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setDateTime("");
        setDescription("");
        setImgUrl("");
        setLocation("");
      })
      .then(() => {
        navigate("/plans");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPlan();
  }, []);

  return (
    <div className='edit-plan-wrapper p-top-4em'>
      <h3>Edit Plan</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:*</label>
        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Date:*</label>
        <input
          type='datetime-local'
          name='dateTime'
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
        />

        <label>Description:*</label>
        <textarea
          type='text'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Image:</label>
        <input
          type='text'
          name='imgUrl'
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />

        {/* <label>Image:</label>
        <input
          type='file'
          name='imgUrl'
          accept='image/png, image/jpeg, image/jpg'
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        /> */}

        <label>Location:</label>
        <input
          type='text'
          name='location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <button type='submit' className='button-dark'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditPlanPage;
