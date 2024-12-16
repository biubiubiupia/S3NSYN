import "./GoalForm.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BASE_URL = import.meta.env.VITE_API_URL;

function GoalForm({ editingGoal, selectedGoal }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  // For Set Goal/Add Goal
  const goalTitle = selectedGoal?.title;
  const [startDate, setStartDate] = useState(() =>
    editingGoal?.start_time ? new Date(editingGoal.start_time) : new Date()
  );
  const [num, setNum] = useState();
  const [frequency, setFrequency] = useState("day");
  const [title, setTitle] = useState(() => {
    if (editingGoal?.title) {
      return editingGoal.title;
    }
    return selectedGoal?.title == "Customize Goal" ? "" : selectedGoal?.title;
  });
  const [description, setDescription] = useState(
    editingGoal?.description || ""
  );

  // For Edit Goal
  const [endDate, setEndDate] = useState(() =>
    editingGoal?.end_time ? new Date(editingGoal.end_time) : null
  );
  const isTimeHidden = editingGoal || frequency === "custom";

  //For Add New Goal
  const calculateEndTime = (start, frequency, num, customEndDate) => {
    switch (frequency) {
      case "day":
        return new Date(start.getTime() + num * 24 * 60 * 60 * 1000); // Add days
      case "week":
        return new Date(start.getTime() + num * 7 * 24 * 60 * 60 * 1000); // Add weeks
      case "month":
        const endDate = new Date(start);
        endDate.setMonth(endDate.getMonth() + num); // Add months
        return endDate;
      case "custom":
        return new Date(customEndDate); // Ensure this is always a Date
      default:
        throw new Error("Invalid frequency selected.");
    }
  };

  const endTime = calculateEndTime(
    new Date(startDate),
    frequency,
    num,
    endDate
  );

  const reqBody = {
    title,
    description,
    start_time: startDate.getTime(),
    end_time:
      endTime instanceof Date && !isNaN(endTime) ? endTime.getTime() : null,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Please name your goal.");
    }

    if (!num) {
      alert("Please select an end time.");
    }

    if (!endTime || isNaN(endTime.getTime())) {
      alert("Please select a valid end date.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/goals`, reqBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const goalId = response.data.id;

      navigate("/set-reward", { state: { goalId, title } });
    } catch (error) {
      console.error(
        `Error submitting form: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleSave = async () => {
    if (!editingGoal) return;

    const isValuesUnchanged =
      reqBody.title === editingGoal.title &&
      reqBody.description === editingGoal.description &&
      startDate.getTime() === editingGoal.start_time &&
      endDate.getTime() === editingGoal.end_time;

    if (isValuesUnchanged) {
      navigate(`/goal/${editingGoal.id}`);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/goals/${editingGoal.id}`,
        { ...reqBody, end_time: endDate.getTime() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Goal successfully updated!");
        navigate(`/goal/${editingGoal.id}`);
      }
    } catch (error) {
      alert(
        `Error updating goal: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/goals/${editingGoal.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(`Error deleting goal with ID ${editingGoal.id}:`, error);
    }
    navigate("/goals");
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <div className="goal-form__group">
        <label className="goal-form__label" htmlFor="name">
          name your goal.
        </label>
        <input
          className="goal-form__name"
          name="name"
          id="name"
          placeholder={
            goalTitle
              ? goalTitle === "Customize Goal"
                ? goalTitle
                : undefined
              : "enter your goal."
          }
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>

      <div className="goal-form__group">
        <label className="label goal-form__label" htmlFor="why">
          tell us your why.
        </label>
        <textarea
          className="goal-form__textarea"
          name="why"
          id="why"
          placeholder="I want to achieve this goal because..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="goal-form__group">
        <label className="goal-form__label" htmlFor="start">
          pick a start date.
        </label>
        <DatePicker
          className="goal-form__start"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="select a date."
        />
      </div>

      <div className="goal-form__group">
        <label className="label goal-form__label" htmlFor="timeframe">
          choose an end time.
        </label>
        {/* hide element when custom is selected or when editing an existing goal */}
        <div
          className={
            isTimeHidden ? "goal-form__time--hidden" : "goal-form__time"
          }
        >
          <input
            className="goal-form__num"
            name="num"
            id="num"
            min="1"
            max="9999"
            value={num}
            onChange={(e) => setNum(Number(e.target.value) || "")}
          />
          <select
            className="goal-form__select"
            id="timeframe"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="day">Day(s)</option>
            <option value="week">Week(s)</option>
            <option value="month">Month(s)</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        {(frequency === "custom" || editingGoal) && (
          <DatePicker
            className="goal-form__end"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="Select a date"
          />
        )}
      </div>
      {!editingGoal && (
        <button className="button button-dark goal-form__next" type="submit">
          NEXT STEP
        </button>
      )}
      {editingGoal && (
        <div className="goal-form__buttons">
          <button
            className="button button-dark goal-form__save"
            type="button"
            onClick={handleSave}
          >
            SAVE
          </button>
          <button
            className="button button-dark goal-form__delete"
            type="button"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </div>
      )}
    </form>
  );
}

export default GoalForm;
