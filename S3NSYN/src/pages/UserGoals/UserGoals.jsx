import "./UserGoals.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";

function UserGoals() {

  const navigate = useNavigate();

  const defaultGoals = [
    { id: 1, goal: "Go to Bed Early" },
    { id: 2, goal: "Read 10 Books" },
    { id: 3, goal: "Build a Fitness Routine" },
    { id: 4, goal: "Customize My Goal" },
  ];

  const handleAdd = () => {
    navigate("/set-goal")
  }

  return (
    <main className="goals page">
      <img
        className="logo-top goals__logo"
        src={logoDark}
        alt="S3NSYN logo"
      ></img>
      <div className="goals__top">
        <h1 className="goals__header page__header">all your goals.</h1>
        <button className="button-mini goals__add" onClick={handleAdd}>ADD</button>
      </div>
      <div className="goals__list">
        <div className="goals__group">
          {defaultGoals.map((goal) => (
            <button key={goal.id} className="button-dark goals__name" onClick={()=>{navigate("/edit-goal")}}>
              {goal.goal}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default UserGoals;
