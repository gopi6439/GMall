
import { useState, useEffect } from 'react';
import '../../styles/seller/seller_dashboard.css'

import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../API';
import setLoading from '../../LoadingController.js'

function Dashboard({sellerInfo,setShowProfileCard,totalMyProducts}) {
  
    
    const [sellerData, setSellerData] = useState(sellerInfo);

       const [dashboardData,setDashboardData] = useState({
        salesThisMonth: 0,
        orders: 0,
        products: totalMyProducts,
        unreadChats: 0,
        analytics: [{ mon: 200, tue: 300, wed: 100, thu: 400, fri: 300, sat: 100, sun: 600 }],
        lowStock: [{ 'block-print-curta': 10, 'Wireless earbud': 5 }]
    })

    useEffect(()=>{
        setLoading(true);
        getDashboardData();
        
    },[]);

    useEffect(()=>{
        setDashboardData({...dashboardData,products:totalMyProducts})
    },[totalMyProducts]);

    function setAnalyticData(value) {
        let keys = Object.keys(value);
        let values = Object.values(value);
        let maxValue = values.reduce((a, b) => a > b ? a : b);
        // console.log("max", maxValue)
        // console.log("values",values);
        return (
            keys.map((v) => {
                let height = (value[v] / maxValue) * 100;
                return (
                    <div style={{ height: `${height}%` }}>{v}</div>
                )
            })
        )
    }

    function addLowStocks(value) {
        let keys = Object.keys(value);
        return (
            keys.map((v) => {
                return (
                    <tr>
                        <td>{v}</td>
                        <td>{value[v]}</td>
                    </tr>
                )
            })

        )
    }

   async function getDashboardData(){
        try{
            let response = await axios.get(`${API_BASE_URL}/totalOrder/${sellerInfo.userId}`);
            console.log(response);
            let data = response.data;
            let salesMonth = 0;
            data.forEach((value) => {
                salesMonth+=value.allProducts.currentPrice;
            });
            setDashboardData(
                {
                    ...dashboardData,orders:data.length,salesThisMonth:salesMonth
                }
            )
        }catch(e){
            console.log(e);
        }
        setLoading(false);
    }

    return (
        <>
            <div className="dashboardcontent">
                <div className="top">
                    <h2>Seller Dashboard</h2>
                    <div>
                        <Link to="/addProducts"><button>+ Add product</button></Link>
                        <div onClick={()=>setShowProfileCard(true)}>
                            <i class="fa-solid fa-user" style={{ color: 'rgb(115, 51, 242)' }}></i>
                            <span>{sellerData.fullName}</span>
                        </div>
                    </div>
                </div>{/* Top */}

                <div className="categories">
                    <div>
                        <h2>₹{dashboardData.salesThisMonth}</h2>
                        <span>Sales this month</span>
                    </div>
                    <div>
                        <h2>{dashboardData.orders}</h2>
                        <span>orders</span>
                    </div>
                    <div>
                        <h2>{dashboardData.products}</h2>
                        <span>products</span>
                    </div>
                    <div>
                        <h1>{dashboardData.unreadChats}</h1>
                        <span>Unread chats</span>
                    </div>
                </div>

                <div className="analytics">
                    <div className="salesweek">
                        {dashboardData.analytics.map((value) => setAnalyticData(value))}

                    </div>
                    <div className="stockdeatails">
                        <h4>Low stock</h4>
                        <table>
                            <tr>
                                <th>Product</th>
                                <th>Left</th>
                            </tr>
                            {dashboardData.lowStock.map((value) => addLowStocks(value))}

                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard;