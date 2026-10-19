import { useState } from 'react';
import smartphone from '../../assets/login_page_images/smartphone.png'

import '../../styles/customer/product_deatails.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../API';
import setLoading from '../../LoadingController.js'

function ProductDeatails({ productdata,cartUpdate,setCartUpdate}) {

    const [quantity, setQuantity] = useState(1);

    const addCart = async(product) => {
        setLoading(true);
        let newCartData = new Object();
        newCartData.quantity = quantity;
        newCartData.userId=localStorage.getItem("MY_USERID");
        newCartData.allProducts = product;

        let response = await axios.post(`${API_BASE_URL}/addCart`,newCartData);
        console.log(response);
        setCartUpdate(!cartUpdate);
        if(response.status == 200){
            return true;
        }
        setLoading(false);
        
    }

    const renderData = (data) => {
        let keys = Object.keys(data);
        let values = keys.map((key) => {
            return (data[key]);
        });
        return (
            <>
                {keys.map((keyName) => {
                    return (
                        <>
                            <tr>
                                <td>{keyName}</td>
                                <td>{data[keyName]}</td>
                            </tr>
                        </>
                    )
                })}
            </>
        )
    }

    const decreaseQunatity = () => {
        if (quantity == 1) {
            return false;
        } else {
            setQuantity(quantity - 1);
        }
        console.log(quantity);
    }

    const increaseQunatity = () => {
        setQuantity(quantity + 1);
        console.log(quantity);
    }

    const cartPage = (productData)=>{
        addCart(productData);
        
    }

    return (
        <>
            <div className="pdcontainer">

                <div className="pview">
                    {/* left side */}
                    <div className="left">
                        <img src={productdata.productImage} alt="no" />
                        <div>
                            <img src={productdata.productImage} alt="no" />
                            <img src={productdata.productImage} alt="no" />
                            <img src={productdata.productImage} alt="no" />
                            <img src={productdata.productImage} alt="no" />
                        </div>
                    </div>
                    {/* right side */}
                    <div className="right">
                        <h2>{productdata.productName}</h2>
                        <div className='rating'>
                            <div className='rating'>{productdata.rating}</div>
                            <span>{productdata.totalRating}</span>
                        </div>
                        <div className='prices'>
                            <h3>₹{productdata.currentPrice}</h3>
                            <span>₹{productdata.mrp}</span>
                            <span>{productdata.discount}% off</span>
                        </div>
                        <span><b>Offers</b></span>
                        <ul>
                            <li>10% instant discount on bank cards</li>
                            <li>NO-Cost EMI from ₹1,500/month</li>
                        </ul>
                        <p>Delivery by Tommorow <span>Free</span></p>
                        <div className='quantity'>
                            <span>Quantity</span>
                            <div>
                                <span onClick={decreaseQunatity}>-</span>
                                <p>{quantity}</p>
                                <span onClick={increaseQunatity}>+</span>
                            </div>
                        </div>
                        <div>
                            <button className='addcart' onClick={() => {alert("product Addd successfulyy");addCart(productdata)}}>Add to cart</button>
                            <Link to="/cart"><button onClick={()=>cartPage(productdata)}>Buy now</button></Link>
                        </div>
                        <div>
                            <div>
                                <p>Sold by GadgetHub <span>4.4</span></p>
                                <p>Usually replies within 1 hour</p>
                            </div>
                            <button>Chat with seller</button>
                        </div>
                    </div> {/* right */}

                </div>{/* pview */}

                <div className='bottom'>
                    <div className='specification'>
                        <h4>Specification</h4>
                        <table id='pdtable'>
                            <tr>
                                <th>Spec</th>
                                <th>Deatail</th>
                            </tr>
                            { productdata.specification!=null && productdata.specification.map((data) => {
                                return (
                                    renderData(data)
                                )
                            })}

                        </table>
                    </div>
                    <div className='reviews'>
                        <h3>Ratings and reviews</h3>
                        <div className='r1'>
                            <div>
                                <span>4.3</span>
                                <span>Great battery life</span>
                            </div>
                            <span>Divya S . Verified buyer</span>
                        </div>{/* r1 */}
                        <div className='r1'>
                            <div>
                                <span>4.9</span>
                                <span>Good value for money , trust me !</span>
                            </div>
                            <span>Swathi K . Verified buyer</span>
                        </div>{/* r1 */}
                    </div>
                </div>

            </div>
        </>
    )

}

export default ProductDeatails;