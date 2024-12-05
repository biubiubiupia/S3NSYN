import "./HabitList.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function HabitList() {
  const token = localStorage.getItem("authToken");
  const [habits, setHabits] = useState([]);
  const [checkHabit, setCheckHabit] = useState({});

  const getTodayHabits = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/habits/today`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setHabits(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodayHabits();
  }, []);

  const handleCheck = async (habitId) => {
    setCheckHabit((prevState) => ({
      ...prevState,
      [habitId]: !prevState[habitId],
    }));

    // try {
    //   await axios.put(`${BASE_URL}/rewards/`)
    // }catch(error){
    //   console.error("Error updating reward points:", error)
    // }
  };

  const sortedHabits = [...habits].sort((a, b) => {
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
