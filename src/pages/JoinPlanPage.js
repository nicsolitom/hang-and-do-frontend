import { useState } from "react";

function JoinPlanPage() {
  const [invitation, setInvitation] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log()
  };

  return (
    <div className='join-plan-page p-top-4em'>
      <h3>Join Plan:</h3>
      <form onSubmit={handleSubmit}>
        <label>Invitation link:</label>
        <input
          type='text'
          name='invitation'
          placeholder='Inviation URL'
          value={invitation}
          onChange={(e) => setInvitation(e.target.value)}
          required
        />
        <button type='submit'>Go to Plan</button>
      </form>
    </div>
  );
}

export default JoinPlanPage;
