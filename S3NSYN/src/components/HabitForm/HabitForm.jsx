import "./HabitForm.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import TimeInput from "../TimeInput/TimeInput";
import DateDropdown from "../DateDropdown/DateDropdown";
const BASE_URL = import.meta.env.VITE_API_URL;

function HabitForm({ goalId, selectedHabit }) {
  const token = localStorage.getItem("authToken");

  const [count, setCount] = useState(0);
  const [frequency, setFrequency] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);

  const handleCount = (e) => {
    const value = Number(e.target.value);
    setCount(value > 7 ? 7 : Math.max(value, 1)); 
  };
  const handleFrequency = (e) => setFrequency(e.target.value);

  const handleDaySelect = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <form className="habit-form">
      <div className="habit-form__group">
        <label className="habit-form__label" htmlFor="title">
          Your habit.
        </label>
        <input
          className="habit-form__input"
          name="title"
          id="title"
          placeholder={
            selectedHabit.habit === "Customize Habit"
              ? selectedHabit.habit
              : undefined
          }
          defaultValue={
            selectedHabit.habit !== "Customize Habit"
              ? selectedHabit.habit
              : undefined
          }
        />
      </div>

      <div className="habit-form__group">
        <label className="habit-form__label" htmlFor="description">
          how often?
        </label>
        <div className="habit-form__frequency">
          <input
            className="habit-form__num"
            name="num"
            id="num"
            min="1"
            max="7"
            value={Math.min(count, 7)}
            onChange={handleCount}
          />
          <p>TIMES</p>
          <select
            className="habit-form__select"
            value={frequency}
            onChange={handleFrequency}
          >
            <option value="" disabled>
              Select Frequency
            </option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {frequency === "daily" && count > 0 && (
        <div className="habit-form__group">
          <label className="habit-form__label">when?</label>
          {Array.from({ length: Math.min(count, 7) }).map((_, index) => (
            <TimeInput key={index} className="habit-form__time" />
          ))}
        </div>
      )}

      {frequency === "weekly" && count > 0 && (
        <div className="habit-form__group">
          <div className="habit-form__weekdays">
            {Array.from({ length: 7 }).map((_, index) => {
              const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                index
              ];
              return (
                <input
                  key={index}
                  className="habit-form__checkbox"
                  type="checkbox"
                  disabled={
                    selectedDays.length >= count && !selectedDays.includes(day)
                  }
                  onChange={() => handleDaySelect(day)}
                />
              );
            })}
          </div>
          <label className="habit-form__label">when?</label>
          <TimeInput className="habit-form__time" />
        </div>
      )}

      {frequency === "monthly" && count > 0 && (
        <div>
          <div className="habit-form__group habit-form__date">
            <p>ON</p>
            {Array.from({ length: Math.min(count, 7) }).map((_, index) => (
              <DateDropdown
                key={index}
                name={"habit-form__dropdown"}
                className="habit-form__dropdown"
              />
            ))}
          </div>
          <div className="habit-form__group">
            <label className="habit-form__label">when?</label>
            <TimeInput className="habit-form__time" />
          </div>
        </div>
      )}

      <div className="habit-form__buttons">
        <button className="button-dark habit-form__button" type="submit">
          Save
        </button>
        <button className="button-dark habit-form__button" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}

export default HabitForm;
