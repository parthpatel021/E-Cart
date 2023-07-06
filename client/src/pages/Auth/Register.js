import React, { useState } from "react";
import Layout from "./../../Components/Layout/Layout";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';

import "../../Styles/AuthStyles.css"
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    // Form Function
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{ 
                    name, 
                    email, 
                    password, 
                    phone, 
                    address 
                });

            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }else{
                toast.error(res.data.message);  
            }

        } catch (err) {
            console.log(err);
            toast.error('Something went wrong')
        }
    };

    return (
        <Layout title={"Register - E-Cart"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className="title" >Register Form</h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="registerInputName"
                            placeholder="Enter Your Name"
                            required
                        />
                    </div>

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

                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="registerInputPhone"
                            placeholder="Enter Your Phone"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="registerInputAddress"
                            placeholder="Enter Your Address"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
