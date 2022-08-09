import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

import Footer from '../components/Footer';

// const API_URL = 'http://localhost:5005';

function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientMessage, setClientMessage] = useState(undefined);
  const [submitValue, setSubmitValue] = useState(null);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSignup = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    if (submitValue === 'signup') {
      axios
        .post(`${process.env.API_URL}/api/signup`, requestBody)
        .then((response) => {
          console.log('JWT token: ', response.data.authToken);
          console.log(response.data);
          const signupConfirmation = `Registration successful! Click login`;
          setClientMessage(signupConfirmation);
        })
        .catch((error) => {
          const errorDescription = error.response.data.errorMessage;
          setClientMessage(errorDescription);
        });
    }

    if (submitValue === 'login') {
      axios.post(`${process.env.API_URL}/api/login`, requestBody)
      .then((response) => {
          console.log('Logged In! JWT token: ', response.data.authToken);
          storeToken(response.data.authToken);
          authenticateUser();
          navigate('/plans');
      })
      .catch((error) => {
          const errorDescription = error.response.data.errorMessage;
          setClientMessage(errorDescription);
      })

    }
  };

  return (
    <div className='home-wrapper'>
      <div>
        <h1 className='logo'>Meet&#38;Do</h1>
        <p className='logo-punchlines'>not just talking about it</p>
      </div>
      <form onSubmit={handleLoginSignup}>
      {clientMessage && <p className='client-message'>{clientMessage}</p>}
        <label>Email:</label>
        <input
          type='email'
          name='email'
          value={email}
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
        <div className='submit-login-btn-wrapper'>
          <button
            className='button-dark'
            type='submit'
            onClick={() => {
              setSubmitValue('signup');
            }}
          >
            Sign Up
          </button>
          <button
            className='button-dark'
            type='submit'
            onClick={() => {
              setSubmitValue('login');
            }}
          >
            Login
          </button>
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default HomePage;
