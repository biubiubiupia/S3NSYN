import './App.scss'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import Signup from './pages/Signup/Signup';
import Guide from './pages/Guide/Guide';
import Login from './pages/Login/Login';
import NameGoals from './pages/NameGoals/NameGoals';
import SetGoal from './pages/SetGoal/SetGoal';
import SetHabit from './pages/SetHabit/SetHabit';
import SetReward from './pages/SetReward/SetReward';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import UserGoals from './pages/UserGoals/UserGoals';
import UserHabits from './pages/UserHabits/UserHabits';
import EditGoal from './pages/EditGoal/EditGoal';

function App() {

  const defaultGoals = [
    { id: 1, goal: "Go to Bed Early" },
    { id: 2, goal: "Read 10 Books" },
    { id: 3, goal: "Build a Fitness Routine" },
    { id: 4, goal: "Customize My Goal" },
  ];

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/guide" element={<Guide />} />
          <Route path="/first-goal" element={<NameGoals defaultGoals={defaultGoals} />} />
          <Route path="/set-goal" element={<SetGoal defaultGoals={defaultGoals} />} />
          <Route path="/set-habit" element={<SetHabit />} />
          <Route path="/set-reward" element={<SetReward defaultRewards={defaultGoals} />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/goals" element={<UserGoals />} />
          <Route path="/edit-goal" element={<EditGoal/>} />
          <Route path="/goal/:goalId" element={<UserHabits />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
