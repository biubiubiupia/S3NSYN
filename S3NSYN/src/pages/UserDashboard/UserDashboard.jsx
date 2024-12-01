import "./UserDashboard.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HabitList from "../../components/HabitList/HabitList";
import RewardProgress from "../../components/RewardProgress/RewardProgress";
import Header from "../../components/Header/Header";

function UserDashboard() {
  const navigate = useNavigate();

  const defaultRewards = [
    { id: 1, title: "Buy a Birkin", points: 599 },
    { id: 2, title: "Go to TS Concert", points: 400 },
    { id: 3, title: "Eat a Whole Pizza Pie", points: 500 },
  ];

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

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
        <RewardProgress rewardList={defaultRewards}></RewardProgress>
      </section>
    </main>
  );
}

export default UserDashboard;
