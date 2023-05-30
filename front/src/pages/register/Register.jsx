import React from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';


const Register = () => {
  const [message, setMessage] = React.useState("");

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
    
    try {
      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token);
        Swal.fire({
          icon: 'question',
          title: 'To Verify your accont click the link',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        console.log(response.data.message)
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="register">
      <div className="registerContainer">
        <h1 className="header">Sign up</h1>
        <div className="links">
            <button
                className="signInButton"
                onClick={() => { navigate("/")}}>
                Sign in
            </button>
            <button
                className="signUpButton"
                onClick={() => navigate("/register")}>
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
          
          {
            message && (
              <div className="message">
                <p>{message}</p>
              </div>
            )
          }

          <button onClick={registerHandler}>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
