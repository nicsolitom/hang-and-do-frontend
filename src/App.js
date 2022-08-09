import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PlansListPage from './pages/PlansListPage';
import JoinPlanPage from './pages/JoinPlanPage';
import CreatePlanPage from './pages/CreatePlanPage';
import PlanDetailsPage from './pages/PlanDetailsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<><Navbar /><HomePage /></>} />
        <Route path="/plans" element={<><Navbar /><PlansListPage /></>} />
        <Route path="/plans/:planId" element={<><Navbar /><PlanDetailsPage /></>} />
        <Route path="/join-plan" element={<><Navbar /><JoinPlanPage /></>} />
        <Route path="/create-plan" element={<><Navbar /><CreatePlanPage /></>} />
      </Routes>
    </div>
  );
}

export default App;
