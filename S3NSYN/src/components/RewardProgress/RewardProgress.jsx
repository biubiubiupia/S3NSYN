import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./RewardProgress.scss";

function RewardProgress({rewardList}) {
  const defaultRewards = [
    { id: 1, title: "Buy a Birkin", points: 599 },
    { id: 2, title: "Go to TS Concert", points: 400 },
    { id: 3, title: "Eat a Whole Pizza Pie", points: 500 },
  ];

  return (
    <>
      {!defaultRewards ? (
        <div>loading</div>
      ) : (
        <ul className="reward__list">
          {rewardList.map((reward) => (
            <li key={reward.id} className="reward__box">
              <p className="reward__title">{reward.title}</p>
              <CircularProgressbar
                className="reward__progress"
                value={reward.points/10}
                text={`${reward.points/10}%`}
                styles={{
                  root: { width: "4rem", height: "4rem" }, // Container size
                  path: { strokeWidth: 8 }, // Reducing the stroke width reduces the circle radius
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default RewardProgress;
