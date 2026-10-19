import '../../styles/customer/nav.css';
import { useState } from 'react';

import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

function Nav({ cartCount, setShowProfileCard ,setSearchText}) {

    const searchOnChange = (e)=>{
        setSearchText(e.target.value);
    }


    return (
        <>
            <nav>
                <h2>G<span>Mall</span></h2>
                <div className="search">
                    <input type="search" placeholder="Search fro products,brands, and more" onChange={(e)=>searchOnChange(e)}/>
                    <i className="fa-solid fa-magnifying-glass" style={{ color: 'rgb(0, 0, 0)' }}></i>
                </div>
                <ul>
                   
                    <li><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} >Home</NavLink></li>
                    <li><NavLink to="/customerChat" className={({ isActive }) => (isActive ? "active" : "")} >Chat</NavLink></li>
                    <li>
                        <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")} >Cart</NavLink>
                        <div className='cart'>{cartCount}</div>
                    </li>
                    <li><NavLink to="/myOrders" className={({ isActive }) => (isActive ? "active" : "")} >Orders</NavLink></li>
                </ul>
                <div onClick={() => setShowProfileCard(true)}>
                    <i className="fa-solid fa-circle-user" style={{ color: 'rgba(255, 255, 255,1)' }}></i>
                    <span>{localStorage.getItem("MY_FULLNAME")}</span>
                </div>
            </nav>
        </>
    )
}

export default Nav;