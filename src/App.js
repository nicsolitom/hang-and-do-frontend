import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PlansListPage from './pages/PlansListPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<><Navbar /><HomePage /></>} />
        <Route path="/plans" element={<><Navbar /><PlansListPage /></>} />
      </Routes>
    </div>
  );
}

export default App;
