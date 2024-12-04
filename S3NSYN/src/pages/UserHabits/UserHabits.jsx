import "./UserHabits.scss";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RewardProgress from "../../components/RewardProgress/RewardProgress";
import HeaderBack from "../../components/HeaderBack/HeaderBack";
const BASE_URL = import.meta.env.VITE_API_URL;


function UserHabits() {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { goalId } = useParams();
  const [goal, setGoal] = useState(null);
  const [habits, setHabits] = useState([])

  const getGoal = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/goals/${goalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setGoal(data);
    } catch (error) {
      console.error("Error fetching goal:", error);
    }
  };

  const getHabits = async() => {
    try {
      const {data} = await axios.get(`${BASE_URL}/habits/${goalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setHabits(data);
    }catch(error){
      console.error("Error fetching habits:", error)
    }
  }

  useEffect(() => {
    getGoal();
  }, []);

  useEffect(() => {
    getHabits();
  }, []);
  
  console.log(habits);

  const defaultHabits = [
    { id: 1, habit: "Write for 15 mins" },
    { id: 2, habit: "Meditate for 10 mins" },
    { id: 4, habit: "Brush hair 50 times" },
  ];

  const rewardList = [
    { id: 1, title: "Buy a Birkin", points: 999 },
  ];

  return (
    <main className="page habits">
     <HeaderBack backto={"/goals"}/>
     <div className="habits__top">
        <h1 className="habits__header page__header">{goal?.title}</h1>
        <button
          className="button-mini habits__edit"
          onClick={() => navigate(`/goal/${goalId}/edit`)}
        >
          EDIT
        </button>
      </div>
        <h2 className="habits__header page__header">build good habits.</h2>
      <div className="habits__group"> 
      {habits.map((habit) => (
          <button
            key={habit.id}
            className="habits__name button-dark"
            onClick={() => navigate(`/habit/${habit.id}/edit`)}
          >
            {habit.title}
          </button>
        ))}
        <button className="habits__add button-dark" onClick={() => navigate("/set-habit", {state: {goalId}})}>ADD</button>
      </div>
      <section className="habits__section">
        <h1 className="page__header habits__header">reward progress.</h1>
        <RewardProgress rewardList={rewardList}></RewardProgress>
      </section>
    </main>
  );
}

export default UserHabits;
