import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./RewardProgress.scss";

function RewardProgress({ rewards }) {
  const navigate = useNavigate();

  return (
    <ul className="reward__list">
      {rewards?.map((reward, index) => (
        <li key={reward.id || index} className="reward__box" onClick={()=>navigate("/set-reward", {state: {reward}})}>
          <p className="reward__title">{reward?.title}</p>
          <CircularProgressbar
            className="reward__progress"
            value={reward?.points / 10}
            text={`${reward?.points / 10}%`}
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
