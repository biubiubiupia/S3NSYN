import "./SetHabit.scss";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";

function SetHabit() {
  const location = useLocation();
  const goalId = location.state?.goalId;

  const [selected, setSelected] = useState(null);

  const defaultHabits = [
    { id: 1, habit: "Write for 15 mins" },
    { id: 2, habit: "Meditate for 10 mins" },
    { id: 3, habit: "Vacuum the floor" },
    { id: 4, habit: "Brush hair 50 times" },
  ];

  const handleSelect = (id) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  const selectedHabit = defaultHabits.find((habit) => habit.id === selected);

  console.log(selectedHabit);

  return (
    <main className="page habit">
      <img
        className="logo-top habit__logo"
        src={logoDark}
        alt="S3NSYN logo"
      ></img>
      <h1 className="habit__header page__header">let's get specific.</h1>

      <div className={`${selected ? "habit__group--hidden" : "habit__group"}`}>
        {defaultHabits.map((habit) => (
          <button
            key={habit.id}
            className={`${
              selected === habit.id ? "habit__name--active" : "habit__name"
            }`}
            onClick={() => handleSelect(habit.id)}
          >
            {habit.habit}
          </button>
        ))}
      </div>

      {selected && (
        <form className="habit__form">
          <div className="habit__group">
            <label className="habit__label" htmlFor="title">
              Your habit:
            </label>
            <input
              className="habit__input"
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
              Save & Add
            </button>
            <button className="button-mini habit__button" type="submit">
              Save & Back to Goals
            </button>
          </div>
        </form>
      )}
    </main>
  );
}

export default SetHabit;
