import "./EditGoal.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";

function EditGoal() {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate("/goals");
  };

  return (
    <main className="page edit-goal">
      <img
        className="logo-top edit-goal__logo"
        src={logoDark}
        alt="S3NSYN logo"
      ></img>
      <h1 className="edit-goal__header page__header">edit your goal.</h1>
      <form className="edit-goal__form">
        <div className="edit-goal__group">
          <input
            className="edit-goal__name"
            name="name"
            id="name"
            placeholder=""
          ></input>
        </div>
        <div className="edit-goal__group">
          <label className="label edit-goal__label" htmlFor="why">
            tell us your why.
          </label>
          <textarea
            className="edit-goal__textarea"
            name="why"
            id="why"
            placeholder="I want to achieve this goal because..."
          ></textarea>
        </div>
        <div className="edit-goal__group">
          <label>Goal start date</label>
          <select>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div className="edit-goal__group">
          <label className="label edit-goal__label" htmlFor="timeframe">
            pick an achievable timeframe.
          </label>
          <div className="edit-goal__time">
            <input
              className="edit-goal__num"
              name="num"
              id="num"
              placeholder="1"
            ></input>
            <select
              className="edit-goal__select"
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
      <div className="edit-goal__buttons">
        <button
          className="button button-dark edit-goal__button"
          onClick={handleSave}
        >
          Save Changes
        </button>
        <button
          className="button button-dark edit-goal__button"
          onClick={handleSave}
        >
          Delete
        </button>
      </div>
    </main>
  );
}

export default EditGoal;
