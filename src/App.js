import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<><Navbar /><HomePage /></>} />
      </Routes>
    </div>
  );
}

export default App;
