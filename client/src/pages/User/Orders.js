import React,{ useState,useEffect } from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const {data} =  await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(auth?.token) getOrders();
    },[auth?.token])
  return (
    <Layout title={"Orders - E-Cart"}>
        <div className='container-fluid p-3 m-3 dashboard'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    <h1>All Orders</h1>
                    {
                        orders?.map((o,i) => {
                            return (
                                <div className='border shadow'>
                                    <table className='table'>
                                        <thead>
                                            <tr>    
                                                <th scope='col'>#</th>
                                                <th scope='col'>status</th>
                                                <th scope='col'>Buyer</th>
                                                <th scope='col'>date</th>
                                                <th scope='col'>Payment</th>
                                                <th scope='col'>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i+1}</td>
                                                <td>{o?.status}</td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createdAt).fromNow()}</td>
                                                <td>{o?.payment.success ? "Success" : "Falied"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='container'>
                                        {o?.products?.map((p,i) => (
                                            <div className='row mb-2 p-3 card flex-row'>
                                                <div className='col-md-4'>
                                                    <img 
                                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} 
                                                        className="card-img-top" 
                                                        alt={p.name}
                                                    />
                                                </div>
                                                <div className='col-md-8 mt-2'>
                                                    <h6>{p.name}</h6>
                                                    <p>{p.description.substring(0,60)}...</p>
                                                    <h6>Price: ₹{p.price}</h6>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Orders