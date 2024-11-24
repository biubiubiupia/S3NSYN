import './App.scss'
import { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Guide from './pages/Guide/Guide';
import UserLogin from './pages/UserLogin/UserLogin';
import NameGoals from './pages/NameGoals/NameGoals';
import SetGoal from './pages/SetGoal/SetGoal';
import SetHabit from './pages/SetHabit/SetHabit';
import SetReward from './pages/SetReward/SetReward';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import UserGoals from './pages/UserGoals/UserGoals';
import UserHabits from './pages/UserHabits/UserHabits';

const BASE_URL = import.meta.env.VITE_API_URL;

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<CreateAccount/>}/>
          <Route path="/guide" element={<Guide />} />
          <Route path="/first-goal" element={<NameGoals />} />
          <Route path="/set-goal" element={<SetGoal />} />
          <Route path="/set-habit" element={<SetHabit />} />
          <Route path="/set-reward" element={<SetReward />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/goals" element={<UserGoals />} />
          <Route path="/goal/:goalId" element={<UserHabits />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
