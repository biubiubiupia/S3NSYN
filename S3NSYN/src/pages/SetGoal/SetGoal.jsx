import "./SetGoal.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

function SetGoal() {
  const navigate = useNavigate();

  const location = useLocation();
  const { selectedGoal } = location.state;
  const goal = selectedGoal.goal;

  // const [startDate, setStartDate] = useState(new Date());

  const handleNext = async () => {
    // const formData = {
    //   title: e.target.name.value,
    //   description: e.target.why.value,
    //   password: e.target.confirm.value,
    // };

    // await axios.post(`${BASE_URL}/set-goal`, formData);
    navigate("/set-reward");
  };

  return (
    <main className="page set-goal">
      <img
        className="logo-top set-goal__logo"
        src={logoDark}
        alt="S3NSYN logo"
      ></img>
      <h1 className="set-goal__header page__header">set your goal.</h1>
      <form className="set-goal__form">
        <div className="set-goal__group">
          <input
            className="set-goal__name"
            name="name"
            id="name"
            placeholder={goal}
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
          {/* {selectedOption === "custom" && (
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="set-goal__datepicker"
        />
      )} */}
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
      </form>
      <button
        className="button button-dark set-goal__button"
        onClick={handleNext}
      >
        Next Step
      </button>
    </main>
  );
}

export default SetGoal;
