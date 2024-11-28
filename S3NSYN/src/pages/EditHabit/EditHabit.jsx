import "./EditHabit.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";

const BASE_URL = import.meta.env.VITE_API_URL;

function EditHabit() {
  const { habitId } = useParams();

  const defaultHabits = [
    { id: 1, habit: "Write for 15 mins" },
    { id: 2, habit: "Meditate for 10 mins" },
    { id: 4, habit: "Brush hair 50 times" },
  ];

  const habit = defaultHabits[habitId];

  return (
    <main className="page habit">
      <img
        className="logo-top habit__logo"
        src={logoDark}
        alt="S3NSYN logo"
      ></img>
      <h1 className="habit__header page__header">let's get specific.</h1>

      <form className="habit__form">
        <div className="habit__group">
          <label className="habit__label" htmlFor="title">
            Your habit:
          </label>
          <input
            className="habit__input"
            name="title"
            id="title"
            defaultValue={
              habit.habit
            }
          />
        </div>
        <div className="habit__group">
          <label className="habit__label" htmlFor="description">
            how often?
          </label>
          <div className="habit__frequency">
            <select>
              <option value="once">Once</option>
              <option value="twice">Twice</option>
              <option value="thrice">Thrice</option>
            </select>
            <select>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
        <div className="habit__group">
          <label className="habit__label" htmlFor="description">
            when?
          </label>
          <div className="habit__time">
            <input
              className="habit__digit"
              type="number"
              placeholder="3"
              min="1"
              max="12"
            ></input>
            <p className="habit__colon">:</p>
            <input
              className="habit__digit"
              type="number"
              placeholder="33"
              min="00"
              max="59"
            ></input>
            <select className="habit__ampm">
              <option value="am">AM</option>
              <option value="pm">PM</option>
            </select>
          </div>
        </div>
        <div className="habit__buttons">
          <button className="button-mini habit__button" type="submit">
            Save Change
          </button>
          <button className="button-mini habit__button" type="submit">
            Delete
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditHabit;
