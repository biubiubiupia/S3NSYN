import "./NameGoals.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HeaderBack from "../../components/HeaderBack/HeaderBack";

function NameGoals() {

  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);

  const defaultGoals = [
    {id: 1, title: "Get Fit" },
    {id: 2, title: "Grow Career" },
    {id: 3, title: "Early Bedtime" },
    {id: 4, title: "Customize Goal" },
  ]

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
      <HeaderBack></HeaderBack>
      <h1 className="goal__header page__header">define your first goal.</h1>
      <div className="goal__group">
        {defaultGoals.map((goal) => (
          <button
            key={goal.id}
            className={`${selected === goal.id ? "goal__name--active" : "goal__name" 
            }`}
            onClick={() => handleSelect(goal.id)}
          >
            {goal.title}
          </button>
        ))}
      </div>
      <button className="button-dark goal__button" onClick={handleNext}>Next Step</button>
    </main>
  );
}

export default NameGoals;
