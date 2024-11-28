import "./EditGoal.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";

const BASE_URL = import.meta.env.VITE_API_URL;

function EditGoal() {
  const navigate = useNavigate();
  const { goalId } = useParams();
  const token = localStorage.getItem("authToken");
  const [goal, setGoal] = useState(null);

  const getGoal = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/goals/${goalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setGoal(data);
    } catch (error) {
      console.error("Error fetching goal:", error);
    }
  };

  useEffect(() => {
    getGoal();
  }, []);
  
  const handleSave = () => {
    navigate("/goals");
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/goals/${goalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(`Error deleting goal with ID ${goalId}:`, error);
    }
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
      {!goal ? (
        <div>Loading data...</div>
      ) : (
        <form className="edit-goal__form" onSubmit={handleSave}>
          <div className="edit-goal__group">
            <input
              className="edit-goal__name"
              name="name"
              id="name"
              defaultValue={goal.title}
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
              defaultValue={goal.description? goal.description : undefined }
              placeholder={goal.description? undefined : "I want to achieve this goal because..."}
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
          <div className="edit-goal__buttons">
            <button
              className="button button-dark edit-goal__save"
              type="submit"
            >
              Save Changes
            </button>
            <button
              className="button button-mini edit-goal__delete"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      )}
    </main>
  );
}

export default EditGoal;
