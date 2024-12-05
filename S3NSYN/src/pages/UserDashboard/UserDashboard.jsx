import "./UserDashboard.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import HabitList from "../../components/HabitList/HabitList";
import RewardProgress from "../../components/RewardProgress/RewardProgress";
import Header from "../../components/Header/Header";
const BASE_URL = import.meta.env.VITE_API_URL;

function UserDashboard() {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [rewards, setRewards] = useState([]);

  const getAllRewards = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/rewards`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setRewards(data);
    } catch (error) {
      console.error("Error fetching goal:", error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    getAllRewards();
  }, []);

  // useEffect(() => {
  //   console.log(rewards);
  // }, [rewards]);

  return (
    <main className="page dashboard">
      <Header />
      <div className="dashboard__top">
        <h2 className="dashboard__title">live your best life.</h2>
        <button
          className="dashboard__view button button-mini"
          onClick={() => navigate("/goals")}
        >
          GOALS
        </button>
      </div>
      <HabitList></HabitList>
      <div className="dashboard__guide">
        <div className="dashboard__block">
          <span className="dashboard__color dashboard__color--past"></span>
          <p className="dashboard__signal">past due</p>
        </div>
        <div className="dashboard__block">
          <span className="dashboard__color dashboard__color--due"></span>
          <p className="dashboard__signal">upcoming</p>
        </div>
        <div className="dashboard__block">
          <span className="dashboard__color dashboard__color--checked"></span>
          <p className="dashboard__signal">completed</p>
        </div>
      </div>
      <section className="dashboard__reward dashboard__section ">
        <h2 className="page__header dashboard__header">eyes on the reward.</h2>
        <RewardProgress rewards={rewards}></RewardProgress>
      </section>
      <button className="button button-mini" onClick={handleLogOut}>LOG OUT</button>
    </main>
  );
}

export default UserDashboard;
