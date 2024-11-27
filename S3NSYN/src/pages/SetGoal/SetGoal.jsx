import "./SetGoal.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// const [startDate, setStartDate] = useState(new Date());

const BASE_URL = import.meta.env.VITE_API_URL;

function SetGoal() {
  const navigate = useNavigate();

  const location = useLocation();
  const selectedGoal = location.state?.selectedGoal;
  const goal = selectedGoal?.title;

  const token = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = {
      title: e.target.name.value,
      description: e.target.why.value,
      start_time: Date.now(),
      end_time: Date.now(),
    };

    console.log(reqBody)

    try {
      const response = await axios.post(`${BASE_URL}/goals`, reqBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const goalId = response.data.id;

      navigate("/set-reward", { state: { goalId } });
    } catch (error) {
      alert("Error sending form", error);
    }
  };

  return (
    <main className="page set-goal">
      <img
        className="logo-top set-goal__logo"
        src={logoDark}
        alt="S3NSYN logo"
      ></img>
      <h1 className="set-goal__header page__header">set your goal.</h1>

      <form className="set-goal__form" onSubmit={handleSubmit}>
        <div className="set-goal__group">
          <input
            className="set-goal__name"
            name="name"
            id="name"
            placeholder={goal? (goal === "Customize Goal" ? goal : undefined) : ("Enter Your Goal")}
            defaultValue={goal !== "Customize Goal" ? goal : undefined}
          ></input>
        </div>
        <div className="set-goal__group">
          <label className="label set-goal__label" htmlFor="why">
            tell us your why.
          </label>
          <textarea
            className="set-goal__textarea"
            name="why"
            id="why"
            placeholder="I want to achieve this goal because..."
          ></textarea>
        </div>
        <div className="set-goal__group">
          <label>Goal start date</label>
          <select>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div className="set-goal__group">
          <label className="label set-goal__label" htmlFor="timeframe">
            pick an achievable timeframe.
          </label>
          <div className="set-goal__time">
            <input
              className="set-goal__num"
              name="num"
              id="num"
              placeholder="1"
            ></input>
            <select
              className="set-goal__select"
              id="timeframe"
              name="timeframe"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>
        <button className="button button-dark set-goal__button" type="submit">
          Next Step
        </button>
      </form>
    </main>
  );
}

export default SetGoal;
