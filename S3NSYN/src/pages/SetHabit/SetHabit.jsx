import "./SetHabit.scss";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderBack from "../../components/HeaderBack/HeaderBack";
import HabitForm from "../../components/HabitForm/HabitForm";

function SetHabit() {
  const location = useLocation();
  const goalId = location.state?.goalId;
  const goalTitle = location.state?.goalTitle;

  const [selected, setSelected] = useState(null);

  const defaultHabits = [
    { id: 1, habit: "Write for 15 mins" },
    { id: 2, habit: "Meditate for 10 mins" },
    { id: 3, habit: "Vacuum the floor" },
    { id: 4, habit: "Customize Habit" },
  ];

  const handleSelect = (id) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  const selectedHabit = defaultHabits.find((habit) => habit.id === selected);

  return (
    <main className="page habit">
      <HeaderBack backto={`/goal/${goalId}`} />
      <h1 className="habit__header page__title">set specific habits.</h1>
      {goalTitle && ( <h1 className="habit__goal">{goalTitle}</h1>)}
      <div className={`${selected ? "habit__group--hidden" : "habit__group"}`}>
        {defaultHabits.map((habit) => (
          <button
            key={habit.id}
            className={`${
              selected === habit.id ? "habit__name--active" : "habit__name"
            }`}
            onClick={() => handleSelect(habit.id)}
          >
            {habit.habit}
          </button>
        ))}
      </div>

      {selected && (
        <HabitForm goalId={goalId} selectedHabit={selectedHabit} className="habit__form"/>
      )}
    </main>
  );
}

export default SetHabit;
