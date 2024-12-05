import "./SetHabit.scss";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderBack from "../../components/HeaderBack/HeaderBack";
import Header from "../../components/Header/Header";
import HabitForm from "../../components/HabitForm/HabitForm";

function SetHabit() {
  const location = useLocation();
  const { goalId, goalTitle } = location.state || {};

  const [selected, setSelected] = useState(null);

  const defaultHabits = [
    { id: 1, habit: "Write for 15 mins" },
    { id: 2, habit: "Meditate for 10 mins" },
    { id: 3, habit: "Vacuum the floor" },
    { id: 4, habit: "Customize Habit" },
  ];

  const handleSelect = (id) => setSelected((prev) => (prev === id ? null : id));

  const selectedHabit = defaultHabits.find((habit) => habit.id === selected);

  const renderHabitButtons = () =>
    defaultHabits.map((habit) => (
      <button
        key={habit.id}
        className={`habit__name ${selected === habit.id ? "habit__name--active" : ""}`}
        onClick={() => handleSelect(habit.id)}
      >
        {habit.habit}
      </button>
    ));
    useEffect(()=>{
      console.log(selectedHabit)
    },[selected])

  return (
    <main className={`page habit ${selected ? "" : "habit--peach"}`}>
      <Header />
      <h1 className="habit__header page__title">set specific habits.</h1>
      {goalTitle && <h1 className="habit__goal">{goalTitle}</h1>}

      <div className={`habit__group ${selected ? "habit__group--hidden" : ""}`}>
        {renderHabitButtons()}
      </div>

      {selected && (
        <HabitForm
          goalId={goalId}
          selectedHabit={selectedHabit}
          className="habit__form"
        />
      )}
    </main>
  );
}

export default SetHabit;
