import "./HeaderBack.scss";
import { useNavigate } from "react-router-dom";
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png";

function HeaderBack({ backto }) {
  const navigate = useNavigate();
  const backPage = backto;

  return (
    <header className="header">
      <svg
        className="back-arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 122.88 108.06"
        alt="back arrow icon"
        onClick={() => navigate(`${backPage}` || -1)}
      >
        <path d="M63.94,24.28a14.28,14.28,0,0,0-20.36-20L4.1,44.42a14.27,14.27,0,0,0,0,20l38.69,39.35a14.27,14.27,0,0,0,20.35-20L48.06,68.41l60.66-.29a14.27,14.27,0,1,0-.23-28.54l-59.85.28,15.3-15.58Z" />
      </svg>
      <img
        className="logo-top"
        src={logoDark}
        alt="S3NSYN logo"
        onClick={() => navigate("/")}
      ></img>
    </header>
  );
}

export default HeaderBack;
