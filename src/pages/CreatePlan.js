import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

// const REACT_APP_API_URL = "http://localhost:5005";

function CreatePlan(props) {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [location, setLocation] = useState("");

  const { user } = useContext(AuthContext);
  // console.log("user: ", user._id)

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      description,
      img_url: imgUrl,
      date_time: dateTime,
      location,
      created_by: user._id
    };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/plans`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setDateTime("");
        setDescription("");
        setImgUrl("");
        setLocation("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='create-plan-wrapper p-top-4em'>
      <h3>Add Plan</h3>

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
          name='date_time'
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          // required
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
          type='file'
          name='imgUrl'
          accept='image/png, image/jpeg, image/jpg'
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />

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

export default CreatePlan;
