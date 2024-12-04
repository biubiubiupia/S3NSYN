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

  const defaultRewards = [
    { id: 1, title: "Buy a Birkin", points: 599 },
    { id: 2, title: "Go to TS Concert", points: 400 },
    { id: 3, title: "Eat a Whole Pizza Pie", points: 500 },
  ];

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
        <h1 className="page__title dashboard__title">live your best life.</h1>
        <button
          className="dashboard__view button-mini"
          onClick={() => navigate("/goals")}
        >
          GOALS
        </button>
      </div>
      <HabitList></HabitList>
      <section className="dashboard__reward dashboard__section ">
        <h1 className="page__header dashboard__header">eyes on the reward.</h1>
        <RewardProgress rewards={rewards}></RewardProgress>
      </section>
    </main>
  );
}

export default UserDashboard;
