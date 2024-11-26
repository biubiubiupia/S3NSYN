import "./Login.scss"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png"
import LoginForm from "../../components/LoginForm/LoginForm";

function Login() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);
 
  return (
    <main className="page login">
      <img className="logo-top login__logo" src={logoDark} alt="S3NSYN logo"></img>
      <h1 className="login__header">log in here.</h1>
      <LoginForm/>
    </main>
  );
}

export default Login;