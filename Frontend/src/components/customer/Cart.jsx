
import '../../styles/customer/cart.css'
import smartphone from '../../assets/login_page_images/smartphone.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../API';
import PayemntOptions from './PaymentOptions';
import setLoading from '../../LoadingController.js'


function Cart({ user, allCartDatas, setAllCartDatas, cartUpdate, setCartUpdate }) {

    const [cartBill, setCartBill] = useState({
        totalItems: '',
        price: '',
        discountAmount: '',
        totalBill: '',
        save: ''
    });
    const [showPayOptions, setShowPayOptions] = useState(false);

    const deleteProduct = async (productId) => {
        setLoading(true);
        try {
            let response = await axios.delete(`${API_BASE_URL}/deleteProduct/${user.userId}/${productId}`);
            console.log("del", response);
            setCartUpdate(!cartUpdate);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        // console.log("allc", allCartDatas);
        setLoading(true);
        billGeneration();
    }, [allCartDatas]);

    const billGeneration = () => {

        let itemsCount = 0;
        let price = 0;
        let discountAmount = 0;

        allCartDatas.forEach((product) => {
            let disPerProduct = 0;
            itemsCount++;
            price += product.allProducts.currentPrice;
            disPerProduct = Math.round((product.allProducts.discount / 100) * product.allProducts.currentPrice);
            discountAmount += disPerProduct * product.quantity;

            price = price * product.quantity;

        });

        let totalBill = price - discountAmount;
        let save = price - totalBill;

        setCartBill({ ...cartBill, itemsCount, price, discountAmount, totalBill, save });
        setLoading(false);
        return cartBill;
    }

    const decreaseQunatity = (p) => {
        if (p.quantity == 1) {
            return false;
        } else {
            let dq = allCartDatas.map((data) => {
                if (p.allProducts.productId == data.allProducts.productId) {
                    data.quantity = p.quantity - 1;
                    setCartBill({ ...cartBill, price: cartBill.price - data.allProducts.currentPrice });
                }
                return data;
            });
            setAllCartDatas(dq);
            // console.log("b",dq);
        }

    }

    const increaseQunatity = (p) => {
        let iq = allCartDatas.map((data) => {
            if (p.allProducts.productId == data.allProducts.productId) {
                data.quantity = p.quantity + 1;
                setCartBill({ ...cartBill, price: data.allProducts.currentPrice * data.quantity });
            }
            return data;
        });
        setAllCartDatas(iq);

        // console.log("c",iq);
    }

    const placeOrder = (e) => {
        e.preventDefault();
        setLoading(true);
        if (allCartDatas.length > 0) {
            setShowPayOptions(true);
        }
        setLoading(false);

    }

    return (
        <>
            {showPayOptions ? <PayemntOptions cartBill={cartBill} setShowPayOptions={setShowPayOptions} allCartDatas={allCartDatas} deleteProduct={deleteProduct} /> :

                <div className='cartcontainer'>
                    <div className='left'>
                        <h2>My cart ({allCartDatas.length} items)</h2>
                        <table id='carttable'>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>

                            {allCartDatas.length > 0 ? allCartDatas.map((product) => {
                                return (
                                    <>
                                        <tr key={product.allProducts.productId}>
                                            <td>
                                                <div>
                                                    <img src={product.allProducts.productImage} alt="no" />
                                                    <div>
                                                        <h3>{product.allProducts.productName}</h3>
                                                        <p>Sold by GMall</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='quant'>
                                                    <span onClick={() => decreaseQunatity(product)}>-</span>
                                                    <span>{product.quantity}</span>
                                                    <span onClick={() => increaseQunatity(product)}>+</span>
                                                </div>
                                            </td>
                                            <td>
                                                <p>{product.allProducts.currentPrice}</p>
                                            </td>
                                            <td>
                                                <button onClick={() => { deleteProduct(product.allProducts.productId) }}>Remove</button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            }) : <td colSpan={4} style={{ fontSize: "20px", textAlign: "center", padding: "10px" }}>Cart is Empty</td>
                            }


                            {/* ADD ALL CARTS HERE */}
                        </table>

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
                        <button onClick={(e) => placeOrder(e)}>Place order</button>
                    </div>{/* Right */}
                </div>
            }
        </>
    )
}
export default Cart;
