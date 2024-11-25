import "./UserDashboard.scss"
import { useNavigate } from "react-router-dom";

function UserDashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <h1>UserDashboard</h1>
    </>
  );
}

export default UserDashboard;