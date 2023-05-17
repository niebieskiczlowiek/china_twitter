import React from "react";
import { useEffect } from "react";
import "./verify.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const Verify = () => {
    let { token } = useParams(); 
    console.log(token);
    const navigate = useNavigate();
    const verifyHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post("/api/verify", { token });
        if (response.data.success) {
            navigate("/login");
        }
    };
    useEffect(() => {
        verifyHandler();
    }, []);

    return (
        <div className="verify">
            <p>Verify</p>
            <button onClick={verifyHandler}>Verify</button>
        </div>
    );


};
export default Verify;