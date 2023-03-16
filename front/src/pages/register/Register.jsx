import React from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="register">
      <div className="registerContainer">
        <h1 className="header">Sign up</h1>
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

export default Register;
