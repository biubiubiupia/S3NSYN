import "./HabitList.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function HabitList() {
  const [checkHabit, setCheckHabit] = useState({});

  const defaultHabits = [
    { id: 1, title: "Write for 15 mins", time: "8:00 AM" },
    { id: 2, title: "Meditate for 10 mins", time: "2:00 PM" },
    { id: 3, title: "Brush hair 50 times", time: "9:00 PM" },
  ];

  const handleCheck = (habitId) => {
    setCheckHabit((prevState) => ({
      ...prevState,
      [habitId]: !prevState[habitId],
    }));
  };

  const sortedHabits = [...defaultHabits].sort((a, b) => {
    const isCheckedA = checkHabit[a.id] || false;
    const isCheckedB = checkHabit[b.id] || false;

    if (isCheckedA === isCheckedB) {
      const habitTimeA = new Date(
        `${new Date().toLocaleDateString()} ${a.time}`
      );
      const habitTimeB = new Date(
        `${new Date().toLocaleDateString()} ${b.time}`
      );
      return habitTimeA - habitTimeB;
    }

    return isCheckedA ? 1 : -1;
  });

  return (
    <section className="dashboard__section">
      {!sortedHabits ? (
        <div>loading...</div>
      ) : (
        <ul className="habit-list__list">
          {sortedHabits.map((habit) => {
            const habitTime = new Date(
              `${new Date().toLocaleDateString()} ${habit.time}`
            );
            const isChecked = checkHabit[habit.id] || false; 
            return (
              <li
                key={habit.id}
                className={`habit-list__habit ${
                  habitTime < Date.now()
                    ? "habit-list__habit--past"
                    : "habit-list__habit--due"
                } ${isChecked ? "habit-list__habit--done" : ""}`}
              >
                <p className="habit-list__habit-text">{habit.title}</p>
                <label className="habit-list__checkbox checkbox__label">
                  <input
                    className="checkbox__input"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheck(habit.id)}
                  ></input>
                  <span className="checkbox__span"></span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default HabitList;
