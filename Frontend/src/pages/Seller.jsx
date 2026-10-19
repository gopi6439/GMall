import AddProducts from "../components/seller/AddProducts";
import Dashboard from "../components/seller/Dashboard";
import LeftNav from "../components/seller/LeftNav";

import MyProducts from "../components/seller/MyProducts";
import SellerChat from "../components/seller/SellerChat";
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import SellerProfile from "../components/seller/SellerProfile";
import axios from "axios";
import API_BASE_URL from "../API";

function Seller({ setLogged }) {

    const [showProfileCard, setShowProfileCard] = useState(false);
    const [productUpdate, setProductUpdate] = useState(false);


    const sellerInfo = {
        userId: localStorage.getItem("MY_USERID"),
        profileImage: localStorage.getItem("MY_PROFILEIMAGE"),
        fullName: localStorage.getItem("MY_FULLNAME"),
        email: localStorage.getItem("MY_EMAIL"),
        phone: localStorage.getItem("MY_PHONE"),
        role: localStorage.getItem("MY_ROLE")
    }

    const [sellerData, setSellerData] = useState(sellerInfo);

    useEffect(() => {
        getMyProducts();
    }, [productUpdate]);

    const [myProducts, setMyProducts] = useState([]);
    const [totalMyProducts,setToatalMyProducts] = useState(0);

    async function getMyProducts() {
        try {
            let response = await axios.get(`${API_BASE_URL}/myProducts/${sellerData.userId}`);
            console.log(response);
            setMyProducts(response.data);
            setToatalMyProducts(response.data.length);
        } catch (error) {
            console.log(error);
        }
    }
    console.log("myy",totalMyProducts);


    return (
        <>
            <BrowserRouter>
                <div className="sellercontainer" style={{ display: 'flex' }}>
                    <LeftNav />
                    {showProfileCard && <SellerProfile setShowProfileCard={setShowProfileCard} sellerData={sellerData} setLogged={setLogged} />}
                    <Routes>
                        <Route path="/" element={<Dashboard sellerInfo={sellerData} setShowProfileCard={setShowProfileCard} totalMyProducts={totalMyProducts}/>}></Route>
                        <Route path="/myProducts" element={<MyProducts sellerData={sellerData} myProducts={myProducts} setShowProfileCard={setShowProfileCard} productUpdate={productUpdate} setProductUpdate={setProductUpdate} />}></Route>
                        <Route path="/addProducts" element={<AddProducts sellerData={sellerData} setShowProfileCard={setShowProfileCard} />}></Route>
                        <Route path="/sellerChat" element={<SellerChat sellerData={sellerData} setShowProfileCard={setShowProfileCard} />}></Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>

                </div>

            </BrowserRouter>

        </>
    )
}

export default Seller;