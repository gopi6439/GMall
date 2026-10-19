import { useEffect, useState } from "react";
import AdminCategories from "../components/admin/AdminCategories.jsx";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminLeftNav from "../components/admin/AdminLeftNav.jsx";
import ManageProducts from "../components/admin/ManageProducts.jsx";
import ManageUsers from "../components/admin/ManageUsers.jsx";


import sampleImage from '../assets/sample_product_images/avatar.png'


import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import AdminTopNav from "../components/admin/AdminTopNav.jsx";
import AdminProfile from "../components/admin/AdminProfile.jsx";
import axios from "axios";
import API_BASE_URL from "../API.js";


function Admin({setLogged}) {


    useEffect(()=>{
        getAllCustomers();
        getAllSellers();
        getTotalproducts();
    },[]);

    async function getAllCustomers() {
        try{
            let response = await axios.get(`${API_BASE_URL}/allCustomers/Customer`);
            console.log(response);
            setTotalCustomers(response.data.length);
        }catch(e){
            console.log(e);
        }
    }

    async function getAllSellers() {
        try{
            let response = await axios.get(`${API_BASE_URL}/allCustomers/Seller`);
            console.log(response);
            setTotalSellers(response.data.length);
        }catch(e){
            console.log(e);
        }
    }

    async function getTotalproducts() {
        try{
            let response = await axios.get(`${API_BASE_URL}/allProducts`);
            console.log(response);
            setTotalProducts(response.data.length);
            let approvals = 0;
            response.data.forEach((data)=>{
                if(data.status == "Pending"){
                    approvals++;
                }
            });
            // console.log("approval",approvals);
            setTotalAwaitingApproval(approvals);
        }catch(e){
            console.log(e);
        }
    }

     const [showProfileCard,setShowProfileCard] = useState(false);
     const [totalCustomers,setTotalCustomers]  = useState(0);
     const [totalSellers,setTotalSellers] = useState(0);
     const [totalProducts,setTotalProducts] = useState(0);
     const [totalAwaitingApproval,setTotalAwaitingApproval] = useState(0);

    const adminData = {
            userId:localStorage.getItem("MY_USERID"),
            profileImage: localStorage.getItem("MY_PROFILEIMAGE"),
            fullName:localStorage.getItem("MY_FULLNAME"),
            email:localStorage.getItem("MY_EMAIL"),
            phone:localStorage.getItem("MY_PHONE"),
            role:localStorage.getItem("MY_ROLE")
        }

    const [adminDetails, setAdminDetails] = useState(adminData);
    const [tabSelect,setTabSelect] = useState('Admin Dashboard');
   
    return (
        <>
            <BrowserRouter>

                <div className="admincontainer" style={{ display: "flex" }}>
                    <AdminLeftNav setTabSelect={setTabSelect}/>
                    {showProfileCard && <AdminProfile setShowProfileCard={setShowProfileCard} adminData={adminData} setLogged={setLogged}/> }
                    <div style={{width:'80%',display:'flex',flexDirection:'column',gap:'20px'}}>
                    <AdminTopNav adminDetails={adminDetails} tabSelect={tabSelect} setShowProfileCard={setShowProfileCard}/>
                    <Routes>
                        <Route path="/" element={<AdminDashboard totalCustomers={totalCustomers} totalSellers={totalSellers} totalProducts={totalProducts} totalAwaitingApproval={totalAwaitingApproval}/>}></Route>
                        <Route path="/usersAndSellers" element={<ManageUsers setTotalCustomers={setTotalCustomers} setTotalSellers={setTotalSellers}/>}></Route>
                        <Route path="/adminProducts" element={<ManageProducts />}></Route>
                        <Route path="/adminCategories" element={<AdminCategories />}></Route>
                         <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </>
    )
}

export default Admin;