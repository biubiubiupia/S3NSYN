import "./UserDashboard.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";

function UserDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const defaultHabits = [
    { id: 1, habit: "Write for 15 mins", time: "8:00" },
    { id: 2, habit: "Meditate for 10 mins", time: "14:00" },
    { id: 3, habit: "Brush hair 50 times", time: "22:00" },
  ];

  return (
    <main className="page dashboard">
      <img
        className="logo-top dashboard__logo"
        src={logoDark}
        alt="S3NSYN logo"
      ></img>
      <h1 className="dashboard__header page__header">live your best life.</h1>
      <div className="dashboard__list">
        <div className="dashboard__habit dashboard__habit--past">
          <p className="dashboard__habit-text">You gotta do it</p>
          <label className="dashboard__checkbox checkbox__label">
            <input className="checkbox__input" type="checkbox"></input>
            <span class="checkbox__span"></span>
          </label>
        </div>
        <div className="dashboard__habit dashboard__habit--due">
          <p className="dashboard__habit-text">You gotta do it</p>
          <label className="dashboard__checkbox checkbox__label">
            <input className="checkbox__input" type="checkbox"></input>
            <span class="checkbox__span"></span>
          </label>
        </div>
        <div className="dashboard__habit dashboard__habit--done">
          <p className="dashboard__habit-text">You gotta do it</p>
          <label className="dashboard__checkbox checkbox__label">
            <input className="checkbox__input" type="checkbox"></input>
            <span class="checkbox__span"></span>
          </label>
        </div>
      </div>
      <div className="dashboard__reward">
        <h2 className="page__header">THIS IS YOUR REWARD</h2>
      </div>
    </main>
  );
}

export default UserDashboard;
