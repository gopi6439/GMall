
import bags from '../../assets/login_page_images/bags.png';
import smartphone from '../../assets/login_page_images/smartphone.png'
import shoes from '../../assets/login_page_images/shoes.png'

import '../../styles/customer/home.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../API';
import { useNavigate } from 'react-router-dom';
import setLoading from '../../LoadingController.js'

function Home({ setProduct, setChatProduct, cartUpdate, setCartUpdate, searchText }) {


    const navigate = useNavigate();

    const [allProducts, setAllProducts] = useState([]);
    const [priceFilter, setpriceFilter] = useState("");
    const [sortBy, setSortBy] = useState("Relevence");

    useEffect(() => {
        setLoading(true);
        getAllProducts();
        
    }, []);


    async function getAllProducts() {
        try {
            let response = await axios.get(`${API_BASE_URL}/getAllProducts`);
            // console.log(response);
            setAllProducts(response.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const productDetail = (data) => {
        setProduct(data);
        // console.log("allp", allProducts);
    }

    const addToCart = async (data) => {
        setLoading(true);
        let newCartData = new Object();
        newCartData.quantity = 1;
        newCartData.userId = localStorage.getItem("MY_USERID");
        newCartData.allProducts = data;

        let response = await axios.post(`${API_BASE_URL}/addCart`, newCartData);
        console.log(response);
        setCartUpdate(!cartUpdate);
        setLoading(false);
    }


    let filterProducts = allProducts.filter((product) => {
        setLoading(true);
        // console.log("pf", priceFilter);
        if (product.status == "Active") {
            let matchSearch = product.productName.toLowerCase().includes(searchText.toLowerCase());
            let matchPrice = true;
            if (priceFilter === "u5000") {
                matchPrice = product.currentPrice <= 5000;
            }
            if (priceFilter === "u10000") {
                matchPrice = product.currentPrice <= 10000;
            }
            if (priceFilter === "a10000") {
                matchPrice = product.currentPrice > 10000;
            }
            setLoading(false);
            return matchSearch && matchPrice;
        }
    });


    const sortFunction = (e) => {
        console.log(e.target.value);
        setSortBy(e.target.value);
    }

    const sortedProducts = [...filterProducts].sort((a, b) => {
        switch (sortBy) {
            case "lowtohigh":
                return a.currentPrice - b.currentPrice;
            case "hightolow":
                return b.currentPrice - a.currentPrice;
            default:
                return 0;
        }
       
    });

    return (
        <>
            <div className="homecontainer">

                <div className="banner">
                    <div>
                        <h3>Big Festivel Sale: up to 60% off</h3>
                        <p>Free delivery on orders above ₹499</p>
                    </div>
                    <div>
                        <img src={bags} alt="no" />
                        <img src={smartphone} alt="no" />
                        <img src={shoes} alt="no" />
                    </div>
                </div>
                <div className='category'>
                    <div className='active'>All</div>
                    <div>Mobiles</div>
                    <div>Fashion</div>
                    <div>Foods</div>
                    <div>Electronics</div>
                    <div>Books</div>
                </div>

                <div className='content'>
                    <div className='filter'>
                        <div>
                            <h3>Filter</h3>
                            <button onClick={(e) => { e.preventDefault(); setpriceFilter("") }}>Clear <i class="fa-solid fa-xmark"></i></button>
                        </div>


                        <div className='price'>
                            <h3>Price</h3>
                            <input type="radio" id='u5000' checked={priceFilter == "u5000"} name='price' onChange={(e) => setpriceFilter(e.target.id)} />
                            <label htmlFor="u1000">Under ₹5,000</label><br />
                            <input type="radio" name='price' checked={priceFilter == "u10000"} id='u10000' onChange={(e) => setpriceFilter(e.target.id)} />
                            <label htmlFor="u3000">Under ₹10,000</label><br />
                            <input type="radio" name='price' checked={priceFilter == "a10000"} id='a10000' onChange={(e) => setpriceFilter(e.target.id)} />
                            <label htmlFor="a3000"  >Above ₹10,000</label>
                        </div>
                        <div className='rating'>
                            <h3>Rating</h3>
                            <input type="radio" id='b4' name='rating' onChange={(e) => setpriceFilter(e.target.id)} />
                            <label htmlFor="b4">4 & below</label><br />
                            <input type="radio" name='rating' id='a4' onChange={(e) => setpriceFilter(e.target.id)} />
                            <label htmlFor="a4">4.5 & Above</label>
                        </div>
                    </div>{/* filter */}

                    <div className='productlist'>
                        <div>
                            <p>{filterProducts.length} Products</p>
                            <div>
                                <span>Sort by:</span>
                                <select name="sort" id="sort" value={sortBy} onChange={sortFunction}>
                                    <option value="Popularity">Popularity</option>
                                    <option value="lowtohigh">price low-high</option>
                                    <option value="hightolow">price high-low</option>
                                </select>
                            </div>
                        </div>

                        <div className='listproducts'>

                            {/* ADD PRODUCTS */}
                            {sortedProducts.length > 0 ? sortedProducts.map((data) => {
                                return (
                                    <Link to="/productDetails" className='link'>
                                        <div className='p1' onClick={() => productDetail(data)}>
                                            <img src={data.productImage} alt="no" />
                                            <h3>{data.productName}</h3>
                                            <div className='rating'>{data.rating}</div>
                                            <h2>{` ₹${data.currentPrice}`}<span>{`₹${data.mrp}`}</span><span>{`${data.discount}%`} off</span></h2>
                                            <p>Free delivery</p>
                                            <div>
                                                <button className='cartbtn' onClick={(e) => { e.preventDefault(); addToCart(data); }}>Add to cart</button>
                                                <Link className='link' to="/customerChat" onClick={(e) => { e.preventDefault(); setChatProduct(data); navigate("/customerChat"); }}>Chat</Link>
                                            </div>
                                        </div>{/* p1 */}
                                    </Link>
                                );
                            }) : <h1>No Products Found</h1>
                            }

                        </div>
                    </div>

                </div>{/* Content */}

            </div>{/* Container */}
        </>
    )
}

export default Home;