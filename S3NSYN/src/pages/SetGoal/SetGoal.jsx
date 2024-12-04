import "./SetGoal.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import HeaderBack from "../../components/HeaderBack/HeaderBack";
import GoalForm from "../../components/GoalForm/GoalForm";

function SetGoal() {
  const location = useLocation();
  const selectedGoal = location.state?.selectedGoal;

  return (
    <main className="page set-goal">
      <HeaderBack></HeaderBack>
      <h1 className="set-goal__header page__header">set your goal.</h1>
      <GoalForm selectedGoal={selectedGoal} />
    </main>
  );
}

export default SetGoal;
