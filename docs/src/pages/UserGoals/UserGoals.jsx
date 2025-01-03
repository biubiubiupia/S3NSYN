import "./UserGoals.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";
import HeaderBack from "../../components/HeaderBack/HeaderBack";
const BASE_URL = import.meta.env.VITE_API_URL;

function UserGoals() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState(null);
  const token = localStorage.getItem("authToken");

  const getGoals = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/goals`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setGoals(data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  useEffect(() => {
    getGoals();
  }, [goals]);

  const handleAdd = () => {
    navigate("/set-goal");
  };

  return (
    <main className="goals page">
      <HeaderBack backto={"/dashboard"} />
      <div className="goals__top">
        <h1 className="goals__header page__header">your goals.</h1>
        <button className="button-mini goals__add" onClick={handleAdd}>
          ADD
        </button>
      </div>
      {!goals ? (
        <div>Loading data...</div>
      ) : (
        <div className="goals__group">
          {goals.map((goal) => (
            <button
              key={goal.id}
              className="goals__name button-light "
              onClick={() => {
                navigate(`/goal/${goal.id}`, { state: { goal } });
              }}
            >
              {goal.title}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}

export default UserGoals;
