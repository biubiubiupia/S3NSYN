import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./RewardProgress.scss";

function RewardProgress({ rewards }) {
  const navigate = useNavigate();

  const isExpired = (reward) => {
    return reward.end_time < new Date().getTime();
  };

  const isCompleted = (reward) => {
    return reward.points <= 0;
  };

  return (
    <ul className="reward__list">
      {rewards?.map((reward, index) => (
        <li
          key={reward.id || index}
          className={`reward__box ${
            isExpired(reward) ? "reward__box--expired" : ""
          } ${isCompleted(reward) ? "reward__box--completed" : ""}`}
          onClick={() => navigate("/set-reward", { state: { reward } })}
        >
          <p className="reward__title">{reward?.title}</p>
          <CircularProgressbar
            className="reward__progress"
            value={(1000 - reward?.points) / 10}
            text={`${(1000 - reward?.points) / 10}%`}
            styles={{
              root: { width: "4rem", height: "4rem" }, // Container size
              path: { strokeWidth: 8 }, // Reducing the stroke width reduces the circle radius
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default RewardProgress;
