import "./SetReward.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";
let BASE_URL = import.meta.env.VITE_API_URL;
let token = localStorage.getItem("authToken");

function SetReward() {
  const location = useLocation();
  const goalId = location.state?.goalId;
  const goalTitle = location.state?.title;
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const defaultRewards = [
    { id: 1, reward: "Buy a Birkin" },
    { id: 2, reward: "Go to TS Concert" },
    { id: 3, reward: "Eat a Whole Pizza Pie" },
    { id: 4, reward: "Customize Reward" },
  ];

  const handleSelect = (id) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  const selectedReward = defaultRewards.find(
    (reward) => reward.id === selected
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedReward) {
      const reqBody = {
        title: e.target.title.value,
        description: e.target.title.value,
        goal_id: goalId,
      };

      console.log(reqBody)

      try {
        await axios.post(`${BASE_URL}/rewards`, reqBody, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        navigate("/set-habit", { state: { goalId, goalTitle } });
      } catch (error) {
        console.error("Error setting the reward", error);
      }
    } else {
      alert("Please define a reward before proceeding.");
    }
  };

  return (
    <main className="page reward">
      <img
        className="logo-top reward__logo"
        src={logoDark}
        alt="S3NSYN logo"
      ></img>
      <h1 className="reward__header page__header">
        when you accomplish your goal.
      </h1>
      <h1 className="reward__goal">{goalTitle}</h1>

      <div
        className={`${selected ? "reward__group--hidden" : "reward__group"}`}
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

      {selected && (
        <div>
          <form className="reward__form" onSubmit={handleSubmit}>
            <div className="reward__group">
              <label className="reward__label" htmlFor="title">
                your reward.
              </label>
              <input
                className="reward__input"
                name="title"
                id="title"
                placeholder={
                  selectedReward.reward === "Customize Reward"
                    ? selectedReward.reward
                    : undefined
                }
                defaultValue={
                  selectedReward.reward !== "Customize Reward"
                    ? selectedReward.reward
                    : undefined
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
              ></textarea>
            </div>
            <button className="button-dark reward__button" type="submit">
              Next Step
            </button>
          </form>
        </div>
      )}
    </main>
  );
}

export default SetReward;
