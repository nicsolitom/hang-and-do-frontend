import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  // if (user) {
  //   console.log(user.email);
  // }
  return (
    <nav className='navbar navbar-logged-in'>
      {isLoggedIn && (
        <>
          <div>
          {user && <span><strong>{user.email} </strong></span>}
          |
            <Link to='/plans'><strong> My Plans</strong></Link>

          </div>
          <div>
            <Link to='/' onClick={logOutUser}><strong>Logout</strong></Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
