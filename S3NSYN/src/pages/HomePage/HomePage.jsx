import "./HomePage.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png"

function HomePage() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);
 
  return (
    <main className="page homepage">
      <img className="logo-main homepage__logo" src={logoDark} alt="S3NSYN logo"></img>
      <h1 className="homepage__tagline">吾日三省吾身.</h1>
      <button className="button-light homepage__button" onClick={() => {navigate("/signup")}}>SIGN UP</button>
      <button className="button-light homepage__button" onClick={() => {navigate("/login")}}>LOG IN</button>
    </main>
  );
}

export default HomePage;
