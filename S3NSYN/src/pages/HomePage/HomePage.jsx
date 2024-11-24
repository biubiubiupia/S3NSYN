import "./HomePage.scss";
import { useNavigate } from "react-router-dom";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png/"

function HomePage() {

  const navigate = useNavigate();
    
  return (
    <main className="page homepage">
      <img className="logo-main homepage__logo" src={logoDark}></img>
      <h1 className="homepage__tagline">A GOAL SETTING APP</h1>
      <button className="button homepage__button" onClick={() => {navigate("/signup")}}>SIGN UP</button>
      <button className="button homepage__button" onClick={() => {navigate("/login")}}>LOG IN</button>
    </main>
  );
}

export default HomePage;
