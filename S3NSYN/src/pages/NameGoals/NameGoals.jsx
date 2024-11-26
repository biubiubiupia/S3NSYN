import "./NameGoals.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";

function NameGoals({ defaultGoals }) {

  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  const handleNext = () => {
    const selectedGoal = defaultGoals.find((goal) => goal.id === selected);
    if (selectedGoal) {
      navigate("/set-goal", { state: { selectedGoal } });
    } else {
      alert("Please select a goal before proceeding.");
    }
  };

  return (
    <main className="page goal">
      <img
        className="logo-top goal__logo"
        src={logoDark}
        alt="S3NSYN logo"
      ></img>
      <h1 className="goal__header page__header">define your first goal.</h1>
      <div className="goal__group">
        {defaultGoals.map((goal) => (
          <button
            key={goal.id}
            className={`${selected === goal.id ? "goal__name--active" : "goal__name" 
            }`}
            onClick={() => handleSelect(goal.id)}
          >
            {goal.goal}
          </button>
        ))}
      </div>
      <button className="button-dark goal__button" onClick={handleNext}>Next Step</button>
    </main>
  );
}

export default NameGoals;
