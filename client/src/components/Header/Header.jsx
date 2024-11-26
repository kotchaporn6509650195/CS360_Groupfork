import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { AuthContext } from '../../AuthContext';
import { FaUserCircle } from "react-icons/fa";

import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import { Context } from "../../utils/context";

import "./Header.scss";

const Header = () => {

    const [scrolled, setScrolled] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const { cartCount } = useContext(Context);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    return (
    <>
        <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
            <div className="header-content">
                <ul className="left">
                    <li onClick={() => navigate("/")}>Home</li>
                    <li onClick={() => navigate("/about")}>About</li>
                    <li onClick={() => navigate("/categories")}>Categories</li>
                </ul>
                <div className="center" onClick={() => navigate("/")}>ECOMIFY</div>
                <div className="right">
                    <TbSearch onClick={() => setShowSearch(true)} />
                    <AiOutlineHeart />
                    <span className="cart-icon" onClick={() => setShowCart(true)}>
                        <CgShoppingCart />
                        {!!cartCount && <span>{cartCount}</span>}
                    </span>
                    {user ? (
                        <div className="user-menu">
                            <span className="username">{"Hello " + user.username}</span>
                            <FaUserCircle onClick={() => navigate("/profile")} />
                            <button className="logout-btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button className="login-btn" onClick={() => navigate("/login")}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
        {showCart && <Cart setShowCart={setShowCart} />}
        {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
    );
};

export default Header;
