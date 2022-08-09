import { useState } from "react";

function JoinPlanPopup() {
  const [invitation, setInvitation] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='popup join-plan-popup'>
      <h3>Join Plan:</h3>
      <form onSubmit={handleSubmit}>
        <label>Invitation link:</label>
        <input
          type='text'
          name='invitation'
          value={invitation}
          onChange={(e) => setInvitation(e.target.value)}
          required
        />
        <button type='submit'>Go to Plan</button>
      </form>
    </div>
  );
}

export default JoinPlanPopup;
