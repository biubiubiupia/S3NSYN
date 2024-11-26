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

  const defaultGoals = [
    { id: 1, goal: "Go to Bed Early" },
    { id: 2, goal: "Read 10 Books" },
    { id: 3, goal: "Build a Fitness Routine" },
    { id: 4, goal: "Customize My Goal" },
  ];

  return (
    <main className="page dashboard">
      <img
        className="logo-top dashboard__logo"
        src={logoDark}
        alt="S3NSYN logo"
      ></img>
      <h1 className="dashboard__header page__header">live your best life.</h1>
      <div className="today-habit">
        <div className="habit">
          <h2>Things to do today</h2>
        </div>
      </div>
      <div className="reward">
        <h2>THIS IS YOUR REWARD</h2>
      </div>
    </main>
  );
}

export default UserDashboard;
