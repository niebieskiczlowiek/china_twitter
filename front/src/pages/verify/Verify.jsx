import React from "react";
import { useEffect } from "react";
import "./verify.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const Verify = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const verifyHandler = async () => {
        try {
            const response = await axios.post('/api/verify', { token: token });
            if (response.data.success) {
                console.log(response.data);
                console.log("verified");
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="verify">
            <p>Verify</p>
            <button onClick={verifyHandler}>Verify</button>
        </div>
    );


};
export default Verify;