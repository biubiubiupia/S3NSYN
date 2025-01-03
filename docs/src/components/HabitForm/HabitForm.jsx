import "./HabitForm.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TimeInput from "../TimeInput/TimeInput";
import DateDropdown from "../DateDropdown/DateDropdown";

const BASE_URL = import.meta.env.VITE_API_URL;

function HabitForm({ goalId, selectedHabit, editingHabit }) {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [count, setCount] = useState(editingHabit?.count || 0);
  const [frequency, setFrequency] = useState(editingHabit?.frequency || "");
  const [selectedDays, setSelectedDays] = useState(
    editingHabit?.selectedDays || []
  );
  const [selectedDates, setSelectedDates] = useState(
    editingHabit?.selectedDates || Array(editingHabit?.count || 0).fill(null)
  );
  const [times, setTimes] = useState(
    editingHabit?.alert_times || Array(count).fill("")
  );
  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    if (editingHabit) {
      setCount(editingHabit.count || 0);
      setFrequency(editingHabit.frequency || "");
      setSelectedDays(editingHabit.weekly_days || []);
      setSelectedDates(
        editingHabit.selectedDates || Array(editingHabit.count || 0).fill(null)
      );
      setTimes(
        editingHabit.alert_times || Array(editingHabit.count || 0).fill("")
      );
    }
  }, [editingHabit]);

  const handleCount = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      const newCount = value === "" ? 0 : parseInt(value, 10);
      setCount(newCount);

      // setTimes({})
      setSelectedDays([]);
    }
  };

  const handleFrequency = (e) => setFrequency(e.target.value);

  const handleDaySelect = (day) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else if (prev.length < count) {
        return [...prev, day];
      }
      return prev;
    });
  };

  const handleDateSelect = (date, index) => {
    const updatedDates = [...selectedDates];
    updatedDates[index] = date;
    setSelectedDates(updatedDates);
  };

  const handleTimeInput = (time, index) => {
    const formattedTime = {
      hour: time.hour,
      minute: time.minute.padStart(2, "0"),
      ampm: time.ampm,
    };

    const updatedTimes = [...times];
    updatedTimes[index] = formattedTime;
    setTimes(updatedTimes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = {
      title: e.target.title.value,
      frequency,
      count,
      selectedDays,
      selectedDates,
      times,
      goal_id: goalId || editingHabit?.goal_id,
    };

    if (frequency === "weekly" && selectedDays.length < count) {
      return;
    }

    if (times.hour === "" || times.minute === "") {
      alert("Please fill int the time");
      return;
    }

    try {
      if (editingHabit) {
        await axios.put(
          `${BASE_URL}/habits/habit/${editingHabit?.id}`,
          reqBody,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        navigate(`/goal/${editingHabit.goal_id}`);
      } else {
        await axios.post(`${BASE_URL}/habits`, reqBody, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        navigate(`/goal/${goalId}`);
      }
    } catch (error) {
      console.error("Error submitting habit:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/habits/${editingHabit.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(`Error deleting goal with ID ${editingHabit.id}:`, error);
    }
    navigate(`/goal/${editingHabit.goalId}`);
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <div className="habit-form__group">
        <label className="habit-form__label" htmlFor="title">
          Your habit.
        </label>
        <input
          className="habit-form__input"
          name="title"
          id="title"
          placeholder={
            selectedHabit?.habit === "Customize Habit"
              ? selectedHabit?.habit
              : undefined
          }
          defaultValue={
            editingHabit?.title ||
            (selectedHabit?.habit !== "Customize Habit"
              ? selectedHabit?.habit
              : undefined)
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
          <p>time(s)</p>
          <select
            className="habit-form__select"
            name="frequency"
            value={frequency}
            onChange={handleFrequency}
          >
            <option value="" disabled>
              Frequency
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
            <TimeInput
              key={index}
              className="habit-form__time"
              index={index}
              handleTimeInput={handleTimeInput}
              defaultTime={editingHabit?.alert_times?.[index]}
            />
          ))}
        </div>
      )}

      {frequency === "weekly" && count > 0 && (
        <div className="habit-form__group">
          <label className="habit-form__label">
            {selectedDays.length < count ? `Please select ${count} days` : ""}
          </label>
          <div className="habit-form__weekdays">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <button
                key={day}
                type="button"
                className={`habit-form__day${
                  selectedDays.includes(day) ? "--selected" : ""
                }`}
                onClick={() => handleDaySelect(day)}
              >
                {day}
              </button>
            ))}
          </div>
          <label className="habit-form__label">when?</label>
          <TimeInput
            className="habit-form__time"
            index={0}
            handleTimeInput={handleTimeInput}
            defaultTime={editingHabit?.alert_times?.[0]}
          />
        </div>
      )}

      {frequency === "monthly" && count > 0 && (
        <div>
          <div className="habit-form__group habit-form__date">
            <p>ON</p>
            {Array.from({ length: Math.min(count, 7) }).map((_, index) => (
              <DateDropdown
                key={index}
                name="date"
                className="habit-form__dropdown"
                selectedDates={selectedDates}
                currentIndex={index}
                onChange={(date) => handleDateSelect(date, index)}
              />
            ))}
          </div>
          <div className="habit-form__group">
            <label className="habit-form__label">when?</label>
            <TimeInput
              className={"habit-form__time"}
              index={0}
              handleTimeInput={handleTimeInput}
              defaultTime={editingHabit?.alert_times?.[0]}
            />
          </div>
        </div>
      )}
      <div className="habit-form__buttons">
        <button className="button-dark habit-form__button" type="submit">
          Save
        </button>
        {editingHabit && (
          <button
            className="button-dark habit-form__button"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

export default HabitForm;
