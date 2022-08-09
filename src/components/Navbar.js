import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  if (user) { console.log(user.email) }
  return (
    // Logged out navbar:
    <nav className='navbar navbar-logged-out'>
      {isLoggedIn && (
        <>
          <Link to='/plans'>
            <button>My Plans</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
          { user && <span>{user.email}</span>}
        </>
      )}
    </nav>
  );
}

export default Navbar;
