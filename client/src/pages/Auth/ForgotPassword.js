import React, { useState } from "react";
import Layout from "./../../Components/Layout/Layout";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    // Form Function
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{
                    email, 
                    newPassword, 
                    answer,
                });

            if(res && res.data.success){
                navigate("/login");
                toast.success(res.data && res.data.message);
            }else{
                toast.error(res.data.message);  
            }

        } catch (err) {
            console.log(err);
            toast.error('Something went wrong')
        }
    };

  return (
    <Layout title="Forgot-Password  E-Cart">
        <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className="title" >Reset Password</h4>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="registerInputEmail"
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="registerInputAnswer"
                            placeholder="Whats is your favorite sports"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="registerInputNewPassword"
                            placeholder="Enter New Password"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                        Reset
                    </button>
                </form>
            </div>
    </Layout>
  )
}

export default ForgotPassword;