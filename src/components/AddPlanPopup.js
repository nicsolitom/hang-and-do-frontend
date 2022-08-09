import { useState } from "react";

function AddPlan() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className='add-plan'>
      <h3>Add Plan:</h3>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type='date'
          name='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type='submit'>Create Plan</button>
      </form>
    </div>
  );
}

export default AddPlan;
