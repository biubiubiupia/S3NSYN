import "./Guide.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

function Guide() {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/first-goal");
    } else {
      navigate("/signup");
    }
  };

  return (
    <main className="page guide">
      <Header/>
      <h1 className="guide__header">how this works.</h1>
      <div className="guide__text">
        <p>
          Welcome to S3NSYN!<br></br> Start by creating a goal and breaking it into
          habits. <br></br>Set how often you’ll do each habit—daily, weekly, or
          monthly—and choose reminder times to stay on track.
        </p>
        <p className="guide__text">
          Mark habits as completed to earn points toward rewards you create,
          like a treat or celebration. Check your dashboard daily to see
          upcoming habits and track progress. <br></br>Need ideas? Explore suggested
          activities to add variety to your routine. S3NSYN makes building
          habits simple and rewarding—start achieving your goals today!
        </p>
      </div>
      <button
        className="button button-dark guide__button"
        onClick={handleClick}
      >
        I'M COMMITED
      </button>
    </main>
  );
}

export default Guide;
