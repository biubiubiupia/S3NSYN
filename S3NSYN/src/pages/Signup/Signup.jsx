import "./Signup.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png"
import SignupForm from "../../components/SignupForm/SignupForm";

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
      <img className="logo-top signup__logo" src={logoDark} alt="S3NSYN logo"></img>
      <h1 className="signup__header">create an account.</h1>
      <SignupForm></SignupForm>
    </main>
  );
}

export default Signup;