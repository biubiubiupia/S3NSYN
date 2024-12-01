import "./Header.scss";
import { useNavigate } from "react-router-dom";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";

function Header() {

  const navigate = useNavigate();

  return (
    <header className="header-back">
      <img
        className="logo-top"
        src={logoDark}
        alt="S3NSYN logo"
        onClick={() => navigate("/")}
      ></img>
    </header>
  );
};

export default Header;
