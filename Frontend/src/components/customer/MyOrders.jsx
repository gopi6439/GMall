
import '../../styles/customer/my_orders.css'
import iphone from '../../assets/login_page_images/smartphone.png'
import { useEffect, useState } from 'react'
import axios from 'axios';
import API_BASE_URL from '../../API';
import setLoading from '../../LoadingController.js'

function MyOrders() {

    const [myOrders, setMyOrders] = useState([]);
    

    useEffect(() => {
        setLoading(true);
        getMyOrders();
       
    }, []);

    async function getMyOrders() {
        try {
            let response = await axios.get(`${API_BASE_URL}/myOrders/${localStorage.getItem("MY_USERID")}`);
            console.log(response);
            setMyOrders(response.data);
        } catch (e) {
            console.log(e);
        }
         setLoading(false);
    }

    const cancelOrder = async(e,orderId)=>{
        setLoading(true);
        try{
            let response = await axios.delete(`${API_BASE_URL}/cancelOrder/${orderId}`);
            console.log(response);
            getMyOrders();
        }catch(e){
            console.log(e);
        }
        setLoading(false);
    }

    return (
        <>
            <div className="myorderscontainer">
                <h3>My Orders</h3>
                <div className='cate'>
                    <div>All (4)</div>
                    <div>Processing (1)</div>
                    <div>Shipped (1)</div>
                    <div>Delivered (2)</div>
                    <div>Cancelled (1)</div>
                </div>
                <div className="ordersList">
                    {myOrders.length >0? myOrders.map((data) => {
                        return (
                            <>
                                <div className="order1">
                                    <div className="top">
                                        <div>
                                            <h5>ORDER PLACED</h5>
                                            <h5>{data.orderDate}</h5>
                                        </div>

                                        <div>
                                            <h5>TOTAL</h5>
                                            <h5>{data.allProducts.currentPrice}</h5>
                                        </div>

                                        <div>
                                            <h5>PAYMENT</h5>
                                            <h5>{data.payMode}</h5>
                                        </div>

                                        <div>
                                            <h5>ORDER #</h5>
                                            <h5>{data.orderId}</h5>
                                        </div>

                                        <span>Order Confirmed</span>

                                    </div>{/* Top */}

                                    <div className="content">
                                        <div className="left">

                                            <div className='p1'>
                                                <img src={data.allProducts.productImage} alt="no" />
                                                <div>
                                                    <h3>{data.allProducts.productName}</h3>
                                                    <p>Sold by GMall</p>
                                                </div>
                                                <p>{data.allProducts.currentPrice}</p>
                                            </div>

                                            {/* LIST END */}

                                        </div>{/* Left */}

                                        <div className="right">
                                            <div className='orderStatus'>
                                                <div>
                                                    <div className='circle'></div>
                                                    <span>Ordered</span>
                                                </div>
                                                <div>
                                                    <div className='circle'></div>
                                                    <span>Packed</span>
                                                </div>
                                                <div>
                                                    <div className='circle'></div>
                                                    <span>Shipped</span>
                                                </div>
                                                <div>
                                                    <div className='circle'></div>
                                                    <span>Delivered</span>
                                                </div>
                                                <div className='line'></div>
                                            </div>{/* Order  Status */}
                                            <p>Arriving by wed , 21 Cct</p>

                                            <div>
                                                <button>Track Order</button>
                                                <button>Chat with seller</button>
                                                <button onClick={(e)=>cancelOrder(e,data.orderId)}>Cancel order</button>
                                            </div>
                                        </div>{/* right */}


                                    </div>
                                    <span>Delivering to {localStorage.getItem("MY_FULLNAME")}</span>
                                </div>{/* order1 */}
                            </>
                        )
                    }): <h1>No Orders</h1>
                    }


                </div>{/* OrdersList */}

            </div>
        </>
    )
}

export default MyOrders;