import "./UserHabits.scss";
import { useParams, useNavigate } from "react-router-dom";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";

function UserHabits() {
  const navigate = useNavigate();
  const { goalId } = useParams();

  // const getGoal = async () => {
  //   try {
  //     const { data } = await axios.get(`${BASE_URL}/goals/${goalId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     setGoal(data);
  //   } catch (error) {
  //     console.error("Error fetching goal:", error);
  //   }
  // };

  // useEffect(() => {
  //   getGoal();
  // }, []);

  const defaultHabits = [
    { id: 1, habit: "Write for 15 mins" },
    { id: 2, habit: "Meditate for 10 mins" },
    { id: 4, habit: "Brush hair 50 times" },
  ];

  return (
    <main className="page habits">
      <img
        className="logo-top habits__logo"
        src={logoDark}
        alt="S3NSYN logo"
      ></img>
      <div className="habits__top">
        <h1 className="habits__header page__header">build good habits.</h1>
        <button
          className="button-mini habits__edit"
          onClick={() => navigate(`/goal/${goalId}/edit`)}
        >
          Edit
        </button>
      </div>
      <div className="habits__group"> 
      {defaultHabits.map((habit) => (
          <button
            key={habit.id}
            className="habits__name button-dark"
            onClick={() => navigate(`/habit/${habit.id}/edit`)}
          >
            {habit.habit}
          </button>
        ))}
      </div>
      <div>
        <h2>reward progress.</h2>
      </div>
    </main>
  );
}

export default UserHabits;
