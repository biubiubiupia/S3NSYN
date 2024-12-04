import "./EditGoal.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderBack from "../../components/HeaderBack/HeaderBack";
import GoalForm from "../../components/GoalForm/GoalForm";

const BASE_URL = import.meta.env.VITE_API_URL;

function EditGoal() {
  const token = localStorage.getItem("authToken");
  const { goalId } = useParams();
  const [goal, setGoal] = useState(null);

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

  useEffect(() => {
    getGoal();
  }, []);

  return (
    <main className="page edit-goal">
      <HeaderBack backto={`/goal/${goalId}`} />
      <h1 className="edit-goal__header page__header">edit your goal.</h1>
      {!goal ? <div>Loading data...</div> : <GoalForm editingGoal={goal} />}
    </main>
  );
}

export default EditGoal;
