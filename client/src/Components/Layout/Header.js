import React from 'react'
import {NavLink, Link} from "react-router-dom";
import {FaShoppingCart} from "react-icons/fa";
import { useAuth } from '../../context/auth';
import toast from "react-hot-toast";
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';

const Header = () => {
    const [auth,setAuth] = useAuth();
    const categories = useCategory();
    const [cart, setCart] = useCart();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem('auth');
        toast.success('Logout successfully');
    }
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                {/* Navbar Toggler */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarTogglerDemo01" 
                    aria-controls="navbarTogglerDemo01" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

                    {/* Left - Logo */}
                    <Link to="/" className="navbar-brand">
                        <FaShoppingCart /> E-Cart
                    </Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <SearchInput />
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">Home</NavLink>
                        </li>

                        {/* Categories Dropdown */}
                        <li className="nav-item dropdown">
                            <Link 
                                className="nav-link dropdown-toggle" 
                                role="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                            >
                                Categories
                            </Link>
                            
                            <ul className="dropdown-menu">
                            <Link 
                                className="dropdown-item" 
                                to={`/categories`}                              
                            >
                                All Categories
                            </Link>
                            <hr />
                            {categories?.map(c => (
                                    <li>
                                        <Link 
                                            className="dropdown-item" 
                                            to={`/category/${c.slug}`}  
                                            key={c._id}
                                        >
                                            {c.name}
                                        </Link>
                                    </li>
                            ))}
                            
                            </ul>
                        </li>
                                
                        {/* Register | Login | Dashboard navlinks */}
                        {
                            !auth.user ? (<>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </li>
                            </>) : (<>
                                <li className="nav-item dropdown">
                                    <NavLink 
                                        className="nav-link dropdown-toggle" 
                                        role="button" 
                                        data-bs-toggle="dropdown" 
                                        aria-expanded="false"
                                    >
                                        {auth?.user?.name}
                                    </NavLink>

                                    <ul className="dropdown-menu">
                                        <li>
                                            <NavLink 
                                                to={`/dashboard/${auth?.user?.role === 1 ? 'admin': 'user'}`} 
                                                onClick={() => {console.log(auth?.user);}}
                                                className="dropdown-item"
                                            >
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <NavLink  
                                                onClick = {handleLogout}
                                                to = '/login'
                                                className = 'dropdown-item'
                                            >
                                                Logout
                                            </NavLink>
                                        </li>
                                    </ul>

                                </li>
                            </>)
                        }

                        {/* Cart Navlink */}
                        <li className="nav-item mt-1">
                            <Badge count={cart?.length} showZero>
                                <NavLink to="/cart" className="nav-link">
                                    Cart
                                </NavLink>
                            </Badge>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </>
  )
}

export default Header;