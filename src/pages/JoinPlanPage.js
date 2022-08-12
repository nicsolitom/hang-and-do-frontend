import { useState, useContext } from "react";
import { AuthContext } from '../context/auth.context';
import { NavLink, useNavigate } from 'react-router-dom';


function JoinPlanPage() {
  const [invitation, setInvitation] = useState("");

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

   
    
  };
  
  
  if (isLoggedIn) {
    return (
      
      <div className='join-plan-page p-top-4em'>
        <form onSubmit={handleSubmit}>
        <h3>Join Plan</h3>
          <label>Invitation link:</label>
          <input
            type='text'
            name='invitation'
            placeholder='Inviation URL'
            value={invitation}
            onChange={(e) => setInvitation(e.target.value)}
            required
            />
          <a href={invitation}>
            <p className="button-dark">Go to Plan</p>
          </a>
        </form>
      </div>
    );
  } else {
    navigate('/');
  }



}

export default JoinPlanPage;
