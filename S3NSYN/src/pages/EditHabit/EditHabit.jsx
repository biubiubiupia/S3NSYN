import "./EditHabit.scss";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderBack from "../../components/HeaderBack/HeaderBack";
import HabitForm from "../../components/HabitForm/HabitForm";

const BASE_URL = import.meta.env.VITE_API_URL;

function EditHabit() {
  const token = localStorage.getItem("authToken");
  const { habitId } = useParams();
  const location = useLocation();
  const goalId = location.state?.goalId;
  const [habit, setHabit] = useState({});

  const getHabit = async () => {
    try {
      const {data} = await axios.get(`${BASE_URL}/habits/habit/${habitId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setHabit(data);
    } catch (error) {
      console.error("Error fetching habit:", error);
    }
  };

  useEffect(() => {
    getHabit();
  }, []);

  useEffect(() => {
    console.log(habit);
  }, [habit]);

  // const habit = defaultHabits[habitId];

  return (
    <main className="page habit">
      <HeaderBack backto={`/goal/${goalId}`}></HeaderBack>
      <h1 className="habit__header page__header">let's get specific.</h1>

      <HabitForm editingHabit={habit} />

      {/* <form className="habit__form">
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
      </form> */}
    </main>
  );
}

export default EditHabit;
