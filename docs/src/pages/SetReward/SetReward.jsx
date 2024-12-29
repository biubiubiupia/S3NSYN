import "./SetReward.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderBack from "../../components/HeaderBack/HeaderBack";
import Header from "../../components/Header/Header";

let BASE_URL = import.meta.env.VITE_API_URL;

function SetReward() {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const location = useLocation();
  const goalId = location.state?.goalId;
  const goalTitle = location.state?.title;
  const editingReward = location.state?.reward;

  const [selected, setSelected] = useState(null);
  const [goal, setGoal] = useState();

  const defaultRewards = [
    { id: 1, reward: "Take a Trip" },
    { id: 2, reward: "Buy a Kindle" },
    { id: 3, reward: "Eat a Whole Pizza Pie" },
    { id: 4, reward: "Customize Reward" },
  ];

  const handleSelect = (id) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const reqBody = {
      title: e.target.title.value,
      description: e.target.description.value,
      goal_id: goalId,
    };

    try {
      if (editingReward) {
        await axios.put(`${BASE_URL}/rewards/${editingReward.id}`, reqBody, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        navigate(-1);
      } else {
        await axios.post(`${BASE_URL}/rewards`, reqBody, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        navigate("/set-habit", { state: { goalId, goalTitle } });
      }
    } catch (error) {
      console.error("Error setting the reward", error);
    }
  };

  const selectedReward = defaultRewards.find(
    (reward) => reward.id === selected
  );

  const getGoal = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/goals/${editingReward?.goal_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setGoal(data);
    } catch (error) {
      console.error("Error fetching goal:", error);
    }
  };

  useEffect(() => {
    getGoal();
  }, []);

  useEffect(() => {
    console.log(editingReward);
  }, []);

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleString("en-US", options);
  };

  const endDate = convertTimestampToDate(goal?.end_time);
  
  return (
    <main
      className={`page reward ${
        selected || editingReward ? "reward--berry" : ""
      }`}
    >
      {editingReward ? <HeaderBack backto={-1} /> : <Header />}
      <div className="reward__goal">
        <h2 className="reward__header page__header">
          when you accomplish your goal.
        </h2>
        <button
          className="reward__goal-title"
          onClick={() => navigate(`/goal/${editingReward?.goal_id}`)}
        >
          {goalTitle || goal?.title}
        </button>
        <h3 className="reward__goal-endDate">by {endDate}</h3>
      </div>
      <div
        className={`${
          selected || editingReward ? "reward__group--hidden" : "reward__group"
        }`}
      >
        {defaultRewards.map((reward) => (
          <button
            key={reward.id}
            className={`${
              selected === reward.id ? "reward__name--active" : "reward__name"
            }`}
            onClick={() => handleSelect(reward.id)}
          >
            {reward.reward}
          </button>
        ))}
      </div>

      {(selected || editingReward) && (
        <div>
          <form className="reward__form" onSubmit={handleFormSubmit}>
            <div className="reward__group">
              <label className="reward__label" htmlFor="title">
                your reward.
              </label>
              <input
                className="reward__input"
                name="title"
                id="title"
                placeholder={
                  selectedReward?.reward === "Customize Reward"
                    ? selectedReward.reward
                    : undefined
                }
                defaultValue={
                  editingReward
                    ? editingReward.title
                    : selectedReward?.reward !== "Customize Reward"
                    ? selectedReward?.reward
                    : ""
                }
              />
            </div>
            <div className="reward__group">
              <label className="reward__label" htmlFor="description">
                imagine the moment when you achieve your goal and enjoy your
                reward.
              </label>
              <textarea
                className="reward__textarea"
                name="description"
                id="description"
                placeholder="Describe your feelings here."
                defaultValue={editingReward?.description || ""}
              ></textarea>
            </div>
            <button className="button-dark reward__button" type="submit">
              {editingReward ? "Save" : "Submit"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}

export default SetReward;
