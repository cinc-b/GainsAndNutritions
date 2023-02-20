import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();


  return (
    <div>
      <form onSubmit={login} className="Login">
        <div className="LoginTitleInput">
          <div className="LoginTitle">E-Mail</div>
          <input
            id="EmailInput"
            className="LoginInput"
            type="text"
            placeholder="E-Mail"
            name="email"
          />
        </div>
        <div className="LoginTitleInput">
          <div className="LoginTitle">Password</div>
          <input
            id="PasswordInput"
            className="LoginInput"
            type="password"
            placeholder="Password"
            name="password"
          />
        </div>
        <div className="LoginText">Forgot password?</div>
        <div className="LoginText">
          Don't have an account?{" "}
          <Link className="Link" to={"/Register"}>
            Sign Up
          </Link>
        </div>
        <button type="submit" className="LoginButton">Login</button>
      </form>
    </div>
  );
};

export default Login;
