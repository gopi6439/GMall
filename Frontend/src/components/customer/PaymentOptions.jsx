

import { useEffect, useState } from 'react';
import '../../styles/customer/payment_options.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../API';
import setLoading from '../../LoadingController.js'


function PayemntOptions({ cartBill, setShowPayOptions, allCartDatas ,deleteProduct}) {

    const navigate = useNavigate();
    const [payMode,setPayMode] = useState("UPI");

    const orderPlaced = (e) => {
        e.preventDefault();
        setLoading(true);
        setShowPayOptions(false);
        allCartDatas.forEach((value) => {
            saveOrder(value);
        });
        setLoading(false);
        navigate("/myOrders");
    }

    function currentDate() {
        let date = new Date();
        console.log(date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
        let currentDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        return currentDate;

    }

    async function saveOrder(value) {
        setLoading(true);
        try {
            let data = new Object();
            data.allProducts = value.allProducts;
            data.orderDate = currentDate();
            data.payMode = payMode;
            data.userId=value.userId;
            // console.log("value",value);
            let response = await axios.post(`${API_BASE_URL}/orderPlaced`,data);
            // console.log(response);
            deleteProduct(value.allProducts.productId);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }


    return (
        <>
            <div className='paymentcontainer'>
                <h2>My Orders (2 items)</h2>
                <div className="content">
                    <div className='left'>

                        <div className='pOptions'>
                            <h2>Choose payment options</h2>
                            <div>
                                <input type="radio" name="pay" id="upi" onChange={()=>setPayMode("UPI")}/>
                                <div>
                                    <label htmlFor="upi">UPI</label>
                                    <p htmlFor="upi">Pay with any UPI</p>
                                </div>

                            </div>

                            <div>
                                <input type="radio" name="pay" id="card" onChange={()=>setPayMode("Card")}/>
                                <div>
                                    <label htmlFor="card">Debit/Credit Card</label>
                                    <p htmlFor="card">Visa,Mastercard,RuPay</p>
                                </div>
                            </div>

                            <div>
                                <input type="radio" name="pay" id="netbank" onChange={()=>setPayMode("Net Banking")} />
                                <div>
                                    <label htmlFor="netbank">Net Banking</label>
                                    <p htmlFor="netbank">All major banks</p>
                                </div>
                            </div>

                            <div>
                                <input type="radio" name="pay" id="cod" onChange={()=>setPayMode("Cash On Delivery")}/>
                                <div>
                                    <label htmlFor="cod">Cash on Delivery</label>
                                    <p htmlFor="cod">Pay when your order arrived</p>
                                </div>
                            </div>

                        </div>


                    </div>{/* Left */}

                    <div className='right'>
                        <h4>Price deatails</h4>
                        <div className='d1'>
                            <span>Price({cartBill.totalItems} item)</span>
                            <span>₹{cartBill.price}</span>
                        </div>
                        <div className='d1'>
                            <span>Discount</span>
                            <span>-₹{cartBill.discountAmount}</span>
                        </div>
                        <div className='d1'>
                            <span>Delivery</span>
                            <span>Free</span>
                        </div>
                        <div className='dotted'></div>
                        <div>
                            <h4>Total</h4>
                            <span>₹{cartBill.totalBill}</span>
                        </div>
                        <span>You save ₹{cartBill.save} on this order</span>
                        <button onClick={(e) => orderPlaced(e)}>Pay</button>
                    </div>{/* Right */}
                </div>
            </div>
        </>
    )
}

export default PayemntOptions;