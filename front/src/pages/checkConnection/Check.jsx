import React from "react";
import axios from "axios";

const check = () => {
    
    const checkConnection = async () => {
        const payload = {
            status: true,
            message: "Connection is working"
        }
        
        const response = await axios.post('/api/check', payload);
    };
        

    return ( 
        <button
            onClick={checkConnection}
        >
            Test connection
        </button>
    )
};

export default check;