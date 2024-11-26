import "./SetReward.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";

function SetReward() {
  const defaultRewards = [
    { id: 1, reward: "Buy a Birkin" },
    { id: 2, reward: "Go to TS Concert" },
    { id: 3, reward: "Eat a Whole Pizza Pie" },
    { id: 4, reward: "Customize My Reward" },
  ];

  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  const handleNext = () => {
    const selectedReward = defaultRewards.find(
      (reward) => reward.id === selected
    );
    if (selectedReward) {
      navigate("/set-habit");
    } else {
      alert("Please define a reward before proceeding.");
    }
  };

  const selectedReward = defaultRewards.find(
    (reward) => reward.id === selected
  );

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
          <form className="reward__form">
            <div className="reward__group">
              <label>Your reward:</label>
              {selectedReward ? (
                <input placeholder={selectedReward.reward} />
              ) : (
                <input placeholder="Enter your reward" />
              )}
            </div>
            <div className="reward__group">
              <label className="reward__label">
                Imagine the moment when you achieve your goal and enjoy your
                reward:
              </label>
            <textarea
              className="reward__textarea"
              placeholder="Describe your feelings here..."
            ></textarea>
            </div>
          </form>
        </div>
      )}
      <button className="button-dark reward__button" onClick={handleNext}>
        Next Step
      </button>
    </main>
  );
}

export default SetReward;
