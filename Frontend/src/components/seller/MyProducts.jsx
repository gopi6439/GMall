import '../../styles/seller/my_products.css'

import smartphone from '../../assets/login_page_images/smartphone.png'

import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../API';
import setLoading from '../../LoadingController.js'


function MyProducts({ sellerData, myProducts ,setShowProfileCard,productUpdate,setProductUpdate}) {

    useEffect(()=>{
        setProductUpdate(!productUpdate);
    },[]);

    const deleteProduct = (e,data)=>{
        e.preventDefault();
        setLoading(true);
        deleteInDatabase(data);
    }

    async function deleteInDatabase(data) {
        try{
            let response = await axios.delete(`${API_BASE_URL}/deleteProduct/${data.productId}`);
            console.log(response.data);
            setProductUpdate(!productUpdate);
        }catch(error){
            console.log(error);
        }
        setLoading(false);
    }

    return (
        <>
            <div className="myproductscontent">

                <div className="top">
                    <h2>My Products</h2>
                    <div onClick={()=>setShowProfileCard(true)}>
                        <i class="fa-solid fa-user" style={{ color: 'rgb(115, 51, 242)' }}></i>
                        <span>{sellerData.fullName}</span>
                    </div>
                </div>{/* Top */}

                <div className="content2">
                    <div>
                        <input type="text" placeholder='Search my products' />
                        <Link to="/addProducts" className='button'><button>+ Add product</button></Link>
                    </div>
                    <table>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                        {myProducts.length > 0? myProducts.map((data) => {
                            
                            return (
                                <>
                                    <tr className='p1' key={data.productId}>
                                        <td>
                                            <div>
                                                <img src={data.productImage} alt="no" />
                                                <h3>{data.productName}</h3>
                                            </div>
                                        </td>
                                        <td>{data.category}</td>
                                        <td>₹{data.currentPrice}</td>
                                        <td>{data.stock}</td>
                                        <td><span className={data.status}>{data.status}</span></td>
                                        <td>
                                            <div className='action'>
                                                <button>Edit</button>
                                                <button onClick={(e)=>deleteProduct(e,data)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        }): <td colSpan={6} style={{textAlign:"center",padding:"10px"}}>No Products</td>
                    }


                    </table>
                </div>{/* content2 */}

            </div>
        </>
    )
}

export default MyProducts;