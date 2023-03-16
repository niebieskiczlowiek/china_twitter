import React from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="loginContainer">
        <h1 className="header">Sign in</h1>
        <div className="links">
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign in
          </button>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign up
          </button>
        </div>
        <div className="form">
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </form>
          <button type="submit">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
