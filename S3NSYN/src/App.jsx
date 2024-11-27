import './App.scss'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect} from 'react';
import axios from "axios";
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

const BASE_URL = import.meta.env.VITE_API_URL;

function App() {

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/guide" element={<Guide />} />
          <Route path="/first-goal" element={<NameGoals/>} />
          <Route path="/set-goal" element={<SetGoal />} />
          <Route path="/set-habit" element={<SetHabit />} />
          <Route path="/set-reward" element={<SetReward />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/goals" element={<UserGoals  />} />
          <Route path="/goal/:goalId/edit" element={<EditGoal />} />
          <Route path="/goal/:goalId" element={<UserHabits />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
