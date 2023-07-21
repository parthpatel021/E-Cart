import React,{ useState,useEffect } from 'react';
import AdminMenu from './../../Components/Layout/AdminMenu';
import Layout from './../../Components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import { Select } from 'antd';

const { Option } = Select;

const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel"]);
    const [changeStatus, setChangeStatus] = useState("");

    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const {data} =  await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(auth?.token) getOrders();
    },[auth?.token])

    const handleStatusChange = async (orderId,value) => {
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,{status: value});

            getOrders();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Layout title={'Dashboard - All Orders'}>
        <div className='container-fluid m-3 p-3'>
            <div className='row dashboard'>
                <div className='col-md-3'>
                    <AdminMenu />
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
                                                <td>
                                                    <Select 
                                                        bordered={false} 
                                                        onChange={(value) => handleStatusChange(o._id,value)}
                                                        defaultValue={o?.status}
                                                    >
                                                        {status.map((s,i) => (
                                                            <Option key={i} value={s}>{s}</Option>
                                                        ))}
                                                    </Select>
                                                </td>
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

export default AdminOrders