import '../../styles/admin/manage_products.css'

import smartphone from '../../assets/login_page_images/smartphone.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../API';
import setLoading from '../../LoadingController.js'


function ManageProducts() {
    // const products = allProducts;
    const [updateState,setUpdateState] = useState(false);
    const [allProducts,setAllProducts]  = useState([]);

    useEffect(()=>{
        setLoading(true);
        getAllProducts();
        
    },[updateState]);

    async function getAllProducts(){
        try{
            let response = await axios.get(`${API_BASE_URL}/allProducts`);
            console.log(response);
            setAllProducts(response.data);
        }catch(e){
            console.log(e);
        }
        setLoading(false);
    }

    const removeProduct = async(e,product)=>{
        e.preventDefault();
        setLoading(true);
         try {
            let response = await axios.delete(`${API_BASE_URL}/rejectProduct/${product.productId}`);
            console.log(response);
            setUpdateState(!updateState);
        } catch (err) {
            console.log(err.response.data);
        }
        setLoading(false);
    }

    const approveProduct = async(e,product)=>{
        e.preventDefault();
        setLoading(true);
         try {
            let response = await axios.put(`${API_BASE_URL}/manageProducts/${product.productId}`);
            // console.log(response);
            setUpdateState(!updateState);
        } catch (err) {
            console.log(err.response.data);

        }
        setLoading(false);
    }

    return (
        <>
            <div className="manageproductcontent">

                <div className="content6">
                    <div>
                        <input type="text" placeholder='Search all products' />

                    </div>
                    <table>
                        <tr>
                            <th>Product</th>
                            <th>Seller</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                        {allProducts.map((product) => {
                            return (
                                <>
                                    <tr className='p1'>
                                        <td>
                                            <div>
                                                <img src={product.productImage} alt="no" />
                                                <h3>{product.productName}</h3>
                                            </div>
                                        </td>
                                        <td>{product.userName}</td>
                                        <td>{product.category}</td>
                                        <td>{product.currentPrice}</td>

                                        <td><span className={product.status == 'Active'?'pflag':'nflag'}>{product.status}</span></td>
                                        <td>
                                            <div className='action'>
                                                <button onClick={(e)=>approveProduct(e,product)}>Approve</button>
                                                <button onClick={(e)=>removeProduct(e,product)}>Remove</button>
                                            </div>
                                        </td>
                                    </tr>{/* p1 */}

                                </>
                            )
                        })}

                    </table>
                </div>{/* content2 */}

            </div>
        </>
    )
}

export default ManageProducts;