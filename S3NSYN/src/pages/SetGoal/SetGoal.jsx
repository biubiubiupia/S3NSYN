import "./SetGoal.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import HeaderBack from "../../components/HeaderBack/HeaderBack";
import GoalForm from "../../components/GoalForm/GoalForm";

function SetGoal() {

  return (
    <main className="page set-goal">
      <HeaderBack backto={"/goals"}></HeaderBack>
      <h1 className="set-goal__header page__header">set your goal.</h1>
      <GoalForm/>
    </main>
  );
}

export default SetGoal;
