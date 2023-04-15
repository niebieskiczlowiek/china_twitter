import React from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();

        const data = {
            
            email: emailRef.current.value,
            password: passwordRef.current.value

        }

        const response = await axios.post('/api/login', data)

        const sessionData = {
            token: response.data.token,
            user: response.data.currentUser
        }

        if (response.data.success) {
            sessionStorage.setItem("token", sessionData.token)
            sessionStorage.setItem("user", sessionData.user)
            navigate('/home');
        }
    };

    return (
        <div className='login'>
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
                <form className="form">
                    <input ref={emailRef} type='text' placeholder='Email' />
                    <input ref={passwordRef} type='password' placeholder='Password' />
                </form>
                <button onClick={loginHandler}>Zaloguj</button>
            </div>
        </div>
    )
};

export default Login;