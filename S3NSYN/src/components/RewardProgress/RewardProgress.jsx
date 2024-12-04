import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./RewardProgress.scss";

function RewardProgress({reward}) {

  return (
    <>
      <div className="reward__box">
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
      </div>
    </>
  );
}

export default RewardProgress;
