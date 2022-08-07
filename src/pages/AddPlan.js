import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddPlan(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/plans`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setDescription("");
        props.refreshProjects();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='AddPlan'>
      <h3>Add Plan</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description:</label>
        <textarea
          type='text'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default AddPlan;
