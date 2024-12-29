import "./EditHabit.scss";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderBack from "../../components/HeaderBack/HeaderBack";
import HabitForm from "../../components/HabitForm/HabitForm";

const BASE_URL = import.meta.env.VITE_API_URL;

function EditHabit() {
  const token = localStorage.getItem("authToken");
  const { habitId } = useParams();
  const location = useLocation();
  const goalId = location.state?.goalId;
  const [habit, setHabit] = useState({});

  const getHabit = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/habits/habit/${habitId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setHabit(data);
    } catch (error) {
      console.error("Error fetching habit:", error);
    }
  };

  useEffect(() => {
    getHabit();
  }, []);

  return (
    <main className="page habit">
      <HeaderBack backto={`/goal/${goalId}`}></HeaderBack>
      <h1 className="habit__header page__header">let's get specific.</h1>
      <HabitForm editingHabit={habit} />
    </main>
  );
}

export default EditHabit;
