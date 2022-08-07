import { Link } from 'react-router-dom';
import { useContext } from "react";

function Navbar() {
    return (

        // Logged out navbar:
        <nav className='navbar navbar-logged-out'>
            <Link to='/about'>About</Link>
        </nav>
    )
}

export default Navbar;