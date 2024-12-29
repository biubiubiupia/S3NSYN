import "./HabitList.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function HabitList({ getAllRewards }) {
  const token = localStorage.getItem("authToken");
  const [habits, setHabits] = useState([]);
  const [checkHabit, setCheckHabit] = useState(() => {
    const savedState = localStorage.getItem("checkHabit");
    const savedDate = localStorage.getItem("checkHabitDate");

    if (savedDate === new Date().toLocaleDateString()) {
      return savedState ? JSON.parse(savedState) : {};
    } else {
      localStorage.setItem("checkHabitDate", new Date().toLocaleDateString());
      localStorage.setItem("checkHabit", JSON.stringify({}));
      return {};
    }
  });

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

  useEffect(() => {
    localStorage.setItem("checkHabit", JSON.stringify(checkHabit));
  }, [checkHabit]);

  const handleCheck = async (habitId, alertTime) => {
    const alertKey = `${habitId}_${alertTime.hour}:${alertTime.minute}${alertTime.ampm}`;
    const isChecked = !checkHabit[alertKey];

    setCheckHabit((prevState) => ({
      ...prevState,
      [alertKey]: isChecked,
    }));

    const action = isChecked ? "subtract" : "add";

    try {
      await axios.put(
        `${BASE_URL}/rewards/${habitId}/update`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getAllRewards();
    } catch (error) {
      console.error("Error updating reward points:", error);
    }
  };

  const sortedHabits = habits
    .flatMap(({ id, title, alert_times }) =>
      Array.isArray(alert_times)
        ? alert_times.map((alertTime) => ({
            habitId: id,
            title,
            alertTime,
          }))
        : []
    )
    .sort(
      (a, b) =>
        new Date(
          `2024-01-01 ${a.alertTime.hour}:${a.alertTime.minute} ${a.alertTime.ampm}`
        ) -
        new Date(
          `2024-01-01 ${b.alertTime.hour}:${b.alertTime.minute} ${b.alertTime.ampm}`
        )
    );

  return (
    <section className="dashboard__section">
      {!sortedHabits ? (
        <div>loading...</div>
      ) : (
        <ul className="habit-list__list">
          {sortedHabits.map((habit) => {
            const alertTime = habit.alertTime;
            const habitTime = new Date(
              `${new Date().toLocaleDateString()} ${alertTime.hour}:${
                alertTime.minute
              } ${alertTime.ampm}`
            );

            const alertKey = `${habit.habitId}_${alertTime.hour}:${alertTime.minute}${alertTime.ampm}`; // Unique key
            const isChecked = checkHabit[alertKey] || false;
            return (
              <li
                key={alertKey}
                className={`habit-list__habit ${
                  habitTime < Date.now()
                    ? "habit-list__habit--past"
                    : "habit-list__habit--due"
                } ${isChecked ? "habit-list__habit--done" : ""}`}
              >
                <p className="habit-list__habit-text">{habit.title}</p>
                <p className="habit-list__habit-time">
                  {alertTime.hour}:{alertTime.minute} {alertTime.ampm}
                </p>
                <label className="habit-list__checkbox checkbox__label">
                  <input
                    className="checkbox__input"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheck(habit.habitId, habit.alertTime)}
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
