import React from 'react'
import Layout from './../Components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth(); 
    const navigate = useNavigate();

    // total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => ( total = total + item.price))

            return total.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            });

        } catch (error) {
            console.log(error);   
        }
    }

    // remove cart item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);

            myCart.splice(index, 1);

            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart))
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Layout title={`Cart - E-Cart`}>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='text-center bg-light p-2 mb-1'>
                        {`Hello ${auth?.token ? auth?.user?.name: "User"}`}    
                    </h1>
                    <h4 className='text-center'>
                        {cart?.length > 0 ? 
                            `You have ${cart?.length} item${cart.length > 1 ? "s" : ""} in your cart 
                            ${auth?.token ? "" : "please login to checkout"}`
                            : "Your Cart is empty"
                        }
                    </h4>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-8'>
                    {cart.map(p => (
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
                                <button 
                                    className='btn btn-danger'
                                    onClick={() => removeCartItem(p._id)}    
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='col-md-4'>
                    <h2>Cart Summary</h2>
                    <hr />
                    <p>Total | Checkout | Payment</p>
                    <h4>Total : {totalPrice()}</h4>
                    {auth?.user?.address ? (
                        <>
                            <div className='mb-3'>
                                <h4>Current Address</h4>
                                <h5>{auth?.user?.address}</h5>
                                <button 
                                    className='btn btn-outline-warning'
                                    onClick={() => navigate('/dashboard/user/profile')}    
                                >
                                    Update Address
                                </button>
                            </div>
                        </>
                    ): (
                        <>
                            <div className='mb-3'>
                                {
                                    auth?.token ? (
                                        <button 
                                            className='btn btn-outline-warning' 
                                            onClick={() => navigate('/dashboard/user/profile')} 
                                        >
                                            Update Address
                                        </button>
                                    ) : (
                                        <button 
                                            className='btn btn-outline-warning' 
                                            onClick={() => navigate('/login', {
                                                state:'/cart',
                                            })} 
                                        >
                                            Please Login To checkout
                                        </button>
                                    )
                                }
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage