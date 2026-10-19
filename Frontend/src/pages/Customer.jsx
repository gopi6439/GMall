import { useEffect, useState } from "react";
import Cart from "../components/customer/Cart.jsx";
import CustomerChat from "../components/customer/CustomerChat.jsx";
import Home from "../components/customer/Home.jsx";
import Nav from "../components/customer/Nav.jsx";
import ProductDeatails from "../components/customer/ProductDeatails.jsx";

import sampleImage from '../assets/sample_product_images/avatar.png'


import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import CustomerProfile from "../components/customer/CustomerProfile.jsx";
import axios from "axios";
import API_BASE_URL from "../API.js";
import PayemntOptions from "../components/customer/PaymentOptions.jsx";
import MyOrders from "../components/customer/MyOrders.jsx";

function Customer({ setLogged }) {

    const [searchText,setSearchText] = useState("");


    const [product, setProduct] = useState([]);//for product deatail page
    const [cartCount, setCartCount] = useState(0);
    const [cartUpdate, setCartUpdate] = useState(false);
    const [chatProduct, setChatProduct] = useState([]);
    const [showProfileCard, setShowProfileCard] = useState(false);
    // console.log(product);
    const [allCartDatas, setAllCartDatas] = useState([]);

    const user =
    {
        userId: localStorage.getItem("MY_USERID"),
        profileImage: localStorage.getItem("MY_PROFILEIMAGE"),
        fullName: localStorage.getItem("MY_FULLNAME"),
        email: localStorage.getItem("MY_EMAIL"),
        phone: localStorage.getItem("MY_PHONE"),
        role: localStorage.getItem("MY_ROLE")
    }

    useEffect(() => {
        getAllCartData();
    }, [cartUpdate]);

    async function getAllCartData() {
        try {
            let response = await axios.get(`${API_BASE_URL}/myCart/${user.userId}`);
            console.log(response);
            let cartData = response.data;
            setCartCount(cartData.length);
            setAllCartDatas(cartData);
        } catch (error) {
            if (error.response.status == 404) {
                setCartCount(0);
                setAllCartDatas([]);
            }
        }

    }


    return (

        <>
            <BrowserRouter>
                <Nav cartCount={cartCount} setShowProfileCard={setShowProfileCard} setSearchText={setSearchText}/>
                {showProfileCard && <CustomerProfile setShowProfileCard={setShowProfileCard} user={user} setLogged={setLogged} />}
                <Routes>
                    <Route path="/" element={<Home setProduct={setProduct} setChatProduct={setChatProduct} cartUpdate={cartUpdate} setCartUpdate={setCartUpdate} searchText={searchText}/>} />
                    <Route path="/productDetails" element={<ProductDeatails productdata={product} cartUpdate={cartUpdate} setCartUpdate={setCartUpdate} />} />
                    <Route path="/cart" element={<Cart user={user} allCartDatas={allCartDatas} setAllCartDatas={setAllCartDatas} cartUpdate={cartUpdate} setCartUpdate={setCartUpdate} />} />
                    <Route path="/customerChat" element={<CustomerChat chatProducts={chatProduct} setChatProduct={setChatProduct} />} />
                    <Route path="myOrders" element={<MyOrders />}/>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Customer;