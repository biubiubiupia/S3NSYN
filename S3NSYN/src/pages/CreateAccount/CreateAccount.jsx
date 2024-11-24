import "./CreateAccount.scss"
import logoDark from "../../assets/logos/S3NSYN-logo-dark.png/"

function CreateAccount() {

  return (
    <main className="page signup">
      <img className="logo-top homepage__logo" src={logoDark}></img>
      <button className="button signup" onClick={() => {navigate("/signup")}}>SIGN UP</button>
      <button className="button login">LOG IN</button>
    </main>
  );
}

export default CreateAccount;