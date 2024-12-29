import "./Signup.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../../components/SignupForm/SignupForm";
import HeaderBack from "../../components/HeaderBack/HeaderBack";

function Signup() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);
 
  return (
    <main className="page signup">
      <HeaderBack backto={"/"} />
      <h1 className="signup__header">create an account.</h1>
      <SignupForm></SignupForm>
    </main>
  );
}

export default Signup;