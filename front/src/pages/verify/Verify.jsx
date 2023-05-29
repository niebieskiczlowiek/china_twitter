import React from "react";
import { useEffect } from "react";
import "./verify.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';


const Verify = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const verifyHandler = async () => {
        try {
            Swal.fire({
                icon: 'success',
                title: 'You verify your accont!',
                showConfirmButton: false,
                timer: 1500
            })
            const response = await axios.post('/api/verify', { token: token });
            if (response.data.success) {
                console.log(response.data);
                console.log("verified");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="verify">
            <button type="button"  onClick={verifyHandler} class="btn btn--red">
                <span class="btn__txt">Verify your email</span>
                <i class="btn__bg" aria-hidden="true"></i>
                <i class="btn__bg" aria-hidden="true"></i>
                <i class="btn__bg" aria-hidden="true"></i>
                <i class="btn__bg" aria-hidden="true"></i>
            </button>
        </div>
    );


};
export default Verify;