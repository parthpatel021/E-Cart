import React, {useState,useEffect} from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
    // context
    const [auth,setAuth] = useAuth();


    // state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");


    // get user data
    useEffect(() => {
        const { name, email, phone, address } = auth?.user;

        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, [auth?.user])
    

    // Form Function
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,{ 
                    name, 
                    email, 
                    password, 
                    phone, 
                    address,
                });
                
            if(data?.error){
                toast.error(data?.error?.message);
            } else {
                setAuth({...auth, user: data?.updatedUser});

                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;

                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success('Profile Updated Successfully');
            }
            

        } catch (err) {
            console.log(err);
            toast.error('Something went wrong')
        }
    };

  return (
    <Layout title={"Profile - E-Cart"}>
        <div className='container-fluid p-3 m-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <h4 className="title" >User Profile</h4>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                    id="registerInputName"
                                    placeholder="Enter Your Name"
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
                                    disabled
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
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile