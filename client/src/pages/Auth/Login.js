import React, { useState } from "react";
import Layout from "./../../Components/Layout/Layout";
import axios from 'axios';
import {useNavigate, useLocation} from "react-router-dom";
import toast from 'react-hot-toast';
import { useAuth } from "../../context/auth";

import "../../Styles/AuthStyles.css"
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth,setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    // Form Function
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{
                    email, 
                    password, 
                });

            if(res && res.data.success){
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth',JSON.stringify(res.data));

                navigate(location.state || "/");
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
        <Layout title={'Login - E-Cart'}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className="title" >Login Form</h4>
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
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="registerInputPassword"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Login;