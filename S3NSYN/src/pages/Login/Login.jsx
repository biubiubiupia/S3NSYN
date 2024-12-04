import "./Login.scss"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import HeaderBack from "../../components/HeaderBack/HeaderBack";

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
      <HeaderBack backto={"/"} />
      <h1 className="login__header">log in here.</h1>
      <LoginForm/>
    </main>
  );
}

export default Login;