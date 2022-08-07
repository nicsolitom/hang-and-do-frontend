import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const API_URL = "http://localhost:5005";

function HomePage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

  return (
    <div className='home-wrapper'>
      <div>
        <h1 className='logo'>Meet&#38;Do</h1>
        <p className='logo-punchlines'>not just talking about it</p>
      </div>
      <form>
      <label>Email:</label>
        <input type='email' name='email' value={email} 
        onChange={handleEmail}
        required
        />

        <label>Password:</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={handlePassword}
          required
        />
        <div className="submit-login-btn-wrapper">
            
        <button className="button-dark" type='submit'>Sign Up</button>
        <button className="button-dark" type='submit'>Log In</button>
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default HomePage;
