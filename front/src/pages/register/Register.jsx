import React from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const navigate = useNavigate();
  const usename = React.createRef();
  const fullName = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const registerHandler = async (e) => {
    e.preventDefault();

    const data = {
      username: usename.current.value,
      fullName: fullName.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const response = await axios.post("/api/register", data);

    if (response.data.success) {
      sessionStorage.setItem("token", response.data.token);
      navigate("/home");
    }
  };


  return (
    <div className="register">
      <div className="registerContainer">
        <h1 className="header">Sign up</h1>
        <div className="links">
          <button
            onClick={() => {
              navigate("/");
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
            <input type="text" placeholder="Username" ref={usename}/>
            <input type="text" placeholder="Full Name" ref={fullName}/>
            <input type="email" placeholder="Email" ref={emailRef}/>
            <input type="password" placeholder="Password" ref={passwordRef}/>
          </form>
          <button onClick={registerHandler}>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
