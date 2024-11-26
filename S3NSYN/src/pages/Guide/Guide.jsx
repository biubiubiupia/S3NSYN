import "./Guide.scss";
import { useNavigate } from "react-router-dom";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";

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
      <img
        className="logo-top guide__logo"
        src={logoDark}
        alt="S3NSYN logo"
      ></img>
      <h1 className="guide__header">how this works.</h1>
      <div className="guide__text">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore
          aspernatur dolorum cupiditate fugit itaque, ratione, qui tenetur vitae
          voluptatibus inventore aut nam laboriosam accusantium assumenda atque
          minima iure, consectetur aliquam!
        </p>
        <p className="guide__text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore
          aspernatur dolorum cupiditate fugit itaque, ratione, qui tenetur vitae
          voluptatibus inventore aut nam laboriosam accusantium assumenda atque
          minima iure, consectetur aliquam!
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
