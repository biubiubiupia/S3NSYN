import "./SetGoal.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import HeaderBack from "../../components/HeaderBack/HeaderBack";
import "react-datepicker/dist/react-datepicker.css";
import GoalForm from "../../components/GoalForm/GoalForm";

function SetGoal() {

  // const navigate = useNavigate();
  // const token = localStorage.getItem("authToken");
  // const location = useLocation();
  // const selectedGoal = location.state?.selectedGoal;
  // const goal = selectedGoal?.title;

  // const [customDate, setCustomDate] = useState(new Date()); // State for DatePicker value

  // const handleSelectChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const reqBody = {
  //     title: e.target.name.value,
  //     description: e.target.why.value,
  //     start_time: customDate,
  //     end_time: customDate - num * e.target.why.value;
  //   };

  //   try {
  //     const response = await axios.post(`${BASE_URL}/goals`, reqBody, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const goalId = response.data.id;

  //     navigate("/set-reward", { state: { goalId } });
  //   } catch (error) {
  //     alert("Error sending form", error);
  //   }
  // };

  return (
    <main className="page set-goal">
      <HeaderBack></HeaderBack>
      <h1 className="set-goal__header page__header">set your goal.</h1>
      <GoalForm/>
    </main>
  );
}

export default SetGoal;
